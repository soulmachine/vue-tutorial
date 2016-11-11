<template>
  <div id="counter">
    <p>Current count: {{ count }}, the count is {{ evenOrOdd }}</p>
    <el-button v-on:click="increment">+</el-button>
    <el-button v-on:click="decrement">-</el-button>
    <el-button v-on:click="incrementIfOdd">Increment if odd</el-button>
    <el-button v-on:click="incrementAsync">Increment async</el-button>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'evenOrOdd'
    ]),
    ...mapState([
      'count'
    ])
  },
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  text-align: center;
  font-size: 40px;
  padding: 40px 0;
}

button {
  width: 100px;
  height: 40px;
  background: #42B983;
  color: #fff;
}
</style>

