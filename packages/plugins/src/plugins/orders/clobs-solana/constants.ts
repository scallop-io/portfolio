import { Platform } from '@sonarwatch/portfolio-core';
import {
  openOrdersV2Struct,
  serumMarketV1Struct,
  serumMarketV2Struct,
  serumMarketV3Struct,
} from './structs';
import { CLOBVersion } from './types';
import { openOrdersV1Struct } from '../../raydium/structs/openOrders';

export const openbookPlatform: Platform = {
  id: 'openbook',
  name: 'OpenBook',
  image: 'https://sonar.watch/img/platforms/openbook.png',
  defiLlamaId: 'openbook',
};
export const serumPlatform: Platform = {
  id: 'serum',
  name: 'Serum',
  image: 'https://sonar.watch/img/platforms/serum.png',
  defiLlamaId: 'serum',
};
export const clobVersions = {
  serumV1: {
    name: 'Serum V1',
    programId: '4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn',
    struct: serumMarketV1Struct,
    orderStruct: openOrdersV1Struct,
    prefix: `${serumPlatform.id}-marketsV1`,
  } as CLOBVersion,
  serumV2: {
    name: 'Serum V2',
    programId: 'EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o',
    struct: serumMarketV2Struct,
    orderStruct: openOrdersV2Struct,
    prefix: `${serumPlatform.id}-marketsV2`,
  } as CLOBVersion,
  serumV3: {
    name: 'Serum V3',
    programId: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin',
    struct: serumMarketV3Struct,
    orderStruct: openOrdersV2Struct,
    prefix: `${serumPlatform.id}-marketsV3`,
  } as CLOBVersion,
  openbookV1: {
    name: 'OpenBook V1',
    programId: 'srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX',
    struct: serumMarketV2Struct,
    orderStruct: openOrdersV2Struct,
    prefix: `${openbookPlatform.id}-markets`,
  } as CLOBVersion,
  // openbookV2: {
  //   programId: 'opnbkNkqux64GppQhwbyEVc3axhssFhVYuwar8rDHCu',
  //   struct: openbookMarketV1Struct,
  //   orderStruct: openOrdersV3Struct,
  //   prefix: openbookMarketsPrefix,
  // } as CLOBProgramInfo,
};
