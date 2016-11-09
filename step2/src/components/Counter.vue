<template>
  <div class="counter">
    <p>Current count: {{count}}</p>
    <button v-on:click="increment">+</button>
    <button v-on:click="decrement">-</button>
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

