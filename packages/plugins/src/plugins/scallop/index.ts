import { Job } from '../../Job';
import { Fetcher } from '../../Fetcher';
import addressJob from './addressJob';
import marketJob from './marketJob';

export const jobs: Job[] = [
    addressJob,
    marketJob
];
export const fetchers: Fetcher[] = [];