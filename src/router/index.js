import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Details from '@/components/Detail'
import OwnerRoutes from './owner'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    OwnerRoutes
  ]
})
