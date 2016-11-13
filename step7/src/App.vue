<template>
  <div id="app">
    <el-menu router default-active="/" class="el-menu-demo" mode="horizontal" @select="handleselect">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="counter">Go to Counter</el-menu-item>
      <el-menu-item index="douban">Go to Douban</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Counter from './components/Counter'
import Douban from './components/Douban'

export default {
  name: 'app',
  components: {
    Hello,
    Counter,
    Douban
  },
  methods: {
    handleselect (index) {
      console.log(index)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

