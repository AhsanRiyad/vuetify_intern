<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >

         <v-text-field
         v-model="email"
         v-on:keyup.enter="submit()"
         label="New Email"
         type="text"
         :error-messages="validityCheckInput('email')"
         ></v-text-field>


         <v-btn 
         color="success"
         class="my-4"
         @click="submit()"
         :loading="loading"

         >
         Update
       </v-btn>

       <slot></slot>


     </v-col>
   </v-row>

   <v-row justify="center">
    <v-dialog persistent 
    v-model="dialog"
    max-width="290"
    >
    <v-card>
      <v-card-title class="headline">Status</v-card-title>
      <v-card-text class="black--text">
        {{ status_text }}
      </v-card-text>
      <v-col v-if="otp_text_box_show" col="12" class="mt-n8">
        <v-text-field
        label="OTP sent to your email" v-model="otp"
        ></v-text-field>
        <v-btn @click="changeEmail()" :loading="loading" color="success">
          Validate
        </v-btn>
      </v-col>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        color="green darken-1"
        text
        @click="email_change_logout()"
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

  export default {
    name: 'profile_change_email',
    data: ()=>({
      name: 'riyad---vue',
      email_change_status: false,
      dialog: false,
      status_text: '',
      email_input: true,
      email: '',
      email_validity: '',
      status_text_show: false,
      otp_text_box_show: false,
      loading: false,
      recent_photo: '',
      otp: '',
      changes:{
        email:{
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

    methods: {
      enable_input: function(name){
        if(name=='email'){
          this.email_input = false;
          this.changes.email.smallText.color = 'red';
          this.changes.email.smallButton.color = 'white';
          this.changes.email.smallButton.backgroundColor = 'red';
          //alert(this.email_input);
        }
      },
      validityCheckInput( inputName  ){
        if(inputName == 'email'){


          const errors = [];
          var patt= /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g;
          var result = patt.test(this.email);
          result == false ? ( this.email_validity = 'invalid' , errors.push('DOB is Not Valid') )   : this.email_validity = 'valid';
          return errors;

        }
      },
      changeEmail(){
        this.$axios.post( this.$store.getters.modelProfile_change_email,
        {
          purpose: 'changeEmail',
          id: this.$store.getters.getAllInfo.id ,
          email_old: this.$store.getters.getAllInfo.email ,
          email: this.email,
          otp: this.otp,
        }
        ).then(function(response){
          console.log(response);
          if(response.data == 'success'){
            this.otp_text_box_show = true;
            this.status_text = 'email changed successfully';

            this.email_change_status = true;
            
            this.$store.commit('loginFalse');
            this.$cookies.set('email', '');
            this.$cookies.set('crypto', '');


          }else{
            this.otp_text_box_show = false;
            this.status_text = 'invalid otp';
            this.email_change_status = false;
          }
          this.loading = false;
          this.dialog = true;
          this.email_validity = 'invalid';

        }.bind(this))
        .catch(function(){
          this.loading = false;
          
        }.bind(this));
      },
      email_change_logout(){
        this.dialog = false;
        if(this.email_change_status == true){
          this.$router.push({ name: 'login' }) ;
        }
      },
      submit(){
        //alert(this.blood_group);
        this.validityCheckInput('email');
        
        if(this.email_validity == 'valid' ){
          this.loading = true;
          this.$axios.post( this.$store.getters.modelProfile_change_email  ,
          {
            purpose: 'email',
            id: this.$store.getters.getAllInfo.id ,
            email_old: this.$store.getters.getAllInfo.email ,
            email: this.email,
          }
          ).then(function(response){
            console.log(response);
            if(response.data == 'success'){
              this.otp_text_box_show = true;
              this.status_text = '';
            }else{
              this.otp_text_box_show = false;
              this.status_text = 'email already used';
            }
            this.loading = false;
            this.dialog = true;
          }.bind(this))
          .catch(function(){
            this.loading = false;
            
          }.bind(this));

          
        }else{
          this.status_text = 'email is not valid';
          this.dialog = true;
          //alert('all filed are not valid');
        }
      }
    }

  }



</script>