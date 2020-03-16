<template>

  <v-container>

  <base_privacy :user_id="this.$store.getters.getAllInfo.id" :email="this.$store.getters.getAllInfo.email" ></base_privacy>


  </v-container>

</template>


<script>

  // import user_gallery from '@/views/user_gallery.vue'
  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'

  import base_privacy from '@/views/base_privacy.vue'


  export default {
    name: 'data_privacy',
    mixins: [ profile_info_and_privacy_Mixins ] ,
    

    components: {
      // 'get_details': get_details,
      'base_privacy': base_privacy,
      // 'data_privacy': data_privacy,
    },

    data: ()=>({



    }),
    computed:{

    },
    methods: {
    },
    created(){


      this.$store.commit('set_email_for_other_user' , this.$store.getters.getAllInfo.email);
      console.log('user_id '+ this.user_id);
      console.log('email '+ this.email);
      this.getPhotosForAll(this.user_id , this.email);


      








    }
  }



</script>