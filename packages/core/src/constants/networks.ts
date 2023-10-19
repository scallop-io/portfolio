import { AddressSystem } from '../Address';
import { Network, NetworkId, NetworkIdType } from '../Network';
import {
  aptosNativeAddress,
  avalancheNativeAddress,
  avalancheNativeWrappedAddress,
  bitcoinNativeAddress,
  ethereumNativeAddress,
  ethereumNativeWrappedAddress,
  polygonNativeAddress,
  polygonNativeWrappedAddress,
  seiNativeAddress,
  solanaNativeAddress,
  suiNativeAddress,
} from './addresses';

export const bitcoinNetwork: Network = {
  id: NetworkId.bitcoin,
  name: 'Bitcoin',
  image: 'https://alpha.sonar.watch/img/networks/bitcoin.png',
  addressSystem: AddressSystem.bitcoin,
  chainId: 1,
  native: {
    address: bitcoinNativeAddress,
    decimals: 8,
    coingeckoId: 'bitcoin',
  },
  nativeWrapped: null,
  isLive: true,
  coingeckoPlatformId: 'bitcoin',
  tokenListUrl:
    'https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.bitcoin.tokenlist.json',
};
export const ethereumNetwork: Network = {
  id: NetworkId.ethereum,
  name: 'Ethereum',
  image: 'https://alpha.sonar.watch/img/networks/ethereum.png',
  addressSystem: AddressSystem.evm,
  chainId: 1,
  native: {
    address: ethereumNativeAddress,
    decimals: 18,
    coingeckoId: 'ethereum',
  },
  nativeWrapped: {
    address: ethereumNativeWrappedAddress,
    decimals: 18,
    coingeckoId: 'weth',
  },
  isLive: true,
  coingeckoPlatformId: 'ethereum',
  tokenListUrl:
    'https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.ethereum.tokenlist.json',
};
export const avalancheNetwork: Network = {
  id: NetworkId.avalanche,
  name: 'Avalanche',
  image: 'https://alpha.sonar.watch/img/networks/avalanche.png',
  addressSystem: AddressSystem.evm,
  chainId: 43114,
  native: {
    address: avalancheNativeAddress,
    decimals: 18,
    coingeckoId: 'avalanche-2',
  },
  nativeWrapped: {
    address: avalancheNativeWrappedAddress,
    decimals: 18,
    coingeckoId: 'wrapped-avax',
  },
  isLive: true,
  coingeckoPlatformId: 'avalanche',
  tokenListUrl:
    'https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.avalanche.tokenlist.json',
};
export const polygonNetwork: Network = {
  id: NetworkId.polygon,
  name: 'Polygon',
  image: 'https://alpha.sonar.watch/img/networks/polygon.png',
  addressSystem: AddressSystem.evm,
  chainId: 137,
  native: {
    address: polygonNativeAddress,
    decimals: 18,
    coingeckoId: 'matic-network',
  },
  nativeWrapped: {
    address: polygonNativeWrappedAddress,
    decimals: 18,
    coingeckoId: 'wmatic',
  },
  isLive: true,
  coingeckoPlatformId: 'polygon-pos',
  tokenListUrl:
    'https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.polygon.tokenlist.json',
};
export const solanaNetwork: Network = {
  id: NetworkId.solana,
  name: 'Solana',
  image: 'https://alpha.sonar.watch/img/networks/solana.png',
  addressSystem: AddressSystem.solana,
  chainId: 101,
  native: {
    address: solanaNativeAddress,
    decimals: 9,
    coingeckoId: 'solana',
  },
  nativeWrapped: null,
  isLive: true,
  coingeckoPlatformId: 'solana',
  tokenListUrl:
    'https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.solana.tokenlist.json',
};
export const aptosNetwork: Network = {
  id: NetworkId.aptos,
  name: 'Aptos',
  image: 'https://alpha.sonar.watch/img/networks/aptos.png',
  addressSystem: AddressSystem.move,
  chainId: 1,
  native: {
    address: aptosNativeAddress,
    decimals: 8,
    coingeckoId: 'aptos',
  },
  nativeWrapped: null,
  isLive: true,
  coingeckoPlatformId: 'aptos',
  tokenListUrl:
    'https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.aptos.tokenlist.json',
};
export const suiNetwork: Network = {
  id: NetworkId.sui,
  name: 'Sui',
  image: 'https://alpha.sonar.watch/img/networks/sui.png',
  addressSystem: AddressSystem.move,
  chainId: 1,
  native: {
    address: suiNativeAddress,
    decimals: 9,
    coingeckoId: 'sui',
  },
  nativeWrapped: null,
  isLive: true,
  coingeckoPlatformId: 'sui',
  tokenListUrl:
    'https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.sui.tokenlist.json',
};

export const seiNetwork: Network = {
  id: NetworkId.sei,
  name: 'Sei',
  image: 'https://alpha.sonar.watch/img/networks/sei.png',
  addressSystem: AddressSystem.sei,
  chainId: 1,
  native: {
    address: seiNativeAddress,
    decimals: 6,
    coingeckoId: 'sui',
  },
  nativeWrapped: null,
  isLive: true,
  coingeckoPlatformId: 'sei',
  tokenListUrl:
    'https://cdn.jsdelivr.net/npm/@sonarwatch/token-lists/build/sonarwatch.sei.tokenlist.json',
};

export const networks: Record<NetworkIdType, Network> = {
  [NetworkId.aptos]: aptosNetwork,
  [NetworkId.avalanche]: avalancheNetwork,
  [NetworkId.polygon]: polygonNetwork,
  [NetworkId.bitcoin]: bitcoinNetwork,
  [NetworkId.ethereum]: ethereumNetwork,
  [NetworkId.solana]: solanaNetwork,
  [NetworkId.sui]: suiNetwork,
  [NetworkId.sei]: seiNetwork,
};

export const evmNetworks: Network[] = Object.values(networks).filter(
  (n) => n.addressSystem === AddressSystem.evm
);
