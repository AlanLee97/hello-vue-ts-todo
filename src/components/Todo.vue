<template>
  <div class="todo w1200">
    <operation-bar />

    <div class="todo-list-wrapper">
      <div class="list-head" v-if="!isMobile">
        <div>是否完成</div>
        <div>ID</div>
        <div>标题</div>
        <div>内容</div>
        <div>操作</div>
      </div>
      <div v-if="todoList.length === 0" class="no-data">
        无数据 <br>
        点击左上角按钮添加第1个Todo吧！
      </div>
      <ul v-else>
        <li v-for="(item, index) in todoList" :key="index">
          <todo-item v-show="showItem(item.status)" :id="item.id" :title="item.title" :content="item.content" :isDone="item.isDone"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodoItem from '../components/TodoItem.vue';
import OperationBar from './OperationBar.vue';
import {Mutation, State} from 'vuex-class';
import {ITodoItem} from '@/interfaces';
import EventBus from '@/util/EventBus';

@Component({
  components: {
    TodoItem,
    OperationBar
  }
})
export default class Todo extends Vue {
  // data
  message: string  = 'Hello';
  @State
  todoList!: Array<ITodoItem>;
  @State
  isMobile!: boolean;
  displayStatus: number = -1;

  showItem(status: number): boolean {
    if(this.displayStatus === -1) {
      return true;
    } else {
      return status === this.displayStatus;
    }
  }
  

  // method
  greet(): void {
    window.alert(this.message);
  }

  // 生命周期函数
  beforeCreate() {
    console.log('lifycycle-> beforeCreate');
  }
  created() {
    console.log('lifycycle-> created');
    EventBus.$on('changeSelect', (data: { status: number; }) => {
      this.displayStatus = data.status;
    })
  }
  beforeMount() {
    console.log('lifycycle-> beforeMount');
  }
  mounted() {
    console.log('lifycycle-> mounted');
  }
  beforeUpdate() {
    console.log('lifycycle-> beforeUpdate');
  }
  updated() {
    console.log('lifycycle-> updated');
  }
  beforeDestory() {
    console.log('lifycycle-> beforeDestory');
  }
  destroy() {
    console.log('lifycycle-> destroy');
  }

}
</script>

<style scoped lang="scss">

.todo {
  ul, li {
    list-style: none;
    padding-inline-start: 0;
  }

  .no-data {
    margin-top: 20px;
    color: rgba($color: #fff, $alpha: 0.6);
    text-align: center;
  }

  .todo-list-wrapper {
    margin-top: 40px;
    .list-head {
      display: flex;
      font-weight: 600;
      font-size: 18px;
      div {
        display: flex;
        flex: 1;
        justify-content: center;
      }
    }
  }

  .pagination {
    margin-top: 40px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
}

</style>