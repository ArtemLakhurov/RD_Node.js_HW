import * as dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  DAY_OFFSET: process.env.DAY_OFFSET,
  DEFAULT_PERIOD: process.env.DEFAULT_PERIOD,
};
