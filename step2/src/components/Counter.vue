<template>
  <div class="counter">
    <p>Current count: {{count}}</p>
    <button v-on:click="increment">+</button>
    <button v-on:click="decrement">-</button>
    <button v-on:click="incrementIfOdd">Increment if odd</button>
  </div>
</template>

<script>
  export default {
    name: 'Counter',
    data () {
      return {
        count: 0
      }
    },
    methods: {
      increment (event) {
        this.count++
      },
      decrement (event) {
        this.count--
      },
      incrementIfOdd (event) {
        if (this.count % 2 === 1) this.count++
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

