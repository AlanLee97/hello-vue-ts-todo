<template>
  <div class="header self-center">
    <img class="logo" alt="Vue logo" src="@/assets/logo.png">
    <div>
      <h1>Todo Web App</h1>
      <h3>(Vue.js + TypeScript)</h3>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: 'Header'
})
export default class Header extends Vue {

}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: rgba($color: #000000, $alpha: 0.4);

  .logo {
    width: 60px;
    height: 60px;
    margin-right: 40px;
  }

  h1, h3 {
    line-height: 1.5;
  }
}


</style>