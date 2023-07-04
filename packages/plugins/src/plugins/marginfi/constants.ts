import { PublicKey } from '@solana/web3.js';
import { solanaNetwork } from '@sonarwatch/portfolio-core';
import BigNumber from 'bignumber.js';

export const cachePrefix = 'marginfi';
export const platformId = 'marginfi';

export const MarginfiProgram = new PublicKey(
  'MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA'
);

export const MarginfiAccountAddress =
  '4qp6Fx6tnZkY5Wropq9wUYgtFxXKwE6viZxFHg3rdAG8';

export const solFactor = new BigNumber(10 ** solanaNetwork.native.decimals);