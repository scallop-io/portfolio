import { NetworkId, PortfolioAsset, PortfolioElement, PortfolioElementType, TokenPrice, Yield, aprToApy, formatMoveTokenAddress, getElementLendingValues } from '@sonarwatch/portfolio-core';
import { SuiObjectDataFilter, getObjectFields, getObjectType, normalizeStructTag, parseStructTag } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';
import { Cache } from '../../Cache';
import { Fetcher, FetcherExecutor } from '../../Fetcher';
import { marketCoinPackageId, marketKey, platformId, spoolAccountPackageId, marketPrefix as prefix, poolsKey, poolsPrefix, spoolsKey, spoolsPrefix, baseIndexRate } from './constants';
import { getOwnerObject } from './helpers';
import tokenPriceToAssetToken from '../../utils/misc/tokenPriceToAssetToken';
import { MarketJobResult, Pools, SpoolJobResult, UserLending, UserStakeAccounts } from './types';


const executor: FetcherExecutor = async (owner: string, cache: Cache) => {
  const elements: PortfolioElement[] = [];
  const borrowedAssets: PortfolioAsset[] = [];
  const borrowedYields: Yield[][] = [];
  const suppliedAssets: PortfolioAsset[] = [];
  const suppliedYields: Yield[][] = [];
  const rewardAssets: PortfolioAsset[] = [];

  const pools = await cache.getItem<Pools>(poolsKey, {
    prefix: poolsPrefix,
    networkId: NetworkId.sui
  });

  if (!pools) return [];

  const poolValues = Object.values(pools);
  if (poolValues.length === 0) return [];

  const filterOwnerObject: SuiObjectDataFilter = {
    MatchAny: [
      ...poolValues.map((value) => ({
        StructType: `0x2::coin::Coin<${marketCoinPackageId}<${value.coinType}>>`
      })),
      {
        StructType: spoolAccountPackageId,
      }
    ]
  };

  const [allOwnedObjects, marketData, spoolData] = await Promise.all([
    getOwnerObject(owner, { filter: filterOwnerObject }),
    cache.getItem<MarketJobResult>(marketKey, {
      prefix,
      networkId: NetworkId.sui
    }),
    cache.getItem<SpoolJobResult>(spoolsKey, {
      prefix: spoolsPrefix,
      networkId: NetworkId.sui
    })
  ])
  if (!marketData || allOwnedObjects.length === 0 || !spoolData) return [];
  if (Object.keys(marketData).length === 0 || Object.keys(spoolData).length === 0) return [];
  const lendingRate: Map<string, number> = new Map();

  Object.keys(pools).forEach((coinName: string) => {
    const market = marketData[coinName];
    if (!market) return;
    lendingRate.set(coinName, (
      Number(market.debt) +
      Number(market.cash) -
      Number(market.reserve)) /
      Number(market.marketCoinSupply)
    );
  });

  // get user lending assets
  const lendingAssets: { [key: string]: UserLending } = {};
  const stakedAccount: UserStakeAccounts = {};
  for (const ownedMarketCoin of allOwnedObjects) {
    const objType = getObjectType(ownedMarketCoin);
    if (!objType) continue;

    const parsed = parseStructTag(objType);
    const coinType = normalizeStructTag(objType.substring(objType.indexOf('MarketCoin<') + 11, objType.indexOf('>')));
    const fields = getObjectFields(ownedMarketCoin);
    const coinName = poolValues.find((value) => value.coinType === coinType)?.metadata?.symbol.toLowerCase();
    if (!coinName || !fields) continue;
    if (!lendingAssets[coinName]) {
      lendingAssets[coinName] = { coinType, amount: new BigNumber(0) };
    }
    if (fields['stakes']) {
      if (!stakedAccount[`s${coinName}`]) {
        stakedAccount[`s${coinName}`] = [];
      }
      stakedAccount[`s${coinName}`].push({ points: fields['points'], index: fields['index'], stakes: fields['stakes'] })
    }
    const balance = BigNumber((parsed.name === 'Coin' ? fields['balance'] : fields['stakes']) ?? 0);
    lendingAssets[coinName] = { ...lendingAssets[coinName], amount: lendingAssets[coinName].amount.plus(balance) };
  }

  let pendingReward = BigNumber(0);

  for (const spoolCoin of Object.keys(stakedAccount)) {
    for (const { points, index, stakes } of stakedAccount[spoolCoin]) {
      if (spoolData[spoolCoin]) {
        const increasedPointRate = spoolData[spoolCoin].currentPointIndex
          ? BigNumber(BigNumber(spoolData[spoolCoin].currentPointIndex).minus(index)).dividedBy(baseIndexRate)
          : 0
        pendingReward = pendingReward.plus(
          BigNumber(stakes)
            .multipliedBy(increasedPointRate)
            .plus(points)
            .multipliedBy(spoolData[spoolCoin].exchangeRateNumerator)
            .dividedBy(spoolData[spoolCoin].exchangeRateDenominator)
        );
      }
    }
  }

  const tokenAddresses = Object.values(lendingAssets).map((value) => value.coinType);
  const tokenPriceResult = await cache.getTokenPrices(tokenAddresses, NetworkId.sui);
  const tokenPrices: Map<string, TokenPrice> = new Map();

  tokenPriceResult.forEach((r) => {
    if (!r) return;
    tokenPrices.set(r.address, r);
  })

  const rewardTokenAddress = formatMoveTokenAddress(pools['sui'].coinType);
  const rewardTokenPrice = tokenPrices.get(rewardTokenAddress);    

  const rewardAssetToken = tokenPriceToAssetToken(
    rewardTokenAddress,
    pendingReward.shiftedBy(-1 * (pools['sui']?.metadata?.decimals ?? 0)).toNumber(),
    NetworkId.sui,
    rewardTokenPrice
  );
  rewardAssets.push(rewardAssetToken);

  for (const [assetName, assetValue] of Object.entries(lendingAssets)) {
    const market = marketData[assetName];
    if (!market) continue;

    const addressMove = formatMoveTokenAddress(assetValue.coinType);
    const tokenPrice = tokenPrices.get(addressMove);    
    const lendingAmount = assetValue.amount
      .multipliedBy(lendingRate.get(assetName) ?? 0)
      .shiftedBy(-1 * (pools[assetName]?.metadata?.decimals ?? 0))
      .toNumber();
    const assetToken = tokenPriceToAssetToken(
      addressMove,
      lendingAmount,
      NetworkId.sui,
      tokenPrice
    );

    suppliedYields.push([
      {
        apy: aprToApy(market.supplyInterestRate),
        apr: market.supplyInterestRate
      }
    ]);
    suppliedAssets.push(assetToken);
  }
  const { borrowedValue, collateralRatio, suppliedValue, value } =
    getElementLendingValues(suppliedAssets, borrowedAssets, rewardAssets);
  elements.push({
    type: PortfolioElementType.borrowlend,
    networkId: NetworkId.sui,
    platformId,
    label: 'Lending',
    value,
    name: 'Scallop Lending',
    data: {
      borrowedAssets,
      borrowedValue,
      borrowedYields,
      suppliedAssets,
      suppliedValue,
      suppliedYields,
      collateralRatio,
      rewardAssets,
      value,
    }
  })
  return elements;
};

const fetcher: Fetcher = {
  id: `${platformId}-lendings`,
  networkId: NetworkId.sui,
  executor,
};

export default fetcher;
