<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <p>
      <router-link to="/counter">Go to Counter</router-link>
      <router-link to="/douban">Go to Douban</router-link>
    </p>
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
  margin-top: 60px;
}
</style>

