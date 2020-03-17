<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center" class="my-auto"> 
        <v-col cols="8" xl="4" >

          <h3> Please Enter new password </h3>
          

          <h2 v-if="status_text == 'Password Updated successfully' " class="green--text">{{ status_text }}</h2>
          <h2 v-else class="red--text">{{ status_text }}</h2>


          <v-text-field
          :error-messages="validityCheckInput('password')" v-model="password" 
          @keyup.enter="submit()"
          label="Enter new password"
          type="password"
          ></v-text-field>
          <v-text-field
          :error-messages="validityCheckInput('repassword')" v-model="repassword" 
          @keyup.enter="submit()"
          label="Re enter new password"
          type="password"
          ></v-text-field>
          

          <v-btn
          color="success"
          class="mr-4"
          @click="submit()"
          :loading="loading"
          >
          Change Password
        </v-btn>





      </v-col>
    </v-row>

    <v-row justify="center" align="center">

      <v-col cols="8" xl="4" >
        <v-btn 
        router :to="{ name : 'registration' }"
        color="primary"
        class="mr-4 mb-2 mb-sm-0"
        >
        Registration
      </v-btn>

      <router-link :to="{ name : 'profile_forgot_password' }">
        <v-btn 
        color="warning"
        class="mr-4"
        >
        Forgot Password
      </v-btn>
    </router-link>
  </v-col>

</v-row>

</v-container>







<v-row justify="center">


  <v-dialog
  v-model="dialog"
  max-width="290"
  persistent
  >
  <v-card>
    <v-card-title class="headline">Status</v-card-title>

    <v-card-text class="black--text">
      {{ status_text }}
    </v-card-text> 

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
      color="green darken-1"
      text
      @click="gotoForgotPassword()"
      >
      Close
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</v-row>


</v-app>
</template>

<script>



  export default {
    name: 'profile_password_recovery',
    components: {}, 

    data: ()=>({

      loading: false,

      name: 'riyad---vue',
      dialog: false,
      status_text: '',
      password_input: true,
      password: '',
      password_validity: '',
      repassword_input: true,
      repassword: '',
      repassword_validity: '',
      changes:{
        password:{
          smallText: {
            color: '#2196f3'          
          },
          smallButton: {
            color: 'white',
            backgroundColor: '#2196f3' 
          }
        },
        repassword:{
          smallText: {
            color: '#2196f3'          
          },
          smallButton: {
            color: 'white',
            backgroundColor: '#2196f3' 
          }
        },

      } 

    }), 
    created(){

      console.log(this.$route.query);
      console.log(this.$route.params);


      if(typeof this.$route.query.e == 'undefined' &&  typeof this.$route.query.c == 'undefined' ){

        this.$router.push({ name: 'login' }) ;
        return;
      }

      this.email = this.$route.query.e.trim();
var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;
      this.$axios.post( this.$store.getters.modelProfile_password_recovery ,
      {
        purpose: 'forgot_password_recovery',
        email: this.$route.query.e.trim(),
        forgot_password_crypto: this.$route.query.c.trim(),

      } , headers
      ).then(function(response){
        console.log(response);
        if(response.data == 'allow'){
          console.log('');

        }else {
          this.status_text = "invalid link or the link meybe expired";
          this.dialog = true;

        }
      }.bind(this))
      .catch(function(){

      }.bind(this));














    },
    methods: {


      enable_input: function(name){
        if(name=='password'){
          this.password_input = false;
          this.changes.password.smallText.color = 'red';
          this.changes.password.smallButton.color = 'white';
          this.changes.password.smallButton.backgroundColor = 'red';
          //alert(this.password_input);
        }
        if(name=='repassword'){
          this.repassword_input = false;
          this.changes.repassword.smallText.color = 'red';
          this.changes.repassword.smallButton.color = 'white';
          this.changes.repassword.smallButton.backgroundColor = 'red';
          //alert(this.password_input);
        }
      },
      validityCheckInput( inputName  ){
        if(inputName == 'password'){

          const errors = [];

          let patt= /[\S]{6,}/g;
          let result = patt.test(this.password);

          if(!result){
            this.password_validity = 'invalid'
            errors.push('min 6 chars');
          }else{
            this.password_validity = 'valid';
          }


          return errors;

        }else if(inputName == 'repassword'){

          const errors = [];

          let patt= /[\S]{6,}/g;
          let result = patt.test(this.repassword);

          if(!result){
            this.repassword_validity = 'invalid'
            errors.push('min 6 chars');
          }else{
            this.repassword_validity = 'valid';
          }


          return errors;
        }
      },
      gotoForgotPassword(){
        this.dialog= false;
        this.$router.push({ name: 'login' }) ;
      },
      submit(){
        // alert('submit clicekd');
        this.validityCheckInput('password');
        this.validityCheckInput('repassword');

        if(this.password_validity == 'valid' && this.password == this.repassword){
var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;
          this.$axios.post( this.$store.getters.modelProfile_password_recovery ,
          {
            purpose: 'password_change',
            password: this.password,
            email: this.email ,

          } , headers
          ).then(function(response){
            console.log(response);
            this.status_text = 'Password Updated successfully';
            // this.dialog = true;

          }.bind(this))
          .catch(function(error){

        console.log(error);
      }.bind(this));

        }else{
          this.status_text = 'password doesnt match';
          // this.dialog = true;
          //alert('all filed are not valid');
        }



      }



    },


  }
</script>

<style>
</style>