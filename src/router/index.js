import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Order from '../components/user/Order.vue'
import Jurisdi from '../components/user/Jurisdi.vue'
import Sorder from '../components/sale/Sorder.vue'
import Smedicine from '../components/sale/Smedicine.vue'
import Spush from '../components/sale/Spush.vue'
import Info from '../components/information/information.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },

  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: 'welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/order', component: Order },
      { path: '/jurisdi', component: Jurisdi },
      { path: '/sorder', component: Sorder },
      { path: '/smedicine', component: Smedicine },
      { path: '/spush', component: Spush },
      { path: '/info', component: Info }
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
