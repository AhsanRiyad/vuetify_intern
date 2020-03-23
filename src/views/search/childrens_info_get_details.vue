<template>
  <v-row >
    <v-dialog persistent  v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" > {{ number_of_children }} : click</v-btn>
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
        

          <profile_childrens_info :email="email" ></profile_childrens_info>


    </v-card>
  </v-dialog>
</v-row>
</template>




<script>

  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'
  import noInternetSnackBar from '@/views/noInternetSnackBar'

  import profile_childrens_info from '@/views/profile/profile_childrens_info'



  export default {
    name: 'childrens_info_get_details',
    components: { 
    'noInternetSnackBar': noInternetSnackBar , 
    'profile_childrens_info': profile_childrens_info
     },
    mixins: [ profile_info_and_privacy_Mixins ],

    props: ['email' , 'number_of_children'  ],
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