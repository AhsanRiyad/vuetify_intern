import { store } from '@/store/store.js'
import axios from 'axios'
// import VueCookies from 'vue-cookies'
export default {

	methods: {
		getCommonInfo(){

			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'} ;


				axios.post( store.getters.getModelAddress_laravel+'get_users_info_and_counter_data' , {
					purpose : 'getCommonInfo',
					

				} , headers )
				.then(function(response){

					console.log(response);
					store.commit('setIInstitution_id_label' , response.data.institution_id_label);

					store.commit('setVerificationRequest' , response.data.verificationRequest);

					store.commit('setChangeRequest' , response.data.changeRequest); 




				}.bind(this))
				.catch(function () {

				}.bind(this)); 



			}
		}

	}

