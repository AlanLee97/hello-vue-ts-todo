<template>
  <div id="app">
    <Header />
    <Todo class="w1200 self-center" />

    <div class="mask"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import Header from './components/header/Header.vue';
import Todo from './components/Todo.vue';

@Component({
  components: {
    Header,
    Todo
  },
})
export default class App extends Vue {
  @Mutation
  private updateIsMobile!: (value: boolean) => void;

  created() {
    console.log('App.vue created');
    this.checkIsMobile();
  }

  checkIsMobile() {
    window.addEventListener('resize', () => {
      // mutation
      this.updateIsMobile(window.innerWidth < 768);
      // this.$store.commit('updateIsMobile', window.innerWidth < 768);
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  z-index: 1;
}

.mask {
  position: fixed;
  z-index: -1;
  background: rgba(0, 0, 0, .3);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

body {
  background-image: url('./assets/bg3.jpg');
  background-size: cover;
  background-attachment: fixed;
}

.w1200 {
  max-width: 1200px;
  /* border: 1px solid red; */
}

.self-center {
  margin: 0 auto;
}
</style>
