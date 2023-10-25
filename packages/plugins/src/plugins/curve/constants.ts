import {
  EvmNetworkIdType,
  NetworkId,
  Platform,
} from '@sonarwatch/portfolio-core';

export const platformId = 'curve';
export const curvePlatform: Platform = {
  id: platformId,
  name: 'Curve Finance',
  image: 'https://sonar.watch/img/platforms/curve.png',
  defiLlamaId: 'parent#curve-finance',
};
export const poolsCachePrefix = `${platformId}-pools`;
export const gaugesCachePrefix = `${platformId}-gauges`;
export const poolsByAddressPrefix = `${platformId}-pools-by-address`;
export const gaugesAddresesCachePrefix = `${platformId}-gauges-addresses`;

export const apiBaseUrl = 'https://api.curve.fi/api';

export const votingEscrowAddress = '0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2';
export const vestingEscrowAddress =
  '0xd2D43555134dC575BF7279F4bA18809645dB0F1D';

export enum CrvNetworkId {
  ethereum = 'ethereum',
  polygon = 'polygon',
  avalanche = 'avalanche',
}

export const crvAddress = '0xD533a949740bb3306d119CC777fa900bA034cd52';
export const crvDecimals = 18;
export const crvNetworkIds = Object.values(CrvNetworkId);

export const crvNetworkIdBySwNetworkId: Record<CrvNetworkId, EvmNetworkIdType> =
  {
    [CrvNetworkId.ethereum]: NetworkId.ethereum,
    [CrvNetworkId.polygon]: NetworkId.polygon,
    [CrvNetworkId.avalanche]: NetworkId.avalanche,
  };
