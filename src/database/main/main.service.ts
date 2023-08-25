import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Pool } from 'pg';
import { mainDatabaseConfig } from '@/database/config/database.config';
@Injectable()
export class MainDBService implements OnModuleInit, OnApplicationShutdown {
  private pool: Pool = {};
  async onModuleInit(): Promise<void> {
    this.createMainDBPool();
  }
  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
    this.pool = null;
  }
  createMainDBPool() {
    this.pool = new Pool(mainDatabaseConfig);
  }

  async query(sql: string | any): Promise<any> {
    const client = await this.pool.connect();
    try {
      return await client.query(sql);
    } finally {
      client.release();
    }
  }
}
