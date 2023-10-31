import { Global, Module } from '@nestjs/common';
import { PlannerService } from '@/routes/planner/planner.service';
import { PlannerController } from '@/routes/planner/planner.controller';
import { PlannerRepository } from '@/routes/planner/planner.repository';
@Global()
@Module({
  controllers: [PlannerController],
  providers: [PlannerService, PlannerRepository],
  exports: [PlannerService],
})
export class PlannerModule {}
