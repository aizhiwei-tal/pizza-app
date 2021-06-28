import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/about/About'

//二级路由

import Delivery from './components/about/Delivery'
import Contact from './components/about/Contact'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'

//三级路由
import Phone from './components/about/contact/Phone'
import PersonName from './components/about/contact/PersonName'


export const routes = [
  {path: '/', components: {
    default:Home,
      "orderingGuide":OrderingGuide,
      "delivery":Delivery,
      "history":History,
    }
  },
  {path: '/menu', name: "menuLink", component: Menu},
  {path: '/admin', component: Admin,
    // beforeEnter: (to, from, next) => {
    // 路由独享守卫
    //   alert("飞登录状态下，不能访问");
    // next(false)

    //判断store.gettes.isLogin=== false
    // if (to.path == '/login' || to.path == '/register') {
    //   next()
    // } else {
    //   alert("还没有登录，请先登录！");
    //   next("/login")
    // }
    // }
  },
  {path: '/login',name:"loginLink", component: Login},
  {path: '/register', component: Register},
  {path: '/about', name: "aboutLink", redirect: '/history', component: About, children: [
      {path: '/history', name: "historyLink", component: History},
      {
        path: '/about/contact',
        name: "contactLink",
        redirect: '/about/contact/personName',
        component: Contact,
        children: [
          {path: '/about/contact/phone', name: 'phoneLink', component: Phone},
          {path: '/about/contact/personName', name: 'personNameLink', component: PersonName},
        ]
      },
      {path: '/delivery', name: "deliveryLink", component: Delivery},
      {path: '/orderingGuide', name: "orderingGuideLink", component: OrderingGuide},
    ]
  },
  {path: '*', redirect: '/'},
]
