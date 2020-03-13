<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn small color="primary" dark v-on="on">Gallery</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>



        <base_gallery :user_id="user_id" :email="email" ></base_gallery>




      </v-card>
    </v-dialog>
  </v-row>
</template>



<script>
  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'

  import base_gallery from '@/views/base_gallery.vue'


  export default {
    name: 'user_gallery',
    mixins: [ profile_info_and_privacy_Mixins ] ,

    components: {
      // 'get_details': get_details,
      'base_gallery': base_gallery,
      // 'data_privacy': data_privacy,
    },



    props: ['email' , 'user_id'],
    data: ()=>({





    }),
    computed:{},
    created(){

      this.$store.commit('setComponentName' , 'user_gallery');

      console.log('user_id '+ this.user_id);
      console.log('email '+ this.email);

      this.getPhotosForAll(this.user_id , this.email);





    }
  }



</script>