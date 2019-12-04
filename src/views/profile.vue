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

export default {
  name: 'basic',
  mixins: [commonMixins],
  components: { 'buttons_for_profile' : buttons_for_profile , 
    'profile_basic': profile_basic,
},

  data: ()=>({}), 

  created(){},
    methods: {},
    submit(){},

    }



  </script>
