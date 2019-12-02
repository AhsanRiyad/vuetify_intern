import Vue from 'vue'
import Vuex from 'vuex'

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
		user_info: {

		},
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
		}
		
	},
	
});