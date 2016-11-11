<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <p>
      <counter :count="count" v-on:incrementEvent="increment" v-on:decrementEvent="decrement" v-on:incrementIfOddEvent="incrementIfOdd" v-on:incrementAsyncEvent="incrementAsync" to="/counter" ></counter>
      <router-link to="/douban">Go to Douban</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Counter from './components/Counter'
import Douban from './components/Douban'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: mapState([
    'count'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ]),
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

