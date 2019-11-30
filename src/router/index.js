import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import test from '../views/test.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history'
})

export default router
