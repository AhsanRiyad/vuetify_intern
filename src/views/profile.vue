<template>
  <v-app class="grey" > 

	<!-- 
    <component v-bind:is="$store.getters.getComponentName"> <buttons_for_profile></buttons_for_profile> </component> -->
    
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="mt-n6 mb-md-n6">
          
          <component v-bind:is="$store.getters.getComponentName"> <buttons_for_profile ></buttons_for_profile> </component>


          <!-- <profile_basic></profile_basic> -->
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12" class="mt-md-n12">
          
        </v-col>
      </v-row>
    </v-container>

  </v-app>
</template>
<script>
// @ is an alias to /src
import buttons_for_profile from './buttons_for_profile.vue'
import profile_basic from './profile_basic'

export default {
  name: 'basic',
  components: { 'profile_basic': profile_basic  , 'buttons_for_profile': buttons_for_profile }, 
  
  data: ()=>({}), 

  created(){},
  methods: {},
  submit(){},

}
</script>



<style>


</style>