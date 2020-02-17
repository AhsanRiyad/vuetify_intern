import { store } from '@/store/store.js'
import axios from 'axios'

export default {

methods: {
getCommonInfo(){

axios.post( store.getters.modelProfile_basic , {
purpose : 'getCommonInfo'

})
.then(function(response){

console.log(response);
store.commit('setIInstitution_id_label' , response.data.institution_id_label);

store.commit('setVerificationRequest' , response.data.countRequest.verificationRequest);

store.commit('setChangeRequest' , response.data.countRequest.changeRequest); 




}.bind(this))
.catch(function () {

}.bind(this)); 



}
}

}

