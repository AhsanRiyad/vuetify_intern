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
import gallery from '../views/gallery.vue'
import admin_options from '../views/admin_options.vue'
import add_user from '../views/add_user.vue'
import test from '../views/test.vue'
import { store } from '@/store/store'
import VueCookies from 'vue-cookies'
import axios from 'axios'

Vue.use(VueRouter)

function requireAuthLoginCheck (to, from, next) {

  // alert(to.meta.title);

  if(store.getters.auth.isLogin  ) { /// THIS NOT WORK, HOW TO ACCESS STORE?

    if(store.getters.auth.isAdmin){
      return next() ;

    }else if(to.meta.title != 'add_user' && to.meta.title != ''  && to.meta.title != 'new_user_request'  && to.meta.title != 'data_update_request'  && to.meta.title != 'admin_options'){
      return next() ;
    }

     
  }else {
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



//function2 starts
/*function requireAuthAdminCheck (to, from, next) {

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

}
}
*/


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
  path: '/profile',
  name: 'profile',
  component: profile,
  beforeEnter: requireAuthLoginCheck,
  meta: {
    title: 'profile'
  }
},
{
  path: '/new_user_request',
  name: 'new_user_request',
  component: new_user_request,
  beforeEnter: requireAuthLoginCheck,
  meta: {
    title: 'new_user_request'
  }
},
{
  path: '/data_update_request',
  name: 'data_update_request',
  component: data_update_request,
  beforeEnter: requireAuthLoginCheck,
  meta: {
    title: 'data_update_request'
  }
},
{
  path: '/search',
  name: 'search',
  component: search,
  beforeEnter: requireAuthLoginCheck,
  meta: {
    title: 'search'
  }
},
{
  path: '/data_privacy',
  name: 'data_privacy',
  component: data_privacy,
  beforeEnter: requireAuthLoginCheck,
  meta: {
    title: 'data_privacy'
  }
},
{
  path: '/admin_options',
  name: 'admin_options',
  component: admin_options,
  beforeEnter: requireAuthLoginCheck,
  meta: {
    title: 'admin_options'
  }
},
{
  path: '/gallery',
  name: 'gallery',
  component: gallery,
  beforeEnter: requireAuthLoginCheck,
  meta: {
    title: 'gallery'
  }
},
{
  path: '/add_user',
  name: 'add_user',
  component: add_user,
  beforeEnter: requireAuthLoginCheck,
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
