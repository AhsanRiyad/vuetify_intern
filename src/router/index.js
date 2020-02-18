import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
import registration from '../views/Registration.vue'
import profile_forgot_password from '../views/profile_forgot_password.vue'
import profile_password_recovery from '../views/profile_password_recovery.vue'
import profile from '../views/profile.vue'
import new_user_request from '../views/new_user_request.vue'
import data_update_request from '../views/data_update_request.vue'
import search from '../views/search.vue'
import data_privacy from '../views/data_privacy.vue'
import gallery from '../views/gallery.vue'
import admin_options from '../views/admin_options.vue'
import add_user from '../views/add_user.vue'
import test from '../views/test.vue'
// import VueCookies from 'vue-cookies'
// import { store } from '@/store/store.js'
// import axios from 'axios'
import authMixins from '@/mixins/authMixin'


Vue.use(VueRouter)





const routes = [

{
  path: '/login' ,
  alias: '/',
  name: 'login',
  component: login,
  meta: {
    title: 'login'
  }
},
{
  path: '/registration',
  name: 'registration',
  component: registration,
  meta: {
    title: 'registration'
  }
},
{
  path: '/profile_forgot_password',
  name: 'profile_forgot_password',
  component: profile_forgot_password,
  meta: {
    title: 'profile_forgot_password'
  }
},
{
  path: '/profile_password_recovery',
  name: 'profile_password_recovery',
  component: profile_password_recovery,
  meta: {
    title: 'profile_password_recovery'
  }
},
{
  path: '/profile',
  name: 'profile',
  component: profile,
  beforeEnter: authMixins.requireAuthLoginCheck,
  meta: {
    title: 'profile'
  }
},
{
  path: '/new_user_request',
  name: 'new_user_request',
  component: new_user_request,
  beforeEnter: authMixins.requireAuthLoginCheck,
  meta: {
    title: 'new_user_request'
  }
},
{
  path: '/data_update_request',
  name: 'data_update_request',
  component: data_update_request,
  beforeEnter: authMixins.requireAuthLoginCheck,
  meta: {
    title: 'data_update_request'
  }
},
{
  path: '/search',
  name: 'search',
  component: search,
  beforeEnter: authMixins.requireAuthLoginCheck,
  meta: {
    title: 'search'
  }
},
{
  path: '/data_privacy',
  name: 'data_privacy',
  component: data_privacy,
  beforeEnter: authMixins.requireAuthLoginCheck,
  meta: {
    title: 'data_privacy'
  }
},
{
  path: '/admin_options',
  name: 'admin_options',
  component: admin_options,
  beforeEnter: authMixins.requireAuthLoginCheck,
  meta: {
    title: 'admin_options'
  }
},
{
  path: '/gallery',
  name: 'gallery',
  component: gallery,
  beforeEnter: authMixins.requireAuthLoginCheck,
  meta: {
    title: 'gallery'
  }
},
{
  path: '/add_user',
  name: 'add_user',
  component: add_user,
  beforeEnter: authMixins.requireAuthLoginCheck,
  meta: {
    title: 'add_user'
  }
},
{
  path: '/test',
  name: 'test',
  component: test,
  meta: {
    title: 'test'
  }
},
{
  path: '/about',
  name: 'about',
  meta: {
    title: 'about'
  },
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
    mode: 'history' /*mode: 'hash'*/
  })

  export default router
