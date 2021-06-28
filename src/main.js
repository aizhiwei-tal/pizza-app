// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import {routes} from './routes'
import axios from 'axios'
import { store } from './store/store.js'

axios.defaults.baseURL='https://pizza-planet-77967.firebaseio.com/'


//配置Vue原型（在任何组件中都可以正常使用axios）
Vue.prototype.http=axios




Vue.config.productionTip = false
Vue.use(VueRouter)


const router = new VueRouter({
  routes,
  mode: 'history',
  // scrollBehavior(to, from, savedPosition) {
  //   // return {x: 0, y: 100}
  //   // return {selector: '.btn'}
  //
  //   if(savedPosition){
  //     return savedPosition
  //   }else{
  //     return {x: 0, y: 100}
  //   }
  // }
})

/*//全局守卫
router.beforeEach((to, from, next) => {
  // alert("还没有登录，请先登录！")
  // next()
  // console.log(to)

  //判断store.gettes.isLogin=== false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    alert("还没有登录，请先登录！")
    next("/login")
  }
})*/

//后置钩子
// router.afterEach((to,from) => {
//   alert("after each")
// })


/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  components: {App},
  template: '<App/>'
})
