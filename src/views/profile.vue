<template>
  <v-app class="grey" > 
	
	<!-- 
    <component v-bind:is="$store.getters.getComponentName"> <buttons_for_profile></buttons_for_profile> </component> -->
    
    <profile_basic class="mb-0"></profile_basic>

    <buttons_for_profile class="mt-0"></buttons_for_profile>
    




  
	
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