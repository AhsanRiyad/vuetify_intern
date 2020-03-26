<template>
  <v-row justify="center">
    <v-dialog persistent  v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" small>Profile</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="(dialog = false) ">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="(dialog = false) ">Save</v-btn>
            <noInternetSnackBar ref="snackbar" ></noInternetSnackBar>

          </v-toolbar-items>
        </v-toolbar>
        

          <base_privacy :email="email" :user_id="user_id"></base_privacy>


    </v-card>
  </v-dialog>
</v-row>
</template>




<script>

  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'
  import noInternetSnackBar from '@/views/noInternetSnackBar'

  import base_privacy from '@/views/base_component/base_privacy'



  export default {
    name: 'get_details',
    components: { 
    'noInternetSnackBar': noInternetSnackBar , 
    'base_privacy': base_privacy
     },
    mixins: [ profile_info_and_privacy_Mixins ],

    props: ['email' , 'user_id'  , 'category'  ],
    data: ()=>({

     dialog: false,
     notifications: false,
     sound: true,
     widgets: false,

   }),
    computed:{},
    methods: {},
    created(){

      this.$store.commit('set_email_for_other_user' , this.email);
      
      this.$store.commit('setComponentName' , 'get_details');
      this.getPrivacyInfo( this.user_id , this.email);


      // this.getPrivacyInfo();
    },
    updated(){
      
       this.$store.commit('setComponentName' , 'get_details');
    }
  }



</script>