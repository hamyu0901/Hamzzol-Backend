interface IPostTodoListItemType {
  listId: number;
  userId: string | null;
  date: string;
  title: string;
  update_time: any;
  contents: string;
  check_list: boolean;
  date_range: string[];
  color: string;
}

export { IPostTodoListItemType };
