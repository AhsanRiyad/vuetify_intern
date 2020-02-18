
<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >

        
          <slot name="verification_alert"></slot>

         <v-text-field
         v-model="password"
         v-on:keyup.enter="submit()"
         label="New Password"
         type="password"
         :error-messages="validityCheckInput('password')"
         ></v-text-field>

         <v-text-field
         v-model="repassword"
         v-on:keyup.enter="submit()"
         label="Re-Enter New Password"
         type="password"
         :error-messages="validityCheckInput('repassword')"
         ></v-text-field>

         <v-btn 
         color="success"
         class="my-4"
         :loading="loading"
         @click="submit()"

         >
         Update
       </v-btn>

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

  export default {
    name: 'password',
    data: ()=>({
      name: 'riyad---vue',
      dialog: false,
      loading: false,
      status: '',
      status_text: '',
      password_input: true,
      password: '',
      password_validity: '',
      repassword_input: true,
      repassword: '',
      repassword_validity: '',
      recent_photo: '',
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

    methods: {
      validityCheckInput( inputName  ){
        if(inputName == 'password'){

          const errors = [];

          let patt= /[\S]{6,}/g;
          let result = patt.test(this.password);

          result == false ? ( this.password_validity = 'invalid' , errors.push('min 6 chars') )   : this.password_validity = 'valid';

          return errors;

        }else if(inputName == 'repassword'){

          const errors = [];

          let patt= /[\S]{6,}/g;
          let result = patt.test(this.repassword);

          result == false ? ( this.repassword_validity = 'invalid' , errors.push('min 6 chars') )   : this.repassword_validity = 'valid';

          return errors;
        }
      },
      submit(){
        //alert(this.blood_group);
        this.loading = true;
        this.validityCheckInput('password');
        this.validityCheckInput('repassword');
        if(this.password_validity == 'valid' && this.password == this.repassword){
          this.$axios.post( this.$store.getters.modelProfile_change_password ,
          {
            purpose: 'password',
            id: this.$store.getters.getAllInfo.id ,
            email: this.$store.getters.getAllInfo.email ,
            password: this.password,
          }
          ).then(function(){
            this.status_text = 'Password Updated successfully';
            this.loading = false;

            this.dialog = true;
          }.bind(this))
          .catch(function(){
        //console.log(error);
      }.bind(this));
        }else{
          this.status_text = 'password doesnt match';
          this.dialog = true;
          this.loading = false;
          
          //alert('all filed are not valid');
        }
      }
    }



  }



</script>