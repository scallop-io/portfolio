export type SuiAddressType = string;
export type SuiObjectIdType = string;

export type CoinPairType = {
  coinTypeA: SuiAddressType;
  coinTypeB: SuiAddressType;
};

export type PoolImmutables = {
  poolAddress: string;
  tickSpacing: string;
} & CoinPairType;

export type Pool = {
  poolType: string;
  coinAmountA: number;
  coinAmountB: number;
  current_sqrt_price: number;
  current_tick_index: number;
  fee_growth_global_b: number;
  fee_growth_global_a: number;
  fee_protocol_coin_a: number;
  fee_protocol_coin_b: number;
  fee_rate: number;
  is_pause: boolean;
  liquidity: number;
  index: number;
  position_manager: {
    positions_handle: string;
    size: number;
  };
  rewarder_infos: Array<Rewarder>;
  rewarder_last_updated_time: string;
  ticks_handle: string;
  uri: string;
  name: string;
} & PoolImmutables;

export type SuiStructTag = {
  full_address: string;
  source_address: string;
  address: SuiAddressType;
  module: string;
  name: string;
  type_arguments: SuiAddressType[];
};

export type Rewarder = {
  coinAddress: string;
  emissions_per_second: number;
  growth_global: number;
  emissionsEveryDay: number;
};

export enum ClmmPositionStatus {
  'Deleted' = 'Deleted',
  'Exists' = 'Exists',
  'NotExists' = 'NotExists',
}

export type NFT = {
  creator: string;
  description: string;
  image_url: string;
  link: string;
  name: string;
  project_url: string;
};

export type Position = {
  pos_object_id: SuiObjectIdType;
  owner: SuiObjectIdType;
  pool: SuiObjectIdType;
  type: SuiAddressType;
  coin_type_a: SuiAddressType;
  coin_type_b: SuiAddressType;
  index: number;
  liquidity: string;
  tick_lower_index: number;
  tick_upper_index: number;
  position_status: ClmmPositionStatus;
} & NFT &
  PositionReward;

export type PositionReward = {
  pos_object_id: SuiObjectIdType;
  liquidity: string;
  tick_lower_index: number;
  tick_upper_index: number;
  fee_growth_inside_a: string;
  fee_owed_a: string;
  fee_growth_inside_b: string;
  fee_owed_b: string;
  reward_amount_owed_0: string;
  reward_amount_owed_1: string;
  reward_amount_owed_2: string;
  reward_growth_inside_0: string;
  reward_growth_inside_1: string;
  reward_growth_inside_2: string;
};

export type ParsedJsonEvent = {
  coin_type_a: string;
  coin_type_b: string;
  pool_id: string;
  tick_spacing: number;
};
