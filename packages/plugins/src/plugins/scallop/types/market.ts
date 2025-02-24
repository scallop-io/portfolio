import BigNumber from 'bignumber.js';
import { BasicField, WitTable } from './basic';

export type BalanceSheet = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k in string]?: any;
};

export type BorrowIndexes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k in string]?: any;
};

export type InterestModel = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k in string]?: any;
};

export type RiskModels = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k in string]?: any;
};

export type InterestModelData = {
  base_borrow_rate_per_sec: {
    fields: {
      value: string;
    };
  };
  borrow_rate_on_high_kink: {
    fields: {
      value: string;
    };
  };
  borrow_rate_on_mid_kink: {
    fields: {
      value: string;
    };
  };
  borrow_weight: {
    fields: {
      value: string;
    };
  };
  high_kink: {
    fields: {
      value: string;
    };
  };
  interest_rate_scale: string;
  max_borrow_rate: {
    fields: {
      value: string;
    };
  };
  mid_kink: {
    fields: {
      value: string;
    };
  };
  min_borrow_amount: string;
  revenue_factor: {
    fields: {
      value: string;
    };
  };
  type: {
    fields: {
      name: string;
    };
  };
};

export type BorrowIndexData = {
  borrow_index: string;
  interest_rate: {
    fields: {
      value: string;
    };
  };
  interest_rate_scale: string;
  last_updated: string;
};

export type BalanceSheetData = {
  cash: string;
  debt: string;
  market_coin_supply: string;
  revenue: string;
};

export type RiskModelData = {
  collateral_factor: BasicField<{ value: string }>;
};

const MARKET_DATA_FIELDS = [
  'asset_active_states',
  'borrow_dynamics',
  'collateral_stats',
  'id',
  'interest_models',
  'limiters',
  'reward_factors',
  'risk_models',
  'vault',
] as const;

const VAULT_FIELDS = [
  'balance_sheets',
  'flash_loan_fees',
  'id',
  'market_coin_supplies',
  'underlying_balances',
] as const;

export type MarketDataFieldsName = (typeof MARKET_DATA_FIELDS)[number];
export type VaultFieldsName = (typeof VAULT_FIELDS)[number];

export type MarketData = {
  [k in MarketDataFieldsName]: object;
} & {
  vault: {
    type: string;
    fields: {
      [l in VaultFieldsName]: BasicField<WitTable>;
    };
  };
  borrow_dynamics: BasicField<WitTable>;
  interest_models: BasicField<WitTable>;
};

export type MarketJobData = {
  coin: string;
  decimals: number;
  coinType: string;
  // growthInterest: number;
  borrowInterestRate: number;
  supplyInterestRate: number;
  debt: number;
  cash: number;
  marketCoinSupply: number;
  reserve: number;
  borrowIndex: number;
  borrowWeight: number;
  collateralFactor: number;
  conversionRate: number;
};

export type SpoolJobData = {
  currentPointIndex: BigNumber;
  exchangeRateNumerator: number;
  exchangeRateDenominator: number;
};

export type SpoolJobResult = {
  [T in string]: SpoolJobData;
};

export type MarketJobResult = {
  [T in string]: MarketJobData;
};
