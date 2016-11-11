import Vue from 'vue'
import App from './App'
import Hello from './components/Hello'
import Counter from './components/Counter'
import Douban from './components/Douban'
import store from './store/index'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Element)

const routes = [
  { path: '/', component: Hello },
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
