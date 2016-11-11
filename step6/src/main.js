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
