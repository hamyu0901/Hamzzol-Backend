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
      text: `SELECT 
                main.list_id, 
                user_id, 
                TO_CHAR(date::timestamp, 'YYYY-MM-DD') AS date, 
                title, 
                contents, 
                check_list, 
                TO_CHAR(update_time::timestamp, 'YYYY-MM-DD HH24:MI:SS') AS update_time, 
                index_color AS color,
                sub_id, 
                COALESCE(NULLIF(array_agg(DISTINCT TO_CHAR(dates, 'YYYY-MM-DD')), '{NULL}'::text[]), '{}'::text[]) AS date_range
             FROM 
                his_planner_list main 
             LEFT JOIN 
                his_sub_planner_list sub ON sub.list_id = main.list_id
             LEFT JOIN
                unnest(sub.date_range) AS dates ON true
             WHERE 
                main.user_id = $1 
                AND EXTRACT(YEAR FROM date) = $2 
                AND EXTRACT(MONTH FROM date) = $3
             GROUP BY   
                main.list_id, 
                user_id, 
                date, 
                title, 
                contents, 
                check_list, 
                update_time, 
                color,
                sub_id;`,
      values: [data.userId, data.year, data.month],
    };
    const result = await this.mainDBService.query(query);
    return result.rows;
  }
  async postMainPlannerList(body: IPostTodoListItemType): Promise<any> {
    const { userId, date, title, contents, update_time, color } = body;
    const query = {
      text: `INSERT INTO his_planner_list(user_id, date, title, contents, check_list, update_time, index_color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING list_id`,
      values: [userId, date, title, contents, false, update_time, color],
    };
    const result = await this.mainDBService.query(query);
    return result.rows;
  }

  async postSubPlannerList(
    body: IPostTodoListItemType,
    listId: number,
  ): Promise<any> {
    const { date_range } = body;
    const query = {
      text: `INSERT INTO his_sub_planner_list(list_id, date_range) VALUES (${listId}, $1)`,
      values: [date_range],
    };
    await this.mainDBService.query(query);
  }
  async patchPlannerList(
    body: IPostTodoListItemType,
    listId: number,
  ): Promise<any> {
    const { date, title, update_time, contents, check_list, color } = body;
    const query = {
      text: `UPDATE public.his_planner_list SET date = $1, title=$2, update_time=$3, contents=$4, check_list=$5, index_color=$6 WHERE list_id = ${listId};`,
      values: [date, title, update_time, contents, check_list, color],
    };
    await this.mainDBService.query(query);
  }

  async patchSubPlannerList(
    body: IPostTodoListItemType,
    listId: number,
  ): Promise<any> {
    const { date_range } = body;
    const query = {
      text: `UPDATE his_sub_planner_list SET date_range = $1 WHERE list_id = ${listId};`,
      values: [date_range],
    };
    await this.mainDBService.query(query);
  }

  async deletePlannerList(listId: number): Promise<any> {
    const query = `DELETE FROM his_planner_list WHERE list_id = ${listId}`;
    await this.mainDBService.query(query);
  }
  async deleteSubPlannerList(listId: number): Promise<any> {
    const query = `DELETE FROM his_sub_planner_list WHERE list_id = ${listId}`;
    await this.mainDBService.query(query);
  }
}
