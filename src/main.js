// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Home from './components/Home.vue'
import worklog from './components/worklog.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
/* eslint-disable no-new */
const routes = [
  { path: '/',component: Home },
  { path: '/worklog',component: worklog }
]

const router = new VueRouter({
  routes  // === routes: routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')