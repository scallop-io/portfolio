import { Platform } from '@sonarwatch/portfolio-core';
import { Fetcher } from './Fetcher';
import { Job } from './Job';
import { getFetchersByAddressSystem } from './utils/misc/getFetchersByAddressSystem';
import orphanPlatorms from './orphanPlatorms';
import {
  platforms as tokensPlatforms,
  jobs as tokensJobs,
  fetchers as tokensFetchers,
} from './plugins/tokens';
import {
  platforms as nativeStakePlatforms,
  fetchers as nativeStakeFetchers,
  jobs as nativeStakeJobs,
} from './plugins/native-stake';
import {
  platforms as marinadePlatforms,
  fetchers as marinadeFetchers,
} from './plugins/marinade';
import {
  platforms as marginfiPlatforms,
  jobs as marginfiJobs,
  fetchers as marginfiFetchers,
} from './plugins/marginfi';
import {
  platforms as saberPlatforms,
  jobs as saberJobs,
} from './plugins/saber';
import {
  platforms as solendPlatforms,
  jobs as solendJobs,
  fetchers as solendFetchers,
} from './plugins/solend';
import {
  platforms as raydiumPlatforms,
  jobs as raydiumJobs,
  fetchers as raydiumFetchers,
} from './plugins/raydium';
import {
  platforms as orcaPlatforms,
  jobs as orcaJobs,
  fetchers as orcaFetchers,
} from './plugins/orca';
import {
  platforms as meteoraPlatforms,
  jobs as meteoraJobs,
} from './plugins/meteora';
import {
  platforms as cetusPlatforms,
  jobs as cetusJobs,
  fetchers as cetusFetchers,
} from './plugins/cetus';
import {
  platforms as turbosPlatforms,
  jobs as turbosJobs,
  fetchers as turbosFetchers,
} from './plugins/turbos';
import {
  platforms as thalaPlatforms,
  jobs as thalaJobs,
  fetchers as thalaFetchers,
} from './plugins/thala';
import {
  platforms as tensorPlatforms,
  fetchers as tensorFetchers,
} from './plugins/tensor';
import {
  platforms as ordersPlatforms,
  fetchers as ordersFetchers,
  jobs as ordersJobs,
} from './plugins/orders';
import {
  platforms as aavePlatforms,
  fetchers as aaveFetchers,
  jobs as aaveJobs,
} from './plugins/aave';
import {
  platforms as stakingAptosPlatforms,
  fetchers as stakingAptosFetchers,
} from './plugins/staking-aptos';
import {
  platforms as morphoPlatforms,
  fetchers as morphoFetchers,
  jobs as morphoJobs,
} from './plugins/morpho';
import {
  platforms as driftPlatforms,
  jobs as driftJobs,
  fetchers as driftFetchers,
} from './plugins/drift';
import {
  platforms as mangoPlatforms,
  jobs as mangoJobs,
  fetchers as mangoFetchers,
} from './plugins/mango';
import { jobs as topTokensJobs } from './plugins/top-tokens';
import {
  platforms as liquidityPoolsSeiPlatforms,
  jobs as liquidityPoolsSeiJobs,
  fetchers as liquidityPoolsSeiFetchers,
} from './plugins/liquiditypools-sei';
import {
  platforms as pancakeswapPlatforms,
  jobs as pancakeswapJobs,
} from './plugins/pancakeswap';
import {
  platforms as aftermathPlatforms,
  jobs as aftermathJobs,
} from './plugins/aftermath';
import {
  platforms as liquidswapPlatforms,
  jobs as liquidswapJobs,
} from './plugins/liquidswap';
import {
  platforms as auxexchangePlatforms,
  jobs as auxexchangeJobs,
} from './plugins/auxexchange';
import {
  jobs as makerJobs,
  platforms as makerPlatforms,
  fetchers as makerFetchers,
} from './plugins/maker';
import {
  jobs as kaminoJobs,
  platforms as kaminoPlatforms,
} from './plugins/kamino';
import {
  fetchers as bucketFetchers,
  platforms as bucketPlatforms,
} from './plugins/bucket';
import {
  jobs as naviJobs,
  fetchers as naviFetchers,
  platforms as naviPlatforms,
} from './plugins/navi';
import {
  fetchers as scallopFetchers,
  jobs as scallopJobs,
  platforms as scallopPlatforms
} from './plugins/scallop';
import {
  fetchers as rocketpoolFetchers,
  platforms as rocketpoolPlatforms,
} from './plugins/rocket-pool';
import {
  platforms as lidoPlatforms,
  fetchers as lidoFetchers,
} from './plugins/lido';
import {
  jobs as curveJobs,
  fetchers as curveFetchers,
  platforms as curvePlatforms,
} from './plugins/curve';
import {
  jobs as compoundJobs,
  fetchers as compoundFetchers,
  platforms as compoundPlatforms,
} from './plugins/compound';
import {
  jobs as stargateJobs,
  fetchers as stargateFetchers,
  platforms as stargatePlatforms,
} from './plugins/stargate';
import {
  platforms as staderPlatforms,
  jobs as staderJobs,
  fetchers as staderFetchers,
} from './plugins/stader';
import {
  platforms as uniswapPlatforms,
  jobs as uniswapJobs,
  fetchers as uniswapFetchers,
} from './plugins/uniswap';
import {
  platforms as balancerPlatforms,
  jobs as balancerJobs,
  fetchers as balancerFetchers,
} from './plugins/balancer';

export {
  walletTokensPlatform,
  walletNftsPlatform,
} from './plugins/tokens/constants';

export * from './Cache';
export * from './Fetcher';
export * from './Job';
export * from './utils/name-service';
export * from './utils/blank';
export * from './plugins/llama-protocols';

// PLATFORMS //
export const platforms: Platform[] = [
  ...orphanPlatorms,
  ...aavePlatforms,
  ...orcaPlatforms,
  ...cetusPlatforms,
  ...driftPlatforms,
  ...auxexchangePlatforms,
  ...liquidityPoolsSeiPlatforms,
  ...liquidswapPlatforms,
  ...aftermathPlatforms,
  ...pancakeswapPlatforms,
  ...tokensPlatforms,
  ...nativeStakePlatforms,
  ...marinadePlatforms,
  ...saberPlatforms,
  ...solendPlatforms,
  ...marginfiPlatforms,
  ...raydiumPlatforms,
  ...meteoraPlatforms,
  ...turbosPlatforms,
  ...thalaPlatforms,
  ...tensorPlatforms,
  ...ordersPlatforms,
  ...stakingAptosPlatforms,
  ...morphoPlatforms,
  ...mangoPlatforms,
  ...kaminoPlatforms,
  ...bucketPlatforms,
  ...naviPlatforms,
  ...scallopPlatforms,
  ...makerPlatforms,
  ...rocketpoolPlatforms,
  ...lidoPlatforms,
  ...curvePlatforms,
  ...compoundPlatforms,
  ...stargatePlatforms,
  ...staderPlatforms,
  ...uniswapPlatforms,
  ...balancerPlatforms,
];

// JOBS //
export const jobs: Job[] = [
  ...tokensJobs,
  ...nativeStakeJobs,
  ...thalaJobs,
  ...marginfiJobs,
  ...raydiumJobs,
  ...solendJobs,
  ...meteoraJobs,
  ...orcaJobs,
  ...driftJobs,
  ...mangoJobs,
  ...cetusJobs,
  ...turbosJobs,
  ...topTokensJobs,
  ...pancakeswapJobs,
  ...auxexchangeJobs,
  ...saberJobs,
  ...aaveJobs,
  ...ordersJobs,
  ...morphoJobs,
  ...makerJobs,
  ...liquidityPoolsSeiJobs,
  ...aftermathJobs,
  ...liquidswapJobs,
  ...kaminoJobs,
  ...naviJobs,
  ...scallopJobs,
  ...curveJobs,
  ...compoundJobs,
  ...stargateJobs,
  ...staderJobs,
  ...uniswapJobs,
  ...balancerJobs,
];

// FETCHERS //
export const fetchers: Fetcher[] = [
  ...tokensFetchers,
  ...nativeStakeFetchers,
  ...tensorFetchers,
  ...marginfiFetchers,
  ...marinadeFetchers,
  ...solendFetchers,
  ...thalaFetchers,
  ...raydiumFetchers,
  ...orcaFetchers,
  ...driftFetchers,
  ...mangoFetchers,
  ...cetusFetchers,
  ...turbosFetchers,
  ...stakingAptosFetchers,
  ...aaveFetchers,
  ...ordersFetchers,
  ...morphoFetchers,
  ...liquidityPoolsSeiFetchers,
  ...bucketFetchers,
  ...naviFetchers,
  ...scallopFetchers,
  ...rocketpoolFetchers,
  ...curveFetchers,
  ...stargateFetchers,
  ...makerFetchers,
  ...compoundFetchers,
  ...lidoFetchers,
  ...staderFetchers,
  ...uniswapFetchers,
  ...balancerFetchers,
];
export const fetchersByAddressSystem = getFetchersByAddressSystem(fetchers);
