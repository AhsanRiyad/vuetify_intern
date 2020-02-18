<template>



  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Profile</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close_dialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Profile</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="close_dialog()">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>



        <v-container>

          <v-row v-if="profile_user_status == 'approved'" justify="center" class="mb-5">
            <v-col lg="8" class="text-center success white--text" >


              <v-alert type="success">
                <h1> Verified User  </h1>
                <p v-if="change_request_status == 'requested' "> This user has a change request </p>
                <v-btn @click.stop="reject_user_button()" color="error" v-if="this.$store.getters.getAllInfo.type == 'admin'" >Reject User</v-btn>
                <div class="w-100 mb-2"></div>

                <v-btn v-if="this.$store.getters.getAllInfo.type == 'admin' && profile_user_type != 'admin' " @click.stop="make_admin_button()" color="primary" >Make Admin</v-btn>

                <v-btn v-else-if="this.$store.getters.getAllInfo.type == 'admin' && profile_user_type != 'user' " @click.stop="make_user_button()" color="primary" >Make user</v-btn>
              </v-alert>


            </v-col>
          </v-row>


          <v-row v-if="profile_user_status == 'rejected' || profile_user_status == 'not_verified'" justify="center" class="mb-5">
            <v-col lg="8" class="text-center danger white--text" >


              <v-alert type="error">

                <h1 v-if="profile_user_status == 'rejected'"> Rejected User  </h1>
                <h1 v-else-if="profile_user_status == 'not_verified'"> New User  </h1>
                <p v-if="change_request_status == 'requested' "> This user has a change request </p>
                <v-btn @click.stop="approve_user_button()" color="success" v-if="this.$store.getters.getAllInfo.type == 'admin'" >Aprrove User</v-btn>
                <div class="w-100 mb-2"></div>


              </v-alert>



            </v-col>
          </v-row>



          <v-row class="mt-n6 py-n2">          
            <v-col cols="12">
              <v-progress-linear 
              :indeterminate="indeterminate"
              :color="progress_color"
              height="20"
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





          <v-row justify="center" >
            <v-col lg="8" >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left title">Index</th>
                      <th class="text-left title">Details</th>
                      <th class="text-left title" v-if="edit_info">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  v-for="(item) in users_info" :key="item.key" v-show="item[2]=='public' || $store.getters.getAllInfo.type == 'admin' ">
                      <td  class="body-1">{{ takeName(item[0]) }} </td>
                      <td>

                        {{ item[1] }} 


                      </td>
                      <td v-if="edit_info">

                        <v-text-field v-model="item[1]" v-show="item[0] != 'blood_group' && item[0] != 'date_of_birth' " :disabled="item[0]=='membership_number' || item[0]=='registration_date' || item[0] == 'change_request' || item[0] == 'status' || item[0] == 'email_verification_status'  || item[0] == 'type'   || change_request_status == 'requested' "  @change="changeInfo(item[0] , item[1] , this)"  @keyup.enter="changeInfo(item[0] , item[1] , this)"  ></v-text-field>


                        <v-select :disabled="change_request_status == 'requested'" v-model="item[1]" v-show="item[0] == 'blood_group' "
                        :items="blood_group_list" @change="changeInfo(item[0] , item[1] , this)"

                        @keyup.enter="changeInfo(item[0] , item[1] , this)"
                        ></v-select>

                        <input :disabled="change_request_status == 'requested'" v-model="item[1]" type="date" class="form-control" v-if="item[0] == 'date_of_birth' "
                        :items="blood_group_list" @change="changeInfo(item[0] , item[1] , this )"
                        
                        @keyup.enter="changeInfo(item[0] , item[1] , this )"

                        >




                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col >
          </v-row>
        </v-container>


      </v-card>
    </v-dialog>


    <template>
      <v-row justify="center">
        <v-dialog
        v-model="dialog2"
        max-width="290"
        >
        <v-card>
          <v-card-title class="headline red--text">{{ dialog2_title }}</v-card-title>

          <v-card-text class="red--text">
            {{ dialog2_body }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>



            <v-btn
            color="green darken-1"
            text :disabled="dialog2_btn_disabled"
            @click="reject_user()"
            >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>




<template>
  <v-row justify="center">


    <v-dialog
    v-model="dialog3"
    max-width="290"
    >
    <v-card>
      <v-card-title class="headline green--text">{{ dialog3_title }}</v-card-title>

      <v-card-text class="black--text">
        {{ dialog3_body }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>


        <v-btn
        color="green darken-1"
        text :disabled="dialog3_btn_disabled"
        @click="make_admin()"
        >
        Yes
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</v-row>
</template>




<template>
  <v-row justify="center">


    <v-dialog
    v-model="dialog4"
    max-width="290"
    >
    <v-card>
      <v-card-title class="headline green--text">{{ dialog4_title }}</v-card-title>

      <v-card-text class="black--text">
        {{ dialog4_body }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>



        <v-btn
        color="green darken-1"
        text :disabled="dialog4_btn_disabled"
        @click="approve_user()"
        >
        Yes
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</v-row>
</template>

<template>
  <v-row justify="center">

    <v-dialog
    v-model="dialog5"
    max-width="290"
    >
    <v-card>
      <v-card-title class="headline green--text">{{ dialog5_title }}</v-card-title>

      <v-card-text class="black--text">
        {{ dialog5_body }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>


        <v-btn
        color="green darken-1"
        text :disabled="dialog5_btn_disabled"
        @click="make_user()"
        >
        Yes
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</v-row>
</template>


<template>
  <v-row justify="center">

    <v-dialog
    v-model="dialog6"
    max-width="290"
    >
    <v-card>
      <v-card-title class="headline green--text">{{ dialog6_title }}</v-card-title>

      <v-card-text class="black--text">
        {{ dialog6_body }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
</template>

</v-row>


</template>


<script>
  export default {
    name: 'get_details',
    props: ['email' , 'user_id'  , 'category' , 'user_details'],
    data: ()=>({

      indeterminate: true,
      progress_hidden: true,
      progress_color: 'red',


      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      notifications: false,
      sound: true,
      widgets: false,
      dialog2_body: 'Are you sure that you want to block this user?',
      dialog2_title: 'Block User?',
      dialog3_body: 'Are you sure that you want make this user an Admin?',
      dialog4_body: 'Are you sure that you want to approve this user?',
      dialog5_body: 'Are you sure that you want to change the user roll?',
      dialog6_body: 'Are you sure that you want to change the user roll?',
      dialog3_title: 'Make admin?',
      dialog4_title: 'Approve User?',
      dialog5_title: 'Make User?',
      dialog6_title: 'Status',
      users_info: [],
      radioGroup: [],
      disabled: false,
      profile_user_status:'',
      profile_user_type:'',
      dialog2_btn_disabled: false,
      dialog3_btn_disabled: false,
      dialog4_btn_disabled: false,
      dialog5_btn_disabled: false,
      dialog6_btn_disabled: false,
      items_email_status: ['Aprroved' , 'Rejected'] ,
      blood_group_list: ['A+' , 'B+' ,'AB+' , 'O+' , 'A-' , 'B-' , 'AB-' , 'O-'],
      change_data: '',
      counter: 0 ,
      edit_info: false,


    }),
    computed:{},
    methods: {
      takeName(name){
        if(name=='full_name'){ 
          return 'Full Name';
        }else if(name == 'email'){
          return 'Email';
        }else if(name == 'mobile'){
          return 'Mobile';
        }else if(name == 'institution_id'){
          return this.$store.getters.getIInstitution_id_label;
        }else if(name == 'nid_or_passport'){
          return 'NID/Passport';
        }else if(name == 'fathers_name'){
          return "Father's Name";
        }else if(name == 'mother_name'){
          return "Mother's Name";
        }else if(name == 'spouse_name'){
          return "Spouse's Name";
        }else if(name == 'number_of_children'){
          return "Number Of Children";
        }else if(name == 'profession'){
          return "Profession";
        }else if(name == 'designation'){
          return "Designation";
        }else if(name == 'blood_group'){
          return "Blood Group";
        }else if(name == 'date_of_birth'){
          return "Date Of Birth";
        }else if(name == 'present_line1'){
          return "Present Adress Line1";
        }else if(name == 'present_post_code'){
          return "Present Post Code";
        }else if(name == 'present_district'){
          return "Present District";
        }else if(name == 'present_country'){
          return "Present Country";
        }else if(name == 'parmanent_line1'){
          return "Permanent Adress Line1";
        }else if(name == 'parmanent_post_code'){
          return "Permanent Post Code";
        }else if(name == 'parmanent_district'){
          return "Permanent District";
        }else if(name == 'parmanent_country'){
          return "Permanent Country";
        }else if(name == 'membership_number'){
          return "Membership Number";
        }else if(name == 'type'){
          return "User Type";
        }else if(name == 'status'){
          return "Verfication Status";
        }else if(name == 'registration_date'){
          return "Account Created at";
        }else if(name == 'institution'){
          return "Workplace/Institution";
        }else if(name == 'email_verification_status'){
          return "Email Verification Status";
        }else if(name == 'change_request'){
          return "Change Request Status";
        }
      },
      changeInfo(name , value){

        if(name=='full_name'){

          //console.log(ev);
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Name';
            this.dialog6_body = "Name must be at least 6 characters";

          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "Name changed successfully";
          }

        }else if(name=='email'){
          let patt= /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Email';
            this.dialog6_body = "Email must be in a valid format , abc@bcd.com"
          }

        }else if(name=='mobile'){
          let patt= /[+]{0,1}[\d]{11,}$/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Number';
            this.dialog6_body = "number must be at least 11 digit"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "Number changed successfully";
          }
          
        }else if(name=='institution_id'){
          let patt= /[\S]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Id';
            this.dialog6_body = "Id at least 5 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "Id changed successfully";
          }
        }else if(name=='nid_or_passport'){
          let patt= /[\S]{10,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid NID/Passport';
            this.dialog6_body = "NID/passport number at least 10 digit"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "NID/passport changed successfully";
          }
        }else if(name=='fathers_name'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Name';
            this.dialog6_body = "Name must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "fathers name changed successfully";
          }
        }else if(name=='mother_name'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid name';
            this.dialog6_body = "Name must be at least 6 characters";
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "mother's name changed successfully";

          }
        }else if(name=='spouse_name'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Name';
            this.dialog6_body = "Name must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "spouse name changed successfully";
          }
        }else if(name=='number_of_children'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Name';
            this.dialog6_body = "Must be digit "
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "number_of_children changed successfully";
          }
        }else if(name=='profession'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Name';
            this.dialog6_body = "Name must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "profession changed successfully";
          }
        }else if(name=='designation'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Name';
            this.dialog6_body = "Name must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "designation changed successfully";
          }
        }else if(name=='institution'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Name';
            this.dialog6_body = "Name must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "institution name changed successfully";
          }
        }else if(name=='workplace_or_institution'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Name';
            this.dialog6_body = "Name must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "workplace_or_institution changed successfully";
          }
        }else if(name=='blood_group'){
          let patt= /[+-A-O]{1,3}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Blood Group';
            this.dialog6_body = "Name must be a valid format"
          }else{


            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "blood_group changed successfully";
          }
        }else if(name=='date_of_birth'){
          let patt= /^([0-9]{4})([-]{1}[0-9]{2}[-]{1}[0-9]{2}$)/igm;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Date';
            this.dialog6_body = "Date must be a valid format"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "date_of_birth changed successfully";
          }
        }else if(name=='present_line1'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Address';
            this.dialog6_body = "Address must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "present address line1 changed successfully";
          }
        }else if(name=='present_post_code'){
          let patt= /[+]{0,1}[\d]{4,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Post Code';
            this.dialog6_body = "at least 4 digit";
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "present post code changed successfully";
          }
        }else if(name=='present_district'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid District';
            this.dialog6_body = "Address must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "present district changed successfully";
          }
        }else if(name=='present_country'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Country';
            this.dialog6_body = "Country must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "present country changed successfully";
          }
        }else if(name=='parmanent_line1'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Address';
            this.dialog6_body = "Address must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "parmanent address line1 changed successfully";
          }
        }else if(name=='parmanent_post_code'){
          let patt= /[+]{0,1}[\d]{4,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Post Code';
            this.dialog6_body = "at least 4 digit";
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "parmanent post code changed successfully";
          }
        }else if(name=='parmanent_district'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid District';
            this.dialog6_body = "Address must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "parmanent district changed successfully";
          }
        }else if(name=='parmanent_country'){
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(value);

          if(result == false){
            this.dialog6 = true;
            this.dialog6_title = 'Invalid Country';
            this.dialog6_body = "Country must be at least 6 characters"
          }else{
            this.change_info_database(name , value);
            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "parmanent country changed successfully";
          }
        }
      },
      change_info_database(purpose , value){
        
        var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

        this.$axios.post(this.$store.getters.modelAdminChangeInfo , {
          purpose : purpose,
          main_purpose : 'search_other_option',
          email: this.email,
          user_id : this.user_id,
          value: value , 
        } , headers)
        .then(function (response) {
          // console.log(response);

          if(response.data == 'email_updated'){

            this.dialog6 = true;
            this.dialog6_title = 'Success';
            this.dialog6_body = "Email changed successfully";
          }else if(response.data == 'email_already_used'){
            this.dialog6 = true;
            this.dialog6_title = 'Failed';
            this.dialog6_body = "Email already used";
          }
          
          return response.data;

        }.bind(this))
        .catch(function () {

        });

      },
      close_dialog(){

       /* bus.$emit('categroy_from_get_details' , this.category);*/
       this.$emit('update:search');
       this.dialog = false;
       this.get_updated_data();
     },
     reject_user_button(){

      this.dialog2 = true
      this.dialog2_body = 'Are you sure you want to block the user?';
      this.dialog2_title = 'Block user?';
      this.dialog2_btn_disabled = false;

    },
    status_name_check(name){

      if(name == 'email_verification_status' || name == 'status'){
        return true;
      }else{
        return false;
      }


    },
    approve_user_button(){

      this.dialog4 = true
      this.dialog4_body = 'Are you sure you want to block the user?';
      this.dialog4_title = 'Block user?';
      this.dialog4_btn_disabled = false;

    }
    ,
    reject_user(){


      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

      this.$axios.post(this.$store.getters.modelSearch , {
        purpose : 'reject_user',
        main_purpose : 'search_other_option',
        email: this.email,
        user_id : this.user_id,
      } , headers)
      .then(function () {


        this.dialog2_body = 'User blocked Successfully';
        this.dialog2_title = 'Success';
        this.dialog2_btn_disabled = true;
        this.get_updated_data();



      }.bind(this))
      .catch(function () {
          // 
        });





    },
    dialog2_reject_user_no(){
      this.dialog2 = false;
      this.dialog2_btn_disabled = false
    },
    make_admin(){


      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

      this.$axios.post(this.$store.getters.modelSearch , {
        purpose : 'make_admin',
        main_purpose : 'search_other_option',
        email: this.email,
        user_id: this.user_id,
      } , headers)
      .then(function () {

        this.edit_info = false;
        this.dialog3_body = 'Made admin successfully';
        this.dialog3_title = 'Success';
        this.dialog3_btn_disabled = true;
        this.get_updated_data();




      }.bind(this))
      .catch(function () {

      });


    },
    make_admin_button(){


      this.dialog3 = true;
      this.dialog3_btn_disabled = false;

    },
    dialog3_make_admin_no(){

      this.dialog3 = false;
      this.dialog3_btn_disabled = false
    },
    make_user(){
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;
      this.$axios.post(this.$store.getters.modelSearch , {
        purpose : 'make_user',
        main_purpose : 'search_other_option',
        email: this.email,
        user_id: this.user_id,
      } , headers)
      .then(function () {

        this.dialog5_body = 'Made user successfully';
        this.dialog5_title = 'Success';
        this.dialog5_btn_disabled = true;
        this.get_updated_data();

      }.bind(this))
      .catch(function () {

      });



    },
    make_user_button(){

      this.dialog5 = true;
      this.dialog5_btn_disabled = false;
    },
    make_user_no(){

      this.dialog5 = false;
      this.dialog5_btn_disabled = false
    },
    approve_user(){

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;


      this.$axios.post(this.$store.getters.modelSearch , {
        purpose : 'approve_user',
        main_purpose : 'search_other_option',
        email: this.email,
        user_id: this.user_id,
      } , headers)
      .then(function () {

        this.dialog4_body = 'User approved successfully';
        this.dialog4_title = 'Success';
        this.dialog4_btn_disabled = true;
        this.get_updated_data();



      }.bind(this))
      .catch(function () {

      });



    },
    dialog4_approve_user_no(){

      this.dialog4 = false;
      this.dialog4_btn_disabled = false
    },
    get_updated_data(){
        // alert(this.user_id);
        //alert('this.user_id');

        this.indeterminate = true;
        this.progress_color = 'red';


        var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

        this.$axios.post( this.$store.getters.modelSearch ,
        {
          purpose: 'get_profile_details_for_all',
          main_purpose : 'search_other_option',
          email: this.email,
          user_id: this.user_id, 
        } , headers ).then(function(response){
          this.users_info = response.data;
          // console.log(response);
          this.profile_user_status = this.users_info[23][1];
          this.profile_user_type = this.users_info[26][1];
          this.change_request_status= this.users_info[25][1];

          this.indeterminate = false;
          this.progress_color = 'white';

        }.bind(this))
        .catch(function(){
         this.indeterminate = false;
         this.progress_color = 'white';

       }.bind(this));
      }
    },
    created(){

      this.indeterminate = true;
      
      this.progress_color = 'red';

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

      this.$axios.post( this.$store.getters.modelSearch ,
      {
        purpose: 'get_profile_details_for_all',
        main_purpose : 'search_other_option',
        email: this.email,
        user_id: this.user_id,
      } , headers ).then(function(response){
        this.users_info = response.data;
        // console.log(response);
        this.profile_user_status = this.users_info[23][1];
        this.profile_user_type = this.users_info[26][1];
        this.change_request_status= this.users_info[25][1];

        this.indeterminate = false;
        this.progress_color = 'white';

        // console.log(this.users_info[22][0]);
      }.bind(this))
      .catch(function(){

       this.indeterminate = false;
       this.progress_color = 'white';

     }.bind(this));

    }



  }



</script>