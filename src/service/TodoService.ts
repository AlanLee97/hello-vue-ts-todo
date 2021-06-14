import store from '../store'


interface ITodoItem {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}


export default class TodoService {
  static add(todoItem: ITodoItem): void {
    const _todoItem: ITodoItem = JSON.parse(JSON.stringify(todoItem));
    store.commit('appendTodoList', _todoItem);
  }

  static delete(id: number): void {
    const todoList: ITodoItem[] = this.getTodoList();
    let i = -1;
    todoList.map((item, index) => {
      if(item.id === id) {
        i = index;
      }
    });
    todoList.splice(i, 1);
    store.commit('updateTodoList', todoList);
  }

  static update(todoItem: ITodoItem): void {
    const _todoItem: ITodoItem = JSON.parse(JSON.stringify(todoItem));
    const todoList = this.getTodoList();
    const id = todoItem.id;
    let i = -1;
    todoList.map((item, index) => {
      if(item.id === id) {
        i = index;
      }
    })
    todoList.splice(i, 1, _todoItem);

    store.commit('updateTodoList', todoList);
  }

  static getTodoList(): ITodoItem[] {
    return store.state.todoList;
  }

  static getTodoItem(id: number): ITodoItem {
    const todoList = this.getTodoList();
    let todoItem: ITodoItem = {} as ITodoItem;
    todoList.map((item) => {
      if(item.id === id) {
        todoItem = item;
      }
    })
    return todoItem;
  }
}