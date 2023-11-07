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
  async patchPlannerList(body: IPostTodoListItemType, id: number) {
    await Promise.all([
      this.plannerRepository.patchPlannerList(body, id),
      this.plannerRepository.patchSubPlannerList(body, id),
    ]);
  }
  async postPlannerList(body: IPostTodoListItemType) {
    const mainResult = await this.plannerRepository.postMainPlannerList(body);
    const listId = mainResult[0].list_id;
    await this.plannerRepository.postSubPlannerList(body, listId);
  }

  async deletePlannerList(listId: number) {
    await Promise.all([
      this.plannerRepository.deletePlannerList(listId),
      this.plannerRepository.deleteSubPlannerList(listId),
    ]);
  }
}
