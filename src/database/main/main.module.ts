import { Global, Module } from '@nestjs/common';
import { mainDBProvider } from '@/database/main/main.provider';
import { MainDBService } from '@/database/main/main.service';
@Global()
@Module({
  providers: [mainDBProvider, MainDBService],
  exports: [mainDBProvider, MainDBService],
})
export class MainDBModule {}
