<template>
  <v-app class="grey"> 

	<!-- 
    <component v-bind:is="$store.getters.getComponentName"> <buttons_for_profile></buttons_for_profile> </component> -->
    <v-container class="white">
     <v-row justify="center" align="center"> 
      <v-col cols="8" xl="4" >

        <slot name="verification_alert"></slot>
        <slot name="email_verification_alert"></slot>

        <v-text-field
        v-model="verify_email_otp"
        v-on:keyup.enter="submit()"
        label="Enter OTP"
        type="text"
        :error-messages="validityCheckInput('verify_email_otp')"
        ></v-text-field>


        <v-btn 
        color="success"
        class="my-4"
        @click="submit()"
        :loading="loading"

        >
        Verify
      </v-btn>

      <br>      

      <v-btn class="mb-3" :loading='loading_send_otp' color="primary" @click="sendOtpAgain()">
        Send OTP
      </v-btn> 

      <br>      

      <slot name="buttons"></slot>


    </v-col>
  </v-row>
  

  <v-row justify="center">
    <v-dialog
    v-model="dialog"
    max-width="290"
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
        @click="dialog = false"
        >
        Okay
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</v-row>

</v-container>

</v-app>
</template>
<script>
// @ is an alias to /src


export default {
  name: 'verify_email_otp',
  components: {}, 

  data: ()=>({


    name: 'riyad---vue',
    dialog: false,
    status_text: '',
    verify_email_otp_input: true,
    verify_email_otp: '',
    verify_email_otp_validity: '',
    loading: false,
    loading_send_otp: false,
    changes:{
      verify_email_otp:{
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
  created(){},
  methods: {

    enable_input: function(name){
      if(name=='verify_email_otp'){
        this.verify_email_otp_input = false;
        this.changes.verify_email_otp.smallText.color = 'red';
        this.changes.verify_email_otp.smallButton.color = 'white';
        this.changes.verify_email_otp.smallButton.backgroundColor = 'red';
          //alert(this.verify_email_otp_input);
        }
      },
      validityCheckInput( inputName  ){
        if(inputName == 'verify_email_otp'){

          var patt= /^[\d]{4}$/g;
          var result = patt.test(this.verify_email_otp);
          result == false ? this.verify_email_otp_validity = 'invalid' : this.verify_email_otp_validity = 'valid';
        }
      },
      submit(){
        //alert(this.blood_group);
        this.validityCheckInput('verify_email_otp');
        
        if(this.verify_email_otp_validity == 'valid' ){
          //alert(this.verify_email_otp);
          this.$axios.post( this.$store.getters.modelProfile_verify_email ,
          {
            purpose: 'verify_email_otp',
            verify_email_otp: this.verify_email_otp,
            id: this.$store.getters.getAllInfo.id ,
            email: this.$store.getters.getAllInfo.email ,
            
          }
          ).then(function(response){


            if(response.data == 'email_verified'){
              this.status_text = 'email verified successfully';
              
              this.dialog = true;
            }else{
              this.status_text = 'invalid otp, try again' ;
              this.dialog = true;
            }
          }.bind(this))
          .catch(function(){

          }.bind(this));
        }else{
          this.status_text = 'OTP is not valid ';
          this.dialog = true;
          //alert('all filed are not valid');
        }
      },
      sendOtpAgain(){
        // alert('send otp');

        this.loading_send_otp = true;
        this.$axios.post( this.$store.getters.modelProfile_verify_email ,
        {
          purpose: 'send_otp',
          id: this.$store.getters.getAllInfo.id ,
          email: this.$store.getters.getAllInfo.email ,

        }
        ).then(function(response){

          console.log(response);
          if(response.data == 'otp_sent'){
            this.status_text = 'OTP sent, check your email';
            this.dialog = true;
          }if(response.data == 'server_problem'){
            this.status_text = 'email server problem, try again later';
            this.dialog = true;
          }
          this.loading_send_otp = false;
        }.bind(this))
        .catch(function(){
          this.loading_send_otp = false;
          
        }.bind(this));
      }

    },
  }
</script>

<style>
</style>