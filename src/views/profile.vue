<template>
  <v-app class="grey"> 

	<!-- 
    <component v-bind:is="$store.getters.getComponentName"> <buttons_for_profile></buttons_for_profile> </component> -->
    
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="mt-n6 mb-md-n6">
          <keep-alive>
          <component v-bind:is="$store.getters.getComponentName"> 
          <buttons_for_profile></buttons_for_profile>
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

export default {
  name: 'basic',
  components: { 'profile_basic': profile_basic  , 'buttons_for_profile': buttons_for_profile, 'profile_personal': profile_personal, 'profile_address': profile_address , 
    'profile_photo_upload': profile_photo_upload,
}, 

  data: ()=>({}), 
  created(){},
  methods: {},
  submit(){},

}
</script>

<style>
</style>