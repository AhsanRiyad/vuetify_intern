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
			modelAddress1: 'http://ndc92spa.riyadahsan.xyz/model/model/',
			modelAddress: 'http://localhost/model/model/',
		},
		upload_directory: {
			rootDirectory: 'http://localhost/model/',
			recentPhoto_directory: 'http://localhost/model/assets/img/uploads/recent_photos',
			oldPhoto_directory: 'http://localhost/model/assets/img/uploads/old_photos',
			groupPhoto_directory: 'http://localhost/model/assets/img/uploads/group_photos',
		},
		component_name: 'profile_basic',
		page_title: 'Dashboard',
		search_result: [],
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

		},
		setComponentName: ( state , name ) =>{
			state.component_name = name ;
		},
		setPageTitle: ( state , name ) =>{
			state.page_title = name ;
		},
		setSearchResult: ( state , name ) =>{
			state.search_result = name ;
		},
	},
	getters: {
		auth: state=>{
			return state.user;
		},
		modelLogin: state => {
			return state.model.modelAddress+'login.php';
		},
		modelAddress: state => {
			return state.upload_directory.rootDirectory;
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
		modelProfile_personal: state => {
			return state.model.modelAddress+'profile_personal.php';
		},
		modelProfile_address: state => {
			return state.model.modelAddress+'profile_address.php';
		},
		modelProfile_photo_upload: state => {
			return state.model.modelAddress+'profile_photo_upload.php';
		},
		modelProfile_change_password: state => {
			return state.model.modelAddress+'profile_change_password.php';
		},
		modelProfile_change_email: state => {
			return state.model.modelAddress+'profile_change_email.php';
		},
		modelnew_user_request: state => {
			return state.model.modelAddress+'new_user_request.php';
		},
		modeldata_update_request: state => {
			return state.model.modelAddress+'data_update_request.php';
		},
		modelSearch: state => {
			return state.model.modelAddress+'search.php';
		},
		modelAdminChangeInfo: state => {
			return state.model.modelAddress+'admin_change_info.php';
		},
		getAllInfo: state => {
			return state.user_info;
		},
		getComponentName: state => {
			return state.component_name;
		},
		getPageTitle: state => {
			return state.page_title;
		},
		getSearchResult: state => {
			return state.search_result;
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