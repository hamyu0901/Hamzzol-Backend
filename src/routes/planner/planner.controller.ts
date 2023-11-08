import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PlannerService } from '@/routes/planner/planner.service';
import { IPostTodoListItemType } from '@/utils/interface/planner';
@Controller()
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}
  @Get('planner')
  getPlannerList(
    @Query() query: { userId: string; year: string; month: string },
  ) {
    return this.plannerService.getPlannerList(query);
  }
  @Patch('planner/id/:id')
  patchPlannerList(
    @Body() body: IPostTodoListItemType,
    @Param() params: { id: number },
  ) {
    return this.plannerService.patchPlannerList(body, params.id);
  }
  @Post('planner')
  postPlannerList(@Body() body: IPostTodoListItemType) {
    return this.plannerService.postPlannerList(body);
  }
  @Delete('planner/id/:id')
  deletePlannerList(@Param() params: { id: number }) {
    return this.plannerService.deletePlannerList(params.id);
  }
}
