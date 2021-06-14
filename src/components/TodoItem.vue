<template>
  <div>
    <div class="mobile-todo-item" v-if="isMobile">
      <div class="check-box">
        <el-checkbox v-model="done" class="item"></el-checkbox>
        <!-- <div class="item">{{id}}</div> -->
      </div>
      <div class="item" @click="updateTodo(id)">
        <h4 class="title">{{title}}</h4>
        <div class="content">{{content}}</div>
      </div>
      <div class="btn-wrapper">
        <el-button type="danger" size="small" @click="deleteTodo(id)">删除</el-button>
      </div>
    </div>

    <div class="todo-item" v-else>
      <el-checkbox v-model="done" class="item"></el-checkbox>
      <div class="item">{{id}}</div>
      <div class="item">{{title}}</div>
      <div class="item">{{content}}</div>
      <div class="item btn-wrapper">
        <el-button @click="updateTodo(id)" size="small">修改</el-button>
        <el-button class="item" type="danger" size="small" @click="deleteTodo(id)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TodoService from '@/service/TodoService';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {State} from 'vuex-class';
import EventBus from '@/util/EventBus';
import {ITodoItem} from '@/interfaces';

@Component
export default class TodoItem extends Vue {
  // props
  @Prop() private id!: number;
  @Prop() private title!: string;
  @Prop() private content!: string;
  @Prop() private isDone!: boolean;

  // state
  @State
  isMobile!: boolean;

  done: boolean = this.isDone;

  @Watch('done', {deep: true})
  watchDone(newVal: boolean, oldVal: boolean) {
    this.updateTodoItemState(newVal);
  }

  deleteTodo(id: number): void {
    TodoService.delete(id);
  }

  updateTodo(id: number): void {
    EventBus.$emit('openDialog', {mode: 'update', id: id})
  }

  updateTodoItemState(state: boolean) {
    let todoItem: ITodoItem = {
      id: this.id,
      title: this.title,
      content: this.content,
      isDone: state,
      status: state ? 1 : 0
    }
    TodoService.update(todoItem);
  }
}



</script>

<style scoped lang="scss">
.todo-item {
  display: flex;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
  .item {
    margin: 10px 0;
    flex: 1;
  }

  .btn-wrapper {
    text-align: right;
    button {
      margin: 0 10px;
    }
  }
}

.mobile-todo-item {
  display: flex;
  align-items: center;
  .check-box {
    margin-right: 20px;
  }
  .content {
    color: #ddd;
  }
  .item {
    margin: 10px 0;
    flex: 1;
    text-align: left;
  }

  .btn-wrapper {
    text-align: right;
  }
}


</style>