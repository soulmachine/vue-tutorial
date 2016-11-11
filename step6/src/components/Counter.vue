<template>
  <div id="counter">
    <p>Current count: {{ count }}, the count is {{ evenOrOdd }}</p>
    <button v-on:click="increment">+</button>
    <button v-on:click="decrement">-</button>
    <button v-on:click="incrementIfOdd">Increment if odd</button>
    <button v-on:click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
export default {
  props: {
    count: Number
  },
  computed: {
    evenOrOdd () {
      return count % 2 === 0 ? 'even' : 'odd'
    }
  },
  methods: {
    increment () {
      this.$emit('increment')
    },
    decrement () {
      this.$emit('decrement')
    },
    incrementIfOdd () {
      this.$emit('incrementIfOdd')
    },
    incrementAsync () {
      this.$emit('incrementAsync')
    }
  }
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

