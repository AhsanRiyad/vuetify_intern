<template>
  <v-container>

    <template class="mb-3" v-if="this.$store.getters.getComponentName == 'get_details' ">


     <v-row v-if="profile_user_status == 'approved'" justify="center" class="mb-5">
      <v-col lg="8" class="text-center success white--text" >


        <v-alert type="success">
          <h1> Verified User  </h1>
          <p v-if="change_request_status == 'requested' "> This user has a change request </p>

          <v-btn @click.stop="

          ()=>{ updatePrivacy( 'all_info_together' , 'status' , 'rejected' , email , 'updateProfile_by_admin' )  } 

          " color="error" v-if="this.$store.getters.getAllInfo.type == 'admin'" >Reject User</v-btn>


          <div class="w-100 mb-2"></div>

          <v-btn v-if="this.$store.getters.getAllInfo.type == 'admin' && profile_user_type != 'admin' "


          @click.stop=" 
          ()=>{ updatePrivacy( 'all_info_together' , 'type' , 'admin' , email  )  }    

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
          ()=>{ updatePrivacy( 'all_info_together' , 'status' , 'approved' , email , 'updateProfile_by_admin' )  }
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

        <v-btn v-if="this.$store.getters.getAllInfo.type == 'admin' && profile_user_type != 'admin' " @click.stop="edit_info=!edit_info" color="warning"  >Edit</v-btn>
        
        <br>

        <v-btn v-if="this.$store.getters.getAllInfo.type == 'admin' && profile_user_type != 'admin' " color="error" class="my-3" @click.stop=" ()=>{ reset_password(email); dialog = true; }" >Reset Password</v-btn>

      </v-col>
    </v-row>

  </template>











  <v-row  justify="center" class="mb-5">
    <v-col lg="8" md="6" cols="10"  class="text-center  white--text" >



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

       <v-card-text align="right" v-if="$store.getters.getComponentName=='get_details'">
        <v-btn color="success" :loading="loading" @click="download_PDF">
         <v-icon class="mr-2" > print  </v-icon> Print
       </v-btn>
     </v-card-text>

     <v-data-table
     :headers=" 
     this.$store.getters.getComponentName == 'get_details' && edit_info ? headers_get_details_edit_admin : 
     this.$store.getters.getComponentName == 'get_details' ? headers_get_details : headers_privacy  "
     :items="users_info"
     item-key="field_name"
     class="elevation-1"
     :search="search"
     :loading="table_loading" loading-text="Loading... Please wait"
     :items-per-page="5"
     >


    




     <template v-slot:item.privacy_value="{ item }">
      <v-chip :color="item.privacy_value == 0 ? 'primary' : 'green' " dark>

        {{ item.privacy_value == 0 ? 'Private': 'Public' }}
      </v-chip> 

      <!-- <v-btn :color="getColor(item.Calcium)" dark>{{ item.Calcium }}</v-btn> -->
    </template>


     <template v-slot:item.field_value="{ item }">
     
      <childrens_info_get_details :email="email" :number_of_children="item.field_value" v-if=" item.field_name == 'number_of_children' " >
      </childrens_info_get_details>
<!-- 
      <v-btn color="success" v-else-if=" item.field_name == 'social_network' " align="left">
      Social Network
      </v-btn>
 -->

      <social_network_get_details v-else-if=" item.field_name == 'social_network'" :email="email">
      </social_network_get_details>
    
      <p v-else> {{ item.field_value }} </p>
        
      <!-- <v-btn :color="getColor(item.Calcium)" dark>{{ item.Calcium }}</v-btn> -->
    </template>

    <template v-slot:item.options="{ item }">

      <v-btn  small :color="item.privacy_value == 0 ? 'primary': 'green' " @click="()=>{

  
        item.field_name != 'email' ? 
        (
        ( item.privacy_value == 0 ? item.privacy_value = 1 : item.privacy_value = 0) ,  
        ( updatePrivacy( 'privacy' , item.field_name , item.privacy_value , email  ) )
        ) : '';


      }" dark  >
        {{  item.privacy_value == 0 ? 'Private': 'Public'   }}
      </v-btn>

    </template>


    <template v-slot:item.edit="{ item }">



      <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="290px"
      v-if="item.field_name == 'date_of_birth' "
      >
      <template v-slot:activator="{ on }">
        

      <v-text-field
      v-model="date"
      :label="item.alias_field_name"
      readonly
      v-on="on"
      :ref="item.field_name"
      @change="updateData( item.field_name , item.index_number )"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date) , updateData( item.field_name , item.index_number )">OK</v-btn>
    </v-date-picker>
  </v-menu>







  <v-select
  v-else-if=" item.field_name == 'gender' || item.field_name == 'blood_group'  || item.field_name == 'religion' "
  v-model = "item.field_value"
  :rules=" field_rules_prop(  item.field_name , item.index_number  ) "
  @change="updateData( item.field_name , item.index_number , item.field_value )"
  :ref = " item.field_name"
  :items="item.field_name == 'gender' ? item_gender :  item.field_name == 'blood_group' ? item_blood_group : item.field_name == 'religion' ? item_religion : [] "
  :label="item.alias_field_name"
  ></v-select>

  <v-btn
  v-else-if=" item.field_name == 'number_of_children' "
  >
  {{ item.field_value }}
</v-btn>  



<v-text-field
v-else
:label="item.alias_field_name"
v-model="item.field_value"
:rules=" field_rules_prop(  item.field_name , item.index_number  ) "
@change="updateData( item.field_name , item.index_number )"
:ref = 'item.field_name'
:id="item.field_name"
:disabled=" item.field_name == 'email' || item.field_name == 'status' || item.field_name == 'type' || item.field_name == 'change_request' "
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
  Updating
  <v-progress-linear
  indeterminate
  color="white"
  class="mb-0"
  ></v-progress-linear>
</v-card-text>
</v-card>
</v-dialog>




<!-- second dialog -->
<v-row justify="center">
  <v-dialog v-model="dialog_update_status"  max-width="290">

    <v-card>
      <v-card-title class="headline"> Status </v-card-title>
      <v-card-text> {{ dialog_update_text }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog_update_status = false">Close</v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>

</v-container>

</template>
<script>

  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'
  import noInternetSnackBar from '@/views/noInternetSnackBar'
  import childrens_info_get_details from '@/views/search/childrens_info_get_details'
  import social_network_get_details from '@/views/search/social_network_get_details'
  import printJS from 'print-js'

// import profile_childrens_info from '@/views/profile/profile_childrens_info'


  export default {
    name: 'data_privacy',
    mixins: [ profile_info_and_privacy_Mixins  ] ,
    components: { 
      'noInternetSnackBar': noInternetSnackBar,
      'childrens_info_get_details' : childrens_info_get_details,
      'social_network_get_details' : social_network_get_details,
     },
    props: ['email' , 'user_id' , 'fun1'],

    data: ()=>({
      users_info: [],
      radioGroup: [],
      disabled: false,
      dialog: false,


      dialog_update_status: false,
      dialog_update_text: '',
      loading:false,

    }),
    computed:{},
    
    methods: {
      download_PDF(){

        console.log(this.users_info);

        this.loading = true;
        /*var headers = 
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/pdf'} ;
          */
          this.$axios.post( this.$store.getters.getModelAddress_laravel+'download_PDF',
          {
            purpose: 'getPrivacy',
            users_info: this.users_info,
          }, 
          {
            responseType: 'arraybuffer',
            // headers
          }
          ).then(function(response){

            console.log(response);
            this.loading = false;

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);

            console.log('printing file');
            printJS(url);

            // this.$print.printJS('http://localhost/backend_all/laravel_intern_project/public/storage/users_info.pdf');
            // link.click(); 

            // printJS('a.pdf', 'pdf');
            // console.log(url);
            // printJS('http://localhost/backend_all/laravel_intern_project/public/storage/users_info.pdf' , 'pdf');


          }.bind(this))
          .catch(function(){
            this.loading = false;

          }.bind(this));


        }
      },
      created(){
        this.$store.commit('setComponentName' , 'privacy');
      // this.getPrivacyInfo( this.user_id ,  this.email  );
      

    },
    mounted(){
      this.getPrivacyInfo( this.user_id , this.email);
    },
    watch: {
      dialog (val) {
        if (!val) return
          setTimeout(() => (this.dialog = false), 2000);
      },
    }
  }



</script>