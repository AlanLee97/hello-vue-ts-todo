<template>
  <div class="operation-bar w1200">
    <el-button type="primary" @click="openAddDialog" class="item">添加 TODO</el-button>
    <el-select v-model="status" placeholder="筛选" class="item" @change="selectChnage">
      <el-option
        v-for="item in todoStatus"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :width="isMobile ? '90vw' : '60vw'">
      <el-form :model="form">
        <el-form-item label="名称" label-width="100">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="100">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import EventBus from '@/util/EventBus';
import TodoService from '@/service/TodoService';
import {ITodoItem, IOption} from '@/interfaces';
import { State } from 'vuex-class';

@Component({
  name: 'OperationBar'
})
export default class OperationBar extends Vue{
  form: ITodoItem = {
    id: 0,
    title: '',
    content: '',
    isDone: false,
    status: 0
  };
  todoStatus: IOption[] = [
    {label: '所有', value: -1},
    {label: '未完成', value: 0},
    {label: '已完成', value: 1}
  ];
  @State
  isMobile!: boolean;
  dialogVisible: boolean = false;
  dialogTitle: string = '添加Todo';
  openMode: string = 'add';
  status: number = -1;
  created() {
    EventBus.$on('openDialog', (data: { mode: string; id: number}) => {
      this.openMode = data.mode;
      this.form.id = data.id;
      this.openUpdateDialog();
    });
  }

  // computed
  get notFill() {
    let form = this.form as {
      id: number;
      title: string;
      content: string;
      isDone: boolean;
      };
    return form.title === '' && form.content === '';
  }

  openAddDialog() {
    this.openMode = 'add';
    this.openDialog();
  }
  openUpdateDialog() {
    this.dialogTitle = "更新Todo";
    let todoItem = TodoService.getTodoItem(this.form.id);
    this.form = JSON.parse(JSON.stringify(todoItem));
    this.openDialog();
  }
  openDialog() {
    this.dialogVisible = true;
    if(this.openMode === 'add') {
      this.resetFrom();
      this.dialogTitle = "添加Todo";
    }
  }
  closeDialog() {
    this.dialogVisible = false;
    this.resetFrom();
  }

  confirm() {
    if(this.notFill) {
      this.$message.warning('请填写表单！');
      return;
    }
    if(this.openMode === 'add') {
      this.addTodo();
    }
    if(this.openMode === 'update') {
      this.updateTodoItem()
    }
  }

  addTodo() {
    this.dialogVisible = false;
    TodoService.add(this.form);
  }

  resetFrom() {
    this.form.id = 0;
    this.form.title = '';
    this.form.content = '';
    this.form.isDone = false;
  }

  updateTodoItem() {
    TodoService.update(this.form);
    this.closeDialog();
  }

  selectChnage(val: any) {
    console.log(val);
    EventBus.$emit('changeSelect', {status: val});
  }
  
}
</script>

<style scoped lang="scss">
.operation-bar {
  text-align: left;
  margin-top: 40px;

  .item {
    margin-right: 20px;
  }

  @media screen and (max-width: 768px) {
    // margin-left: 20px;
    .el-select {
      width: 36vw
    }
  }
}
</style>
