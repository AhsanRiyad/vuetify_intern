import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({

	state: {
		user: {
		isLogin : false,

		},
	},
	mutations: {
		loginFalse: state => {
			state.user.isLogin = false;
		},
		loginTrue: state => {
			state.user.isLogin = true;
		}
	},
	getters: {
		auth: state=>{
			return state.user;
		}
	}
});