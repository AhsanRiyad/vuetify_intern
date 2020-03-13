<template>
  <v-container>

    <template class="mb-3" v-if="this.$store.getters.getComponentName == 'get_details' ">


     <v-row v-if="profile_user_status == 'approved'" justify="center" class="mb-5">
      <v-col lg="8" class="text-center success white--text" >


        <v-alert type="success">
          <h1> Verified User  </h1>
          <p v-if="change_request_status == 'requested' "> This user has a change request </p>

          <v-btn @click.stop="

          ()=>{ updatePrivacy( 'all_info_together' , 'status' , 'rejected' , email )  } 

          " color="error" v-if="this.$store.getters.getAllInfo.type == 'admin'" >Reject User</v-btn>


          <div class="w-100 mb-2"></div>

          <v-btn v-if="this.$store.getters.getAllInfo.type == 'admin' && profile_user_type != 'admin' "


          @click.stop=" 
          ()=>{ updatePrivacy( 'all_info_together' , 'type' , 'admin' , email )  }    

          " 



          color="primary" >Make Admin</v-btn>

          <v-btn v-else-if="this.$store.getters.getAllInfo.type == 'admin' && profile_user_type != 'user' "

          @click.stop=" 
          ()=>{ updatePrivacy( 'all_info_together' , 'type' , 'user' , email )  }    
          " 
          color="primary" >Make user</v-btn>
        </v-alert>


      </v-col>
    </v-row>


    <v-row v-if="profile_user_status == 'rejected' || profile_user_status == 'not_verified'" justify="center" class="mb-3">
      <v-col lg="8" class="text-center danger white--text" >


        <v-alert type="error">

          <h1 v-if="profile_user_status == 'rejected'"> Rejected User  </h1>
          <h1 v-else-if="profile_user_status == 'not_verified'"> New User  </h1>
          <p v-if="change_request_status == 'requested' "> This user has a change request </p>


          <v-btn 


          @click.stop=" 
          ()=>{ updatePrivacy( 'all_info_together' , 'status' , 'approved' , email )  }    

          " 


          color="success" v-if="this.$store.getters.getAllInfo.type == 'admin'" >Aprrove User</v-btn>
          <div class="w-100 mb-2"></div>


        </v-alert>



      </v-col>
    </v-row>



    <v-row class="mt-n6 py-n2" justify="center" >          
      <v-col cols="12" lg="8" >
        <v-progress-linear 
        :indeterminate="indeterminate"
        :color="progress_color"
        height="10"
        ></v-progress-linear>
      </v-col>
    </v-row>



    <v-row  justify="center">
      <v-col lg="8" class="text-center success white--text" >
        <h1>
          Profile
        </h1>

        <v-btn v-if="this.$store.getters.getAllInfo.type == 'admin' && profile_user_type != 'admin' " @click.stop="edit_info=!edit_info" color="warning" >Edit</v-btn>

      </v-col>
    </v-row>

  </template>











  <v-row  justify="center" class="mb-5">
    <v-col lg="8" class="text-center  white--text" >



      <v-card>

        <v-card-title>
         {{ this.$store.getters.getComponentName == 'get_details' ? 'Profile' : 'Privacy'  }}
         <v-spacer></v-spacer>

         <v-text-field
         v-model="search"
         append-icon="mdi-magnify"
         label="Search"
         single-line
         hide-details
         ></v-text-field>
       </v-card-title>



       <v-data-table
       :headers=" this.$store.getters.getComponentName == 'get_details' ? headers_get_details_edit_admin : headers_privacy  "
       :items="users_info"
       item-key="alias_field_name"
       class="elevation-1"
       :search="search"
       :loading="table_loading" loading-text="Loading... Please wait"
       >

       <template v-slot:item.privacy_value="{ item }">
        <v-chip :color="item.privacy_value == 0 ? 'primary' : 'green' " dark>

          {{ item.privacy_value == 0 ? 'Private': 'Public' }}
        </v-chip> 

        <!-- <v-btn :color="getColor(item.Calcium)" dark>{{ item.Calcium }}</v-btn> -->
      </template>

      <template v-slot:item.options="{ item }">

        <v-btn small :color="item.privacy_value == 0 ? 'primary': 'green' " @click="(item.privacy_value = !item.privacy_value ) , updatePrivacy( 'privacy' , item.alias_field_name , item.privacy_value , email , $event )" dark>
          {{  item.privacy_value == 0 ? 'Private': 'Public'   }}
        </v-btn>

      </template>


      <template v-slot:item.edit="{ item }">




        <v-text-field 
        :label="item.field_name"
        v-model="item.field_value"
        :rules=" field_rules_prop(  item.alias_field_name , item.index_number  ) "
        @change="updateData( item.alias_field_name , item.alias_field_name ,  item.index_number )"
        :ref = 'item.alias_field_name'
        >

      </v-text-field>
    </template>
  </v-data-table>
</v-card>
</v-col>
</v-row>




<noInternetSnackBar ref="snackbar" ></noInternetSnackBar>
<v-dialog
v-model="dialog"
hide-overlay
persistent
width="300"
>
<v-card
color="primary"
dark
>
<v-card-text>
  Updating Privacy
  <v-progress-linear
  indeterminate
  color="white"
  class="mb-0"
  ></v-progress-linear>
</v-card-text>
</v-card>
</v-dialog>



<v-row justify="center">
  <v-dialog v-model="dialog_update_status" persistent max-width="290">
    
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>
      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog_update_status = false">Disagree</v-btn>
        <v-btn color="green darken-1" text @click="dialog_update_status = false">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>








</v-container>

</template>
<script>

  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'

  import noInternetSnackBar from '@/views/noInternetSnackBar'



  export default {
    name: 'data_privacy',
    mixins: [ profile_info_and_privacy_Mixins ] ,
    components: { 'noInternetSnackBar': noInternetSnackBar },
    props: ['email' , 'user_id' , 'fun1'],

    data: ()=>({
      users_info: [],
      radioGroup: [],
      disabled: false,
      dialog: false,
      dialog_update_status: false,
    }),
    computed:{},
    
    methods: {

      field_rules_prop( alias_field_name ){

        if(alias_field_name == 'first_name')
        {

          return ([
            v => !!v || 'required',
            ]);

        }




      },
      updateData(field_name, alias_field_name , index_number){


        console.log(field_name);
        console.log(index_number);
        console.log('form validate');

        // console.log(this.$refs.form.validate());

        // console.log(this.$refs);
        this.$refs[alias_field_name].hasError ? this.dialog_update_status = true : '' ;

        // console.log(this.$refs.)


      }



    },
    created(){
      this.$store.commit('setComponentName' , 'privacy');
      this.getPrivacyInfo( this.user_id ,  this.email  );

    },


    watch: {
      dialog (val) {
        if (!val) return
          setTimeout(() => (this.dialog = false), 2000);
      },
    }
  }



</script>