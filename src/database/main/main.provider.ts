import { mainDatabaseConfig } from '@/database/config/database.config';
import { MAIN_DB_CONNECTION } from '@/constants';
import { Pool } from 'pg';

export const mainDBProvider = {
  provide: MAIN_DB_CONNECTION,
  useValue: new Pool(mainDatabaseConfig),
};
