import { Global, Module } from '@nestjs/common';
import { CommonService } from '@/routes/common/common.service';
import { CommonController } from '@/routes/common/common.controller';
@Global()
@Module({
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
