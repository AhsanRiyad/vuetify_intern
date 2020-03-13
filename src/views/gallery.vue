<template>

  <v-container>

  <base_gallery :user_id="this.$store.getters.getAllInfo.id" :email="this.$store.getters.getAllInfo.email" ></base_gallery>


  </v-container>

</template>


<script>

  // import user_gallery from '@/views/user_gallery.vue'
  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'

  import base_gallery from '@/views/base_gallery.vue'


  export default {
    name: 'gallery',
    mixins: [ profile_info_and_privacy_Mixins ] ,
    

    components: {
      // 'get_details': get_details,
      'base_gallery': base_gallery,
      // 'data_privacy': data_privacy,
    },

    data: ()=>({



    }),
    computed:{

    },
    methods: {
    },
    created(){

      this.$store.commit('setComponentName' , 'gallery');
      console.log('user_id '+ this.user_id);
      console.log('email '+ this.email);

      this.getPhotosForAll(this.user_id , this.email);




    }
  }



</script>