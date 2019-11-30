import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({

	state: {
		isLogin : false,
	},
	mutations: {
		loginFalse: state => {
			state.isLogin = false;
		},
		loginTrue: state => {
			state.isLogin = true;
		}
	},
});