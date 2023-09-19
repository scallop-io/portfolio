import { Platform } from '@sonarwatch/portfolio-core';
import { Job } from '../../Job';
import { Fetcher } from '../../Fetcher';
import addressJob from './addressJob';
import marketJob from './marketJob';
import lendingFetcher from './lendingsFetcher';
import obligationsFetcher from './obligationsFetcher';
import { scallopPlatform } from './constants';

export const jobs: Job[] = [
    addressJob,
    marketJob
];
export const fetchers: Fetcher[] = [
    lendingFetcher,
    obligationsFetcher
];
export const platforms: Platform[] = [
    scallopPlatform
]
