<template>
  <v-row >
    <v-dialog persistent  v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" > Social Network </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="(dialog = false) , getSearchInfo()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="(dialog = false) , getSearchInfo()">Save</v-btn>
            <noInternetSnackBar ref="snackbar" ></noInternetSnackBar>

          </v-toolbar-items>
        </v-toolbar>
        

          <social_network :email="email" ></social_network>


    </v-card>
  </v-dialog>
</v-row>
</template>




<script>

  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'
  import noInternetSnackBar from '@/views/noInternetSnackBar'

  import social_network from '@/views/profile/social_network'



  export default {
    name: 'social_network_get_details',
    components: { 
    'noInternetSnackBar': noInternetSnackBar , 
    'social_network': social_network
     },
    mixins: [ profile_info_and_privacy_Mixins ],

    props: ['email'   ],
    data: ()=>({

     dialog: false,
     notifications: false,
     sound: true,
     widgets: false,

   }),
    computed:{},
    methods: {},
    created(){



      // this.getPrivacyInfo();
    },
    updated(){
      
    }
  }



</script>