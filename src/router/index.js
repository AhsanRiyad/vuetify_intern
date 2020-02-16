import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
import registration from '../views/Registration.vue'
import profile_forgot_password from '../views/profile_forgot_password.vue'
import profile from '../views/profile.vue'
import new_user_request from '../views/new_user_request.vue'
import data_update_request from '../views/data_update_request.vue'
import search from '../views/search.vue'
import data_privacy from '../views/data_privacy.vue'
import test from '../views/test.vue'
import { store } from '@/store/store'
import VueCookies from 'vue-cookies'
import axios from 'axios'



Vue.use(VueRouter)

function requireAuth (to, from, next) {

  if (store.getters.auth.isLogin) { /// THIS NOT WORK, HOW TO ACCESS STORE?

   return next();


 } else {
  store.commit('checkCookie');
  if(store.getters.auth.isLogin){


    axios.post( store.getters.modelProfile_basic , {
      purpose : 'getProfileBasicInfo',
      email : VueCookies.get('email') , 
    })
    .then( function(response){
          //console.log(response);
          if(response.data !=0 && response.data.forgot_password_crypto == VueCookies.get('crypto'))
          {
            store.commit('set_user_info' , response.data);
            return next()
          }else{
            return next({
              name: 'login'
            })
          }

          
        }.bind(this))
    .catch(function () {

      return next({
        name: 'login'
      })

    }.bind(this)); 


  }

  // store.dispatch('getAllDataFromDB', store.getters.modelProfile_basic , VueCookies.get('email'));
  }
}



const routes = [

{
  path: '/login' ,
  alias: '/',
  name: 'login',
  component: login
},
{
  path: '/registration',
  name: 'registration',
  component: registration
},
{
  path: '/profile_forgot_password',
  name: 'profile_forgot_password',
  component: profile_forgot_password
},
{
  path: '/profile',
  name: 'profile',
  component: profile,
  beforeEnter: requireAuth
},
{
  path: '/new_user_request',
  name: 'new_user_request',
  component: new_user_request,
  beforeEnter: requireAuth
},
{
  path: '/data_update_request',
  name: 'data_update_request',
  component: data_update_request,
  beforeEnter: requireAuth
},
{
  path: '/search',
  name: 'search',
  component: search,
  beforeEnter: requireAuth
},
{
  path: '/data_privacy',
  name: 'data_privacy',
  component: data_privacy,
  beforeEnter: requireAuth
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
    mode: 'history' /*mode: 'hash'*/
  })

  export default router
