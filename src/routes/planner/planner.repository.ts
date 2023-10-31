import { Injectable } from '@nestjs/common';
import { MainDBService } from '@/database/main/main.service';
import { IPostTodoListItemType } from '@/utils/interface/planner';
@Injectable()
export class PlannerRepository {
  constructor(private readonly mainDBService: MainDBService) {}
  async getPlannerList(data: {
    userId: string;
    year: string;
    month: string;
  }): Promise<any> {
    const query = {
      text: `SELECT list_id, user_id, TO_CHAR(date::timestamp, 'YYYY-MM-DD') AS date, title, TO_CHAR(update_time::timestamp, 'YYYY-MM-DD HH24:MI:SS') AS update_time, contents, check_list FROM his_planner_list
         WHERE user_id = $1 AND EXTRACT(YEAR FROM date) = $2 AND EXTRACT(MONTH FROM date) = $3;`,
      values: [data.userId, data.year, data.month],
    };
    const result = await this.mainDBService.query(query);
    return result.rows;
  }

  async patchPlannerList(
    body: IPostTodoListItemType,
    id: number,
  ): Promise<any> {
    const { title, update_time, contents, check_list } = body;
    const query = {
      text: `UPDATE public.his_planner_list SET title=$1, update_time=$2, contents=$3, check_list=$4 WHERE list_id = ${id};`,
      values: [title, update_time, contents, check_list],
    };
    await this.mainDBService.query(query);
  }
}
