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
			modelAddress1: 'http://ndc92spa.riyadahsan.xyz/backend_all/model_sir/model/',
			modelAddress: 'http://ndc92spa.riyadahsan.xyz/model/model/',
			modelAddress_laravel: 'http://ndc92spa.riyadahsan.xyz/laravel_intern_project/public/',
		},
		upload_directory: {
			rootDirectory: 'http://ndc92spa.riyadahsan.xyz/model/',
			rootDirectory_assets: 'http://ndc92spa.riyadahsan.xyz/model/assets/',
			recentPhoto_directory: 'http://ndc92spa.riyadahsan.xyz/model/img/uploads/recent_photos/',
			oldPhoto_directory: 'http://ndc92spa.riyadahsan.xyz/model/img/uploads/old_photos/',
			groupPhoto_directory: 'http://ndc92spa.riyadahsan.xyz/model/img/uploads/group_photos/',
		},
		countRequest: {
			verificationRequest: 0,
			changeRequest: 0,
		},
		component_name: 'profile_basic',
		getComponentNameAdminOptions: 'institution_id_label',
		page_title: 'Dashboard',
		search_result: [],
		institution_id_label: '',
		form_field_rules: {},

		people_search_list: [],
		base_table_list: [],

		email_for_other_user: '',

	},
	mutations: {

		//latest for interne project for sir... essential
		setPeopleSearchList: ( state , name ) =>{
			state.people_search_list = name ;
		},
		set_base_table_list: ( state , name ) =>{
			state.base_table_list = name ;
		},
		set_email_for_other_user: ( state , name ) =>{
			state.email_for_other_user = name ;
		},







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
		emailVerifiedTrue: state => {
			state.user.isEmailVerified = true;
		},
		emailVerifiedFalse: state => {
			state.user.isEmailVerified = false;
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
			state.countRequest.verificationRequest = name ;
		},
		setChangeRequest: ( state , name ) =>{
			state.countRequest.changeRequest = name ;
		},
		setform_field_rules: ( state , name ) =>{
			state.form_field_rules = name ;
		},
		setinstitution_id_labelComponent: ( state , name ) =>{
			state.getComponentNameAdminOptions = name ;
		}
	},
	getters: {

		//used in search page
		getPeopleSearchList: state =>{
			return state.people_search_list;
		},
		get_base_table_list: state =>{
			return state.base_table_list;
		},
		get_email_for_other_user: state =>{
			return state.email_for_other_user;
		},



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
		assetsRootDirectory: state => {
			return state.upload_directory.rootDirectory_assets;
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
		modelProfile_verify_email: state => {
			return state.model.modelAddress+'profile_verify_email.php';
		},


		getModelAddress_laravel: state => {
			return state.model.modelAddress_laravel;
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
		},
		getform_field_rules: state => {
			return state.form_field_rules;
		},
		getComponentNameAdminOptions: state => {
			return state.getComponentNameAdminOptions;
		},
		isEmailVerified: state => {
			return state.user.isEmailVerified;
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