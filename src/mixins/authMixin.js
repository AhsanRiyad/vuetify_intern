import VueCookies from 'vue-cookies'
import { store } from '@/store/store.js'
import axios from 'axios'
// import cookie_mixins from '@/mixins/cookie_mixins'


var authMixins = {

requireAuthLoginCheck (to, from, next) {

// alert(to.meta.title);

if( store.getters.auth.isLogin  ) { /// THIS NOT WORK, HOW TO ACCESS STORE?

	if(store.getters.auth.isAdmin){
		return next() ;

	}else if(!store.getters.isVerified && to.meta.title != 'add_user' && to.meta.title != ''  && to.meta.title != 'new_user_request'  && to.meta.title != 'data_update_request'  && to.meta.title != 'admin_options' && to.meta.title != 'gallery' && to.meta.title != 'data_privacy' && to.meta.title != 'search'   ){
		


		return next();
		/*if(!store.getters.isVerified){
			
			return next({
				name: 'profile'
			})
			
		}else{

		}*/

	}else if(store.getters.isVerified && to.meta.title != 'add_user' && to.meta.title != ''  && to.meta.title != 'new_user_request'  && to.meta.title != 'data_update_request'  && to.meta.title != 'admin_options'){


		return next();

	}


}else {
	store.commit('checkCookie');
	if(store.getters.auth.isLogin){

		var headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'} ;

		axios.post( store.getters.modelProfile_basic , {
			purpose : 'getProfileBasicInfoForAuth',
			email : VueCookies.get('email') , 
		} , headers )
		.then(function(response){

			console.log('inside auth');
			console.log(response);
			if(response.data.userInfo !=0 && response.data.userInfo.forgot_password_crypto == VueCookies.get('crypto'))
			{
				store.commit('set_user_info' , response.data.userInfo);
				store.getters.getAllInfo.type == 'admin' ? store.commit('adminTrue') :  '';


				response.data.userInfo.status == 'approved' ? store.commit('verifiedTrue') :  store.commit('verifiedFalse');

				store.commit('setIInstitution_id_label' , response.data.institution_id_label);

				store.commit('setVerificationRequest' , response.data.countRequest.verificationRequest);

				store.commit('setChangeRequest' , response.data.countRequest.changeRequest); 


				console.log(store.getters.getCountRequest.verificationRequest);


				return next();
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



}



export default authMixins