<template>
  <v-app class="grey"> 

	<!-- 
    <component v-bind:is="$store.getters.getComponentName"> <buttons_for_profile></buttons_for_profile> </component> -->
    
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="mt-n6 mb-md-n6">
          <keep-alive>
            <component v-bind:is="$store.getters.getComponentName"> 

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
import buttons_for_profile from './buttons_for_profile.vue'
import profile_basic from './profile_basic'
import profile_personal from './profile_personal'
import profile_address from './profile_address'
import profile_photo_upload from './profile_photo_upload'
import profile_change_password from './profile_change_password'
import profile_change_email from './profile_change_email'

export default {
  name: 'basic',
  components: { 'profile_basic': profile_basic  , 'buttons_for_profile': buttons_for_profile, 'profile_personal': profile_personal, 'profile_address': profile_address , 
  'profile_photo_upload': profile_photo_upload,
  'profile_change_password': profile_change_password,
  'profile_change_email': profile_change_email,
}, 

data: ()=>({}), 
created(){},
methods: {},
submit(){},

}
</script>

<style>
</style>