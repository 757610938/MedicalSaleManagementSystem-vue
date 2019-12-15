import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Order from '../components/user/Order.vue'
import Jurisdi from '../components/user/Jurisdi.vue'
import Sorder from '../components/sale/Sorder.vue'
import Scustomer from '../components/sale/Scustomer.vue'
import Spush from '../components/sale/Spush.vue'
import Info from '../components/information/information.vue'
import Stock from '../components/ware/Stock.vue'
import Wstock from '../components/ware/Wstock.vue'
import Pstock from '../components/ware/Pstock.vue'
import Ostock from '../components/ware/Ostock.vue'
import Porder from '../components/purchase/Porder.vue'
import Precords from '../components/purchase/Precords.vue'
import Psupplier from '../components/purchase/Psupplier.vue'
import Medicine from '../components/medicine/medicine.vue'
import IStock from '../components/information/iStock.vue'

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
      { path: '/scustomer', component: Scustomer },
      { path: '/spush', component: Spush },
      { path: '/info', component: Info },
      { path: '/stock', component: Stock },
      { path: '/wstock', component: Wstock },
      { path: '/pstock', component: Pstock },
      { path: '/ostock', component: Ostock },
      { path: '/porder', component: Porder },
      { path: '/precords', component: Precords },
      { path: '/psupplier', component: Psupplier },
      { path: '/medicine', component: Medicine },
      { path: '/istock', component: IStock }
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
