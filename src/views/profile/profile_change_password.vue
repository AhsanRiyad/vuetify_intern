
<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >

        
          <slot name="verification_alert"></slot>
        <slot name="email_verification_alert"></slot>
          
          <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
          v-on:submit.prevent
          >

          
         <v-text-field
         v-model="password"
         v-on:keyup.enter="submit()"
         label="New Password"
         type="password"
         :rules="[ v => !!v || 'required' ]"
         ></v-text-field>

         <v-text-field
         v-model="repassword"
         v-on:keyup.enter="submit()"
         label="Re-Enter New Password"
         type="password"
         :rules="[ 
         v => !!v || 'required',
         v => password==v || 'password does not match'
          ]"
         ></v-text-field>

         <v-btn 
         color="success"
         class="my-4"
         :loading="loading"
         @click="submit()"

         >
         Update
       </v-btn>
</v-form>
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
      
      password: '',
           
      repassword: '',

      valid: true,
      lazy: true,
        
    }),

    methods: {
      submit(){
        //alert(this.blood_group);
        this.loading = true;
        
        if(this.$refs.form.validate()){


          var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

          this.$axios.post( this.$store.getters.modelProfile_change_password ,
          {
            purpose: 'password',
            id: this.$store.getters.getAllInfo.id ,
            email: this.$store.getters.getAllInfo.email ,
            password: this.password,
          } , headers
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