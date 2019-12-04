import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

import axios from 'axios'
// Vue.prototype.$axios = axios;


Vue.use(Vuex);

export const store = new Vuex.Store({

	state: {
		user: {
			isLogin : false,
			isVerified: false,
			isAdmin: false,
			isUser: false,
			isEmailVerified: false,
			isChangeRequest: false,
		},
		user_info: '',
		model:{
			modelAddress: 'http://www.localhost/vuetify_intern/model/model/',
		},
		upload_directory: {
			recentPhoto_directory: 'http://www.localhost/vuetify_intern/model/assets/img/uploads/recent_photos',
			oldPhoto_directory: 'http://www.localhost/vuetify_intern/model/assets/img/uploads/old_photos',
			groupPhoto_directory: 'http://www.localhost/vuetify_intern/model/assets/img/uploads/group_photos',
		}
	},
	mutations: {
		loginFalse: state => {
			state.user.isLogin = false;
		},
		loginTrue: state => {
			state.user.isLogin = true;
		},
		set_user_info: (state , user_info ) => {
			
			state.user_info = user_info;
			//state.user.isLogin = true;
		},
		checkCookie: (state)=>{
			VueCookies.isKey('email') ? state.user.isLogin = true : state.user.isLogin = false; 

		}
	},
	getters: {
		auth: state=>{
			return state.user;
		},
		modelLogin: state => {
			return state.model.modelAddress+'login.php';
		},
		modelRegistration: state => {
			return state.model.modelAddress+'registration.php';
		},
		modelProfile_forgot_password: state => {
			return state.model.modelAddress+'profile_forgot_password.php';
		},
		modelProfile_basic: state => {
			return state.model.modelAddress+'profile_basic.php';
		},
		getAllInfo: state => {
			return state.user_info;
		}
		
	},
	actions: {

		getAllDataFromDB : (context, url , email) => {
			
			axios.post( url , {
				purpose : 'getProfileBasicInfo',
				email : email , 
			})
			.then( function(response){
				
					//console.log(response);
					context.commit('set_user_info' , response.data);
				}.bind(this))
			.catch(function () {
               
            }.bind(this)); 


		}


	}
	
});