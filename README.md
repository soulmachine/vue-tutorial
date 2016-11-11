本教程教大家一步一步用vue来写一个web App, 从简单到复杂，所有步骤都有详细解释。

Table of Contents
-----------------
1. [Step1: vue-cli](#step1-vue-cli)
1. [Step2: 编写一个简单的Counter组件](#step2-编写一个简单的counter组件)
1. [Step3: vuex](#step3-vuex)
1. [Step4: 调用后端 Restful API](#step4-调用后端-restful-api)
1. [Step5: vue-router](#step5-vue-router)
1. [Step6: 编写可复用组件](#step6-编写可复用组件)


# Step1: vue-cli

全局安装 `vue-cli`,

    npm install -g vue-cli

使用 `vue-cli` 创建一个空项目，

    vue init webpack step1
    ? Project name vue-starter-kit
    ? Project description A Vue.js project
    ? Author soulmachine <soulmachine@gmail.com>
    ? Vue build standalone
    ? Use ESLint to lint your code? Yes
    ? Pick an ESLint preset Standard
    ? Setup unit tests with Karma + Mocha? Yes
    ? Setup e2e tests with Nightwatch? Yes

编译并运行，

     cd step1
     npm install
     npm run dev

会自动弹出浏览器并打开 <http://localhost:8080/> ，可以效果了。


## 配置 WebStorm 开发环境

本教程使用WebStorm 作为开发工具，首先要安装Vue插件，点击 `WebStorm->Preferences->Plugins`，在右边的窗口点击`Browse repositories`，搜索 Vue, 会看到两个插件，`vue-for-idea`和`Vue.js`，我们选择前者，虽然后者的下载次数多，但是很久没有更新了。不过目前两个插件都无法识别 `<button v-on:click="decrement">-</button>` 里面的`v-on`指令，会报错。

把刚刚创建的项目工程导入 WebStorm，

1. 启动WebStorm ，安装 Vue.js 插件
1. 点击菜单 `File->Open`，浏览到项目根目录，打开
1. 在左上角点击菜单 `Preferences->Language & Frameworks->JavaScript`，在右边的窗口中，`JavaScript language version` 选择`ECMAScript 6`，勾选`Perfer strict mode`
1. 浏览到 `Language & Frameworks->JavaScript->Libraries`，在右边的窗口中，勾选`ECMAScript 6`
1. 浏览到 `Language & Frameworks->JavaScript->Code Quality Tools->ESLint`，在右边的窗口中勾选`Enable`
1. 浏览到 `Language & Frameworks->Node.jsJ and NPM`，在右边的窗口中找到 `Node.js Core library`，点击 `Enable`按钮
1. 为了让 webstorm 能够识别 `v-on`这类标签，点击 `Preferences->Editor->Inspections`，在右边的窗口点击`HTML->Unkown HTML tag attribute`，在`Custom HTML tag attributes`中添加以下属性：

        v-on,v-on:click,v-on:change,v-on:focus,v-on:blur,v-on:keyup,:click,@click,v-model,v-text,v-bind,:disabled,@submit,v-class,:class,v-if,:value,v-for,scoped,@click.prevent,number,:readonly,@input,@click,v-show,v-else,readonly,v-link,:title,:for,tab-index,:name,:id,:checked,transition,@submit.prevent,autocapitalize,autocorrect,slot,v-html,:style

以上配置参考了这个答案 <http://stackoverflow.com/a/36929396/381712>


# Step2: 编写一个简单的Counter组件

先把 step1 的项目拷贝过来

    cp -r step1 step2
    cd step2

添加一个文件 `src/components/Counter.vue`，内容如下：

```javascript
<template>
  <div id="counter">
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
```

`<script>` 中的 `name` 字段是可选的，一般还是加上，方便 debug 的时候知道是哪个组件出了问题。

在 `App.vue`中引入 `Counter`组件，需要修改三处，首先在 `<script>`的开头import,

    import Counter from './components/Counter'

然后在 `components`里加入 Counter组件，

    components: {
      Hello,
      Counter
    }

在 `<template>`里使用 Counter组件，

    <counter></counter>

最终 `App.vue`内容如下，


```javascript
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <counter></counter>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Counter from './components/Counter'

export default {
  name: 'app',
  components: {
    Hello,
    Counter
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
```


运行 `npm run dev` 应该可以看到Counter组件了。


# Step3: vuex

状态管理是非常核心的功能，vuex 是尤大大专门为vue打造的状态管理框架，类似于 React 社区里的Redux. Vuex 最好的文档就是官方的文档 <https://vuex.vuejs.org/>，只看这一份文档就足够了，官方的文档写的简洁然而又通俗易懂。

这一节我们将使用 vuex 来改造 Counter 组件，把它的状态放入到 vuex的单根树里，因此Counter变成了一个无状态的组件。 大部分代码参考了[官方的Counter例子](https://github.com/vuejs/vuex/tree/dev/examples/counter)。

首先拷贝项目，

    cp -r step2 step3
    cd step3

然后安装 vuex,

    npm install --save vuex

首先创建一个全局的 store, 新建一个文件 `src/store/index.js`,


```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
```


然后我们需要将 store 注入到所有组件中，只需要在 `src/main.js` 中将这个全局的`store`对象传递给根组件，

```javascript
import Vue from 'vue'
import App from './App'
import store from './store/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
```

然后所有App的子组件都可以用 `this.$store` 来访问这个状态树了。

最后我们开始改造 Counter组件，将其变为一个无状态组件， `src/components/Counter.vue` 内容如下：

```javascript
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
```

可以看到Counter 组件的内部状态，即 `data` 消失了，取而代之的是数据直接从 `this.$store` 获取。不过要注意，local state is fine, 能用局部状态就没必要放入 vuex的全局树中，这里Counter组件用局部状态其实挺好，只是这一节为了学习目的，故意放入 vuex 中了。

这一节我们把 `incrementIfOdd` 变为了一个 action, 同时增加了一个 `incrementAsync`。关于 action 和 mutation 的区别请看官网 <https://vuex.vuejs.org/en/actions.html> 。


# Step4: 调用后端 Restful API

单页面应用SPA免不了需要向后端服务请求数据，这一节我们选择 vue-resource 这个 HTTP客户端。

后端服务就用豆瓣的这个公开API， <https://api.douban.com/v2/movie/top250>。

首先拷贝项目，

    cp -r step3 step4
    cd step4

然后安装 axios,

    npm install --save vue-resource

在 `src/main.js` 引入并注册 vue-resource:

```javascript
import VueResource from 'vue-resource'
Vue.use(VueResource)
```

创建一个组件 `src/components/Douban.vue`,

```javascript
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
```

注意不能用 get 只能用jsonp，因为跨域请求的缘故。

最后，在 `App.vue` 中使用这个组件，需要添加三行代码， 在 `<template>`里添加一行 `<douban></douban>`，在 `<script>`里引入这个组件，`import Douban from './components/Douban'` 并添加到 `components` 字段。


# Step5: vue-router

现在所有的组件都挤在首页上，很难看，需要把它们分散到多个页面，这时候就需要引入客户端路由，使用官方的 vue-router。 官方文档 <http://router.vuejs.org/> 。

先拷贝项目，

    cp -r step4 step5
    cd step5

安装 vue-router,

    npm install --save vue-router

在 `src/main.js` 引入并注册 vue-router，创建一个路由实例并传递给Vue实例，

```javascript
import Vue from 'vue'
import App from './App'
import Counter from './components/Counter'
import Douban from './components/Douban'
import store from './store/index'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueResource)
Vue.use(VueRouter)

const routes = [
  { path: '/counter', component: Counter },
  { path: '/douban', component: Douban }
]

const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
```

然后在 `src/App.vue` 的`<template>`节点删除原来的Counter和Douban两个组件，添加 `<router-link>` 和 `<router-view>`，

```html
<p>
  <router-link to="/counter">Go to Counter</router-link>
  <router-link to="/douban">Go to Douban</router-link>
</p>
<!-- component matched by the route will render here -->
<router-view></router-view>
```


# Step6: 编写可复用组件

在第3步中，我们的 Counter 组件，内部直接使用了Vuex 的东西，跟 Vuex 是强耦合的。如果我们想要把Counter组件开源出去，做成一个可复用的组件，该怎么办？ 需要去掉 Vuex 依赖，仅仅依赖Vue, 只使用 props 和 events 来实现父子组件通讯。

在官方文档[这里](https://cn.vuejs.org/v2/guide/components.html#构成组件)，已经说到，父子组件之间，一般用 props down, events up 来实现通讯。

接下来我们来改造 Counter 组件，让它拜托 Vuex 的依赖。

```html
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
  name: 'counter',
  props: {
    count: Number
  },
  computed: {
    evenOrOdd () {
      return this.count % 2 === 0 ? 'even' : 'odd'
    }
  },
  methods: {
    increment () {
      this.$emit('incrementEvent')
    },
    decrement () {
      this.$emit('decrementEvent')
    },
    incrementIfOdd () {
      this.$emit('incrementIfOddEvent')
    },
    incrementAsync () {
      this.$emit('incrementAsyncEvent')
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
```

现在 Counter 组件的数据来源只有一个，就是 props 里的 count 了，同时 Counter 定义了四个自定义事件，向上冒泡给父组件，由父组件来响应。

接下来我们来改在父组件，即 `src/App.vue`,

```html
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
```

基本上，把第三步中的Counter里关于 Vuex的部分，原封不动的搬到了App组件里了，现在 App 组件是跟Vuex耦合的了，这是无可避免的，一个 Web 应用，至少根组件是要跟 Vuex 耦合的。

在 `template` 节点， 我们监听Counter 组件的四个事件。

目前有两个问题还没有解决：

* 当前的代码，比step3 中的相比， boilplate 代码多了很多，是我用的姿势不对吗？
* Counter组件如果放在 `<router-link>` 里，怎么向它传递 props 数据，以及怎么用`v-on`监听事件？ 现在只能把它暂时从 `<router-link>`移出来了。
