import { Injectable } from '@nestjs/common';
import { PlannerRepository } from '@/routes/planner/planner.repository';
import { IPostTodoListItemType } from '@/utils/interface/planner';

@Injectable()
export class PlannerService {
  constructor(private readonly plannerRepository: PlannerRepository) {}
  async getPlannerList(query: {
    userId: string;
    year: string;
    month: string;
  }): Promise<any> {
    return await this.plannerRepository.getPlannerList(query);
  }
  async patchPlannerList(
    body: IPostTodoListItemType,
    id: number,
  ): Promise<any> {
    return await this.plannerRepository.patchPlannerList(body, id);
  }
}
