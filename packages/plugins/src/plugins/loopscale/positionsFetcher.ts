import {
  NetworkId,
  PortfolioAssetToken,
  PortfolioElementMultiple,
  PortfolioElementType,
  getUsdValueSum,
  solanaNativeAddress,
  solanaNativeDecimals,
} from '@sonarwatch/portfolio-core';
import { PublicKey } from '@solana/web3.js';
import { Cache } from '../../Cache';
import { platformId } from './constants';
import { Fetcher, FetcherExecutor } from '../../Fetcher';
import { getClientSolana } from '../../utils/clients';
import { getParsedProgramAccounts } from '../../utils/solana';
import { liquidityStruct } from './structs';
import tokenPriceToAssetToken from '../../utils/misc/tokenPriceToAssetToken';

const executor: FetcherExecutor = async (owner: string, cache: Cache) => {
  const connection = getClientSolana();
  const accounts = await getParsedProgramAccounts(
    connection,
    liquidityStruct,
    new PublicKey('pid'),
    [
      {
        dataSize: liquidityStruct.byteSize,
      },
      {
        memcmp: {
          bytes: owner,
          offset: 40,
        },
      },
    ]
  );
  if (accounts.length === 0) return [];

  const solTokenPrice = await cache.getTokenPrice(
    solanaNativeAddress,
    NetworkId.solana
  );
  const assets: PortfolioAssetToken[] = [];
  accounts.forEach((acc) => {
    if (acc.amountDeposited.isZero()) return;
    const amount = acc.amountDeposited
      .div(10 ** solanaNativeDecimals)
      .toNumber();
    const asset = tokenPriceToAssetToken(
      solanaNativeAddress,
      amount,
      NetworkId.solana,
      solTokenPrice
    );
    assets.push(asset);
  });
  if (assets.length === 0) return [];

  const element: PortfolioElementMultiple = {
    networkId: NetworkId.solana,
    label: 'Deposit',
    platformId,
    type: PortfolioElementType.multiple,
    value: getUsdValueSum(assets.map((a) => a.value)),
    data: {
      assets,
    },
  };
  return [element];
};

const fetcher: Fetcher = {
  id: `${platformId}-solana`,
  networkId: NetworkId.solana,
  executor,
};

export default fetcher;
