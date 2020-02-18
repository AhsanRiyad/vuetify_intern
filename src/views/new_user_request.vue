<template>
  <v-app class="grey" > 
    <v-container class="white" >

      <v-row>
        <v-col>

         <v-simple-table
         
         
         >
         <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Req From</th>
              <th class="text-left">Req Date</th>
              <th class="text-left">Details</th>
              <th class="text-left">Accept</th>
              <th class="text-left">Reject</th>
            </tr>
          </thead>
          <tbody v-if="array_size" >
            <tr  v-for="user in user_list" :key="user.id">
              <td>{{ user.full_name }}</td>
              <td>{{ user.registration_date }}</td>
              <td> 

                <user_details v-bind:email="user.email" :user_id="user.id"></user_details>
              </td>

              <td> <v-btn @click="approve_id(user.email , user.id)"  small color="warning">Accept</v-btn> </td>
              <td> <v-btn small @click="reject_id(user.email , user.id)" color="error" class="white--text">Reject</v-btn> </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>




    </v-col>
  </v-row>


  <template>
    <v-row justify="center"> 

      <v-dialog
      v-model="dialog"
      max-width="290"
      >
      <v-card>
        <v-card-title class="headline">Action Status</v-card-title>

        <v-card-text>
          {{ admin_approval_status }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
          color="green darken-1"
          text
          @click="dialog = false"
          >OK
        </v-btn>


        
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
</template>





</v-container>
</v-app>
</template>


<script>

  import user_details from '@/views/user_details.vue'

  export default {
    name: 'new_user_request',
    components: {
      'user_details': user_details, 
    },
    data: ()=>({
      user_list : [] , 
      dialog: false,
      admin_approval_status: '',
      array_size: true  
    }),

    methods: {
      changeName: function(){

      },
      get_users : function(){
        //alert('get_data_method');

        var headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'} ;

          this.$axios.post(this.$store.getters.modelnew_user_request, {
            purpose : 'get_data'
          } , headers ).then(function(response){
          // console.log(response);


        // console.log(JSON.parse(response.data));

        // console.log(response.data);

        if(response.data.length == 1){
          this.user_list = []; 
          this.user_list[0] =  JSON.parse(response.data);
          // console.log(this.user_list[0]);
        }else if(response.data.length > 1){
          this.user_list =  response.data;
          // console.log(this.user_list[0].email);
        }else if(response.data == 0){
          this.user_list =  [];
        }


      }.bind(this));

        },
        approve_id: function(email , user_id){
        //console.log(email);

        this.$axios.post(this.$store.getters.modelnew_user_request, {
          purpose : 'approve_user', 
          email: email,
          user_id: user_id,
        } ).then(function(){
        //var obj = JSON.parse(data);
        // console.log(obj);
        //this.user_list = JSON.parse(data.bodyText);
        //alert(data);
        //console.log(obj[0].status);
        // console.log(data);
        
        this.admin_approval_status = 'User is approved';
        this.get_users();
        this.dialog = true;
        //console.log(obj.length);


      }.bind(this));

      },
      reject_id: function(email , user_id){
        //console.log(email);

        this.$axios.post(this.$store.getters.modelnew_user_request, {
          purpose : 'reject_user', 
          email: email,
          user_id: user_id,
        } ).then(function(){
        //var obj = JSON.parse(data);
        // console.log(obj);
        //this.user_list = JSON.parse(data.bodyText);
        //alert(data);
        //console.log(obj[0].status);
        // console.log(data);
        this.admin_approval_status = 'User is rejected';
        this.dialog = true;
        this.get_users();

        //console.log(obj.length);


      }.bind(this));


      }
    },
    created(){

      this.$axios.post(this.$store.getters.modelnew_user_request , {
        purpose : 'get_data'
      })
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