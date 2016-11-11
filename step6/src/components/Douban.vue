<template>
  <div id="douban">
    <ul>
      <li v-for="article in articles">
        {{article.title}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: []
    }
  },
  mounted () {
    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
      headers: {},
      emulateJSON: true
    }).then(function (response) { // success callback
      this.articles = response.data.subjects
    }, function (response) { // error callback
      console.log(response)
    })
  }
}
</script>
