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
			recentPhoto_directory: 'http://localhost/model/assets/img/uploads/recent_photos/',
			oldPhoto_directory: 'http://localhost/model/assets/img/uploads/old_photos/',
			groupPhoto_directory: 'http://localhost/model/assets/img/uploads/group_photos/',
		},
		countRequest: {
			verificationRequest: 0,
			changeRequest: 0,
		},
		component_name: 'profile_basic',
		page_title: 'Dashboard',
		search_result: [],
		institution_id_label: ''
	},
	mutations: {
		loginFalse: state => {
			state.user.isLogin = false;
		},
		loginTrue: state => {
			state.user.isLogin = true;
		},
		adminTrue: state => {
			state.user.isAdmin = true;
		},
		verifiedTrue: state => {
			state.user.isVerified = true;
		},
		verifiedFalse: state => {
			state.user.isVerified = false;
		},
		adminFalse: state => {
			state.user.isAdmin = false;
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
		setIInstitution_id_label: ( state , name ) =>{
			state.institution_id_label = name ;
		},
		setVerificationRequest: ( state , name ) =>{
			state.countRequest.verificationInfo = name ;
		},
		setChangeRequest: ( state , name ) =>{
			state.countRequest.changeRequest = name ;
		}
	},
	getters: {
		auth: state=>{
			return state.user;
		},
		isAdmin: state=>{
			return state.user.isAdmin;
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
		modelProfile_password_recovery: state => {
			return state.model.modelAddress+'profile_password_recovery.php';
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
		modeldata_privacy: state => {
			return state.model.modelAddress+'data_privacy.php';
		},
		modelAdminChangeInfo: state => {
			return state.model.modelAddress+'admin_change_info.php';
		},
		modelGallery: state => {
			return state.model.modelAddress+'gallery.php';
		},
		modeladmin_options: state => {
			return state.model.modelAddress+'admin_options.php';
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
		},
		getUploadDirectory: state => {
			return state.upload_directory;
		},
		getIInstitution_id_label: state => {
			return state.institution_id_label;
		},
		isVerified: state => {
			return state.user.isVerified;
		},
		getCountRequest: state => {
			return state.countRequest;
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