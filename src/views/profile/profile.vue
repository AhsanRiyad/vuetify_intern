<template>
  <v-app class="grey"> 

	<!-- 
    <component v-bind:is="$store.getters.getComponentName"> <buttons_for_profile></buttons_for_profile> </component> -->
    
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="mt-n6 mb-md-n6">
          <keep-alive>
            <component :email="email" v-bind:is="$store.getters.getComponentName"> 

              <buttons_for_profile slot="buttons"></buttons_for_profile>


              <v-alert v-if="!$store.getters.isVerified && !$store.getters.isAdmin" slot="verification_alert" type="error">
                You are not verified. Get verified for full access.
              </v-alert>


              
            </component>
          </keep-alive>

          
          <!-- <profile_basic></profile_basic> -->
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
// @ is an alias to /src

import buttons_for_profile from '@/views/profile/buttons_for_profile.vue'
import profile_basic from '@/views/profile/profile_basic'
import profile_personal from '@/views/profile/profile_personal'
import profile_address from '@/views/profile/profile_address'
import profile_photo_upload from '@/views/profile/profile_photo_upload'
import profile_change_password from '@/views/profile/profile_change_password'
import profile_change_email from '@/views/profile/profile_change_email'
import profile_verify_email from '@/views/profile/profile_verify_email'
import profile_childrens_info from '@/views/profile/profile_childrens_info'

export default {
  name: 'basic',
  components: { 'profile_basic': profile_basic  , 'buttons_for_profile': buttons_for_profile, 'profile_personal': profile_personal, 'profile_address': profile_address , 
  'profile_photo_upload': profile_photo_upload,
  'profile_change_password': profile_change_password,
  'profile_change_email': profile_change_email
  ,'profile_verify_email': profile_verify_email
  ,'profile_childrens_info': profile_childrens_info
}, 

data: ()=>({

  email: '',

}), 
created(){

  this.email = this.$store.getters.getAllInfo.email;
  this.$store.commit('set_email_for_other_user' , this.$store.getters.getAllInfo.email);


  this.$store.commit('setComponentName' , 'profile_basic');


  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json' , 'charset':'utf-8'} ;

    this.$axios.post( this.$store.getters.modeladmin_options ,
    {
      purpose: 'get_form_field_rules'
    } , headers
    ).then(function(response){

      console.log(response);
      this.$store.commit('setform_field_rules' , response.data);
    }.bind(this))
    .catch(function(){
//console.log(error);
}.bind(this));



  },
  methods: {
    changeComponent(){

      alert('hellow');

      //this.$store.commit('setComponentName' , name);

      //this.$store.commit('setPageTitle' , "Verify Email");
      
    }

  },
  submit(){},

}
</script>

<style>
</style>