<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <h1 style="line-height: 36px; color: #20A0FF">豆瓣电影排行榜</h2>
    </div>
    <div v-for="article in articles" class="text item">
        {{article.title}}
    </div>
  </el-card>
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
