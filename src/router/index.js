import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
import registration from '../views/Registration.vue'
import profile_forgot_password from '../views/profile_forgot_password.vue'
import profile from '../views/profile.vue'
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
