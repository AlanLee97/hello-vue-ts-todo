import Vuex from 'vuex';
import Vue from 'vue';
import {ITodoItem, State} from '@/interfaces';

Vue.use(Vuex);

const todoList: Array<ITodoItem> = []

let state: State = {
  todoList: todoList,
  isMobile: false,
};

// 初始化时，判断localStorage里是否有数据，如果有就用它初始化store
const localState: State = JSON.parse(localStorage.getItem('state') as string);
if(localState) {
  state = localState;
}

const store = new Vuex.Store({
  state: state,
  getters: {
    getTodoList: state => state.todoList,
    getIsMobile: state => state.isMobile,
  },
  mutations: {
    updateTodoList(state, value: ITodoItem[]) {
      state.todoList = value;
    },
    appendTodoList(state, value: ITodoItem) {
      const todoItem: ITodoItem = value;
      todoItem.id = state.todoList.length + 1;
      state.todoList.push(todoItem);
    },
    updateIsMobile(state, value: boolean) {
      state.isMobile = value;
    },
  }
})

// 页面销毁时把store数据保存到localStorage
window.addEventListener('beforeunload', () => {
  const state = store.state;
  localStorage.setItem('state', JSON.stringify(state));
})

export default store;