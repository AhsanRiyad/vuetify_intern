<template>
  <v-app class="grey" > 


    <component v-bind:is="$store.getters.getComponentName"> <buttons_for_profile></buttons_for_profile> </component>

  </v-app>
</template>
<script>
// @ is an alias to /src
import commonMixins from '@/mixins/commonMixins'
import buttons_for_profile from './buttons_for_profile.vue'
import profile_basic from './profile_basic.vue'
import profile_personal from './profile_personal.vue'
import profile_address from './profile_address.vue'

export default {
  name: 'basic',
  mixins: [commonMixins],
  components: { 'buttons_for_profile' : buttons_for_profile , 
  'profile_basic': profile_basic,
  'profile_personal': profile_personal,
  'profile_address': profile_address,
},

data: ()=>({}), 

created(){},
methods: {},
submit(){},

}



</script>
