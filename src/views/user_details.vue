<template>


<v-row justify="center">
  <v-dialog v-model="dialog" scrollable max-width="400px">
  <template v-slot:activator="{ on }">
  <v-btn small color="primary" dark v-on="on">Details</v-btn>
  </template>
  <v-card>
  <v-card-title>User Details</v-card-title>
  <v-divider></v-divider>
  <v-card-text style="height: 300px;" class="black--text">
  <v-container>
  <v-row>


  <v-col cols="12">
  <v-row align="center" justify="center">
  <v-img
  :src="user_details.recent_photo"
  aspect-ratio="1"
  class="grey lighten-2"
  max-width="200"
  max-height="150"
  ></v-img>
  </v-row>
  </v-col>


  <v-col cols="6">
  <p>Full Name</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.full_name }} </p>
  </v-col>

  <v-col cols="6">
  <p>Email</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.email }} </p>
  </v-col>

  <v-col cols="6">
  <p>Mobile</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.mobile }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>{{ institution_id_label__ }}</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.institution_id }} </p>
  </v-col>


  <v-col cols="6">
  <p>NID/Passport No.</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.nid_or_passport }} </p>
  </v-col>

  <v-col cols="6">
  <p>Father's Name</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.fathers_name }} </p>
  </v-col>

  <v-col cols="6">
  <p>Mother's Name</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.mother_name }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Spouse's Name</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.spouse_name }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Number Of Children</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.number_of_children }} </p>
  </v-col>

  <v-col cols="6">
  <p>Profession</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.profession }} </p>
  </v-col>

  <v-col cols="6">
  <p>Institution/Workplace</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.institution }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Designation</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.designation }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Blood Group</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.blood_group }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Date Of Birth</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.date_of_birth }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Present Adress Line1</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.present_line1 }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Present District</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.present_district }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Present Post Code</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.present_post_code }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Present Country</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.present_country }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Permanent Adress Line1</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.parmanent_line1 }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Permanent District</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.parmanent_district }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Permanent Post Code</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.parmanent_post_code }} </p>
  </v-col>


  
  <v-col cols="6">
  <p>Permanent Country</p>
  </v-col>
  <v-col  cols="6" >
  <p> {{ user_details.parmanent_country }} </p>
  </v-col>


  
  
  </v-row>
  </v-container>
  </v-card-text>
  
  <v-divider></v-divider>
  <v-card-actions>
  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
  </v-card-actions>
  </v-card>
  </v-dialog>
  </v-row>


</template>


<script>
  export default {
    name: 'user_details',
    props: ['email' , 'user_id'] , 
    data: ()=>({
        dialogm1: '',
        dialog: false,
        user_details: {},
        institution_id_label__:'institution_id'
      }),

    mounted() {

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

      this.$axios.post( this.$store.getters.modelnew_user_request  ,
      {
        purpose: 'getProfileBasicInfo',
        user_id: this.user_id,
        
      } , headers
      ).then(function(response){
        
        // console.log(response);
        this.user_details = response.data;

        if(response.data.recent_photo == 'not_set'){
          this.user_details.recent_photo = this.$store.getters.modelAddress+'assets/img/uploads/default.jpg';
        }else{
          this.user_details.recent_photo = this.$store.getters.modelAddress+'assets/img/uploads/recent_photos/'+response.data.recent_photo;
          //alert(this.user_details.recent_photo);
        }

        // console.log(this.user_details);


      }.bind(this))
      .catch(function(){

        

        //console.log(error);
    }.bind(this));
    },
    created(){

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

      this.$axios.post(this.$store.getters.modelnew_user_request , {
        purpose : 'get_data'
      } , headers)
      .then(function (response) {
        // console.log(response);


        // console.log(JSON.parse(response.data));

        // console.log(response.data.length);

        if(response.data.length == 1){
          this.user_list = []; 
          this.user_list[0] =  JSON.parse(response.data);
          // console.log(this.user_list[0]);
        }else if(response.data.length > 1){
          this.user_list =  response.data;
          // console.log(this.user_list[0].email);
        }


      }.bind(this))
      .catch(function () {
        // console.log(error);
      });
    }



  }



</script>