import {
  Context,
  getCache,
  getTokenPriceCache,
} from '@sonarwatch/portfolio-core';
import { jobs } from '../src';

const jobId = process.argv.at(2);
if (!jobId || jobId === '') {
  console.log('Fetcher ID is missing');
  process.exit(1);
}

async function runJob() {
  const job = jobs.find((f) => f.id === jobId);
  if (!job) {
    console.log(`Job cannot be found: ${jobId}`);
    process.exit(1);
  }

  const context: Context = {
    cache: getCache(),
    tokenPriceCache: getTokenPriceCache(),
  };

  console.log(`Running job: ${jobId}`);
  await job.executor(context);
  console.log('Finished');
  process.exit(0);
}

runJob();