<template>

    <v-app class="grey" > 
      <v-container class="white" >
        <v-row justify="center" align="center"> 
          <v-col cols="8" xl="4" >


            <h3> Dear Admin, You Can Add an User directly. </h3>

            <v-text-field         
            label="Name"
            type="text"
            v-model='full_name'
            :error-messages="onChangeValidity('full_name')"
            ></v-text-field>

            <v-text-field
            v-model="institution_id"
            :label="this.$store.getters.getIInstitution_id_label"
            type="text"
            :error-messages="onChangeValidity('institution_id')"
            ></v-text-field>


            <v-text-field
            v-model="mobile"
            label="Mobile"
            type="text"
            :error-messages="onChangeValidity('mobile')"
            ></v-text-field>

            <v-text-field
            v-model="email"
            label="Email"
            type="text"
            :error-messages="onChangeValidity('email')"
            ></v-text-field>

            <v-text-field
            v-model="password"
            type="password"
            label="password"
            :error-messages="onChangeValidity('password')"

            ></v-text-field>

            <v-btn 

            color="success"
            class="my-4"
            @click="submit()"
            :loading="loading"
            >
            Registration
          </v-btn>

          <br>

        </v-col>

      </v-row>

     
</v-container>

<v-row justify="center">
  <v-dialog
  v-model="dialog"
  max-width="290"
  >
  <v-card>
    <v-card-title class="headline">Status</v-card-title>

    <v-card-text>
      {{ status_text }}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
      color="green darken-1"
      text
      @click="dialog = false"
      >
      Disagree
    </v-btn>

    <v-btn
    color="green darken-1"
    text
    @click="dialog = false"
    >
    Agree
  </v-btn>
</v-card-actions>
</v-card>
</v-dialog>
</v-row>


</v-app>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'add_user',
  data: ()=>({
    name: 'riyad---vue',
    dialog: false,
    status_text: '',
    full_name : '',
    email: '',
    mobile: '',
    institution_id: '',
    password: '',
    full_name_validity : 'green',
    email_validity: '',
    mobile_validity: '',
    institution_id_validity: '',
    password_validity: '',
    registratrion_status: 'default',
    loading: false,
  }), 

  created(){
      // this.institution_id_label = this.institution_id_label__;

    },
    methods: {
    onChangeValidity(inputName){
      if(inputName == 'full_name'){
        // console.log(this.$refs.full_name.value);
        let patt= /[A-Za-z.\s]{5,}/g;
        let result = patt.test(this.full_name);

        if(!result){
          let errors = [];
          errors.push('Name at least 6 characters');
          this.full_name_validity = 'invalid'
          return errors;
        }else{
          this.full_name_validity = 'valid';
        }

      }else if(inputName == 'institution_id'){
        // console.log(this.institution_id);
        let patt= /[A-Za-z\S]{5,}/g;
        let result = patt.test(this.institution_id);



        if(!result){
          let errors = [];
          errors.push('id atleast 5 characters');
          this.institution_id_validity = 'invalid'
          return errors;
        }else{
          this.institution_id_validity = 'valid';
        }



      }else if(inputName == 'mobile'){
        // console.log(this.mobile);
        let patt= /[+]{0,1}[\d]{11,}/g;
        let result = patt.test(this.mobile);

        if(!result){
          let errors = [];
          errors.push('mobile number must be alteast 11 digit');
          this.mobile_validity = 'invalid'
          return errors;
        }else{
          this.mobile_validity = 'valid';
        }

      }else if(inputName == 'email'){
        // console.log(this.email);
        let patt= /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g;
        let result = patt.test(this.email);



        if(!result){
          let errors = [];
          errors.push('invalid email');
          this.email_validity = 'invalid'
          return errors;
        }else{
          this.email_validity = 'valid';
        }

      }else if(inputName == 'password'){
        // console.log(this.password);
        let patt= /[\S]{6,}/g;
        let result = patt.test(this.password);


        if(!result){
          let errors = [];
          errors.push('atleast 6 characters');
          this.password_validity = 'invalid'
          return errors;
        }else{
          this.password_validity = 'valid';
        }

      }
    },
    submit(){


      this.loading = true;
      if(this.full_name_validity == 'valid' && this.institution_id_validity == 'valid' && this.mobile_validity == 'valid' && this.email_validity == 'valid' && this.password_validity == 'valid'){
        // alert('valid');

        var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;


        this.$axios.post(this.$store.getters.modelRegistration, {
          full_name: this.full_name,
          institution_id: this.institution_id,
          email: this.email,
          mobile: this.mobile,
          password: this.password,
          who_is_doing_registration: 'admin',
        } , headers)
        .then( function(response){
          this.registratrion_status = response.data ; 
          this.loading = false;
          console.log(response);
          response.data == 'NO' ? this.status_text = 'Email already used' : this.status_text = 'registration successful';
        // this.status_text = 'success';
        this.dialog = true;

        

      }.bind(this))
        .catch(function () {
          // console.log(error);
          this.loading = false;
          this.status_text = 'failed';
          this.dialog = true;

        //return 'hi';
      }.bind(this));
      }else{

        this.loading = false;
        this.status_text = 'invalid field detected';
        this.dialog = true;

      }



    },
  }


}



</script>
