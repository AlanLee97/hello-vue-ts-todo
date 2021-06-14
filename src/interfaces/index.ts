export interface ITodoItem {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
  status: number;
}

export interface IOption {
  label: string,
  value: number
}

export interface State {
  todoList: ITodoItem[],
  isMobile: boolean
}