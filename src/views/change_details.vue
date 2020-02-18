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
              <v-col>
                <img class="img-fluid" v-bind:src="user_details.recent_photo" style="height: 200px; width: 300px">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">New</th>
                        <th class="text-left">Old</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, name) in user_change_details" v-bind:key="user[0].id">
                        <td>{{ takeName(name) }}</td>
                        <td>{{ user[0] }}</td>
                        <td>{{ user[1] }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
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
    name: 'change_details',
    props: ['email' , 'user_id'] , 
    data: ()=>({
      dialogm1: '',
      dialog: false,
      user_details: {},
      user_change_details: {},

    }),

    methods: {
      takeName(name){

        if(name=='full_name'){ 
          return 'Full Name';
        }else if(name == 'email'){
          return 'Email';
        }else if(name == 'mobile'){
          return 'Mobile';
        }else if(name == 'institution_id'){
          return this.institution_id_label__;
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
        }else if(name == 'parmanent_country'){
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
          return "Member ship Number";
        }else if(name == 'type'){
          return "User Type";
        }else if(name == 'status'){
          return "Verfication Status";
        }else if(name == 'registration_date'){
          return "Account Created at";
        }else if(name == 'institution'){
          return "Workplace/Institution";
        }

      }
    },
    mounted(){

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

      this.$axios.post( this.$store.getters.modeldata_update_request ,
      {
        purpose: 'get_change_req_data',
        user_id: this.user_id,
        
      } , headers
      ).then(function(response){

        console.log(response);
        this.user_change_details = response.data;
        //console.log(this.user_details[0][1])
        /*if(response.data.recent_photo == 'not_set'){
          this.user_details.recent_photo = rootAdress+'assets/img/uploads/default.jpg';
        }else{
          this.user_details.recent_photo = this.rootAdress+'assets/img/uploads/recent_photos/'+response.data.recent_photo;
          //alert(this.user_details.recent_photo);
        }
        console.log(this.user_details);*/
      }.bind(this))
      .catch(function(){
        //console.log(error);
      }.bind(this));


      this.$axios.post( this.$store.getters.modeldata_update_request ,
      {
        purpose: 'getProfileBasicInfo',
        user_id: this.user_id,
        
      } , headers
      ).then(function(response){

        // console.log(response.data);
        this.user_details = response.data;
        //console.log(this.user_details[0][1])
        if(response.data.recent_photo == 'not_set'){
          this.user_details.recent_photo = this.$store.getters.modelAddress+'assets/img/uploads/default.jpg';
        }else{
          this.user_details.recent_photo = this.$store.getters.modelAddress+'assets/img/uploads/recent_photos/'+response.data.recent_photo;
          //alert(this.user_details.recent_photo);
        }
        // console.log(this.user_details)
      }.bind(this))
      .catch(function(){
        //console.log(error);
      }.bind(this));
    }



  }



</script>