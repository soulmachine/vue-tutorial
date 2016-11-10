本教程教大家一步一步用vue来写一个web App, 从简单到复杂，所有步骤都有详细解释。

Table of Contents
-----------------
1. [Step1: vue-cli](#step1-vue-cli)
1. [Step2: 编写一个简单的Counter组件](#step2-编写一个简单的counter组件)
1. [Step3: vuex](#step3-vuex)


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
```

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

这一节我们将使用 vuex 来改造 Counter 组件，把它的状态放入到 vuex的单根树里，因此Counter变成了一个无状态的组件。

首先拷贝项目，

    cp -r step2 step3
    cd step3

然后安装 vuex,

    npm install --save vuex
