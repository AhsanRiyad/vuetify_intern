<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >
          <h3> Dear User, We are glad you are here, please register </h3>
          
          <v-form
          ref="form"
          v-model="valid"
          :lazy-validation="lazy"
          v-on:submit.prevent
          >
          
          <div v-for="(form, index) in forms"
          :key="form.field_name">


          <v-text-field
          :label="form.label == 'Institution Id' ? $store.getters.getIInstitution_id_label : form.label "
          v-model="form.value"
          :type="form.type"
          :rules=" field_rules_prop(  form.field_name , index  )"
          >

        </v-text-field>

      </div>

    </v-form>
    <br>
    <v-btn 

    color="success"
    class="my-4"
    @click="submit()"
    :loading="loading"
    >
    Register
  </v-btn>
</v-col>
</v-row>


<v-row justify="center" align="center">

  <v-col cols="8" xl="4" >

    <v-btn router :to="{ name: 'login' }"

    color="primary"

    class="mr-4 mb-2 mb-sm-0"
    >
    Login
  </v-btn>

  <v-btn router :to="{ name: 'profile_forgot_password' }"
  color="warning"
  class="mr-4"
  >
  Forgot Password
</v-btn>

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
      Close
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</v-row>

</v-app>
</template>

<script>
// @ is an alias to /src
import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'

export default {
  name: 'registration',
  mixins: [ profile_info_and_privacy_Mixins ],
  data: ()=>({
    name: 'riyad---vue',
    dialog: false,
    status_text: '',
    
    first_name: '',
    last_name: '',
    name_bangla: '',

    full_name : '',
    email: '',
    mobile: '',
    institution_id: '',
    password: '',
    
    registratrion_status: 'default',
    loading: false,

    lazy:false,
    valid: false,

    forms : [
    {
      label: 'First Name' , field_name: 'first_name', value: '' , type: 'text'
    },
    {
      label: 'Last Name' , field_name: 'last_name', value: '' , type: 'text'
    },
    {
      label: 'Institution Id' , field_name: 'institution_id', value: '' , type: 'text'
    },
    {
      label: 'Mobile' , field_name: 'mobile', value: '' , type: 'text'
    },
    {
      label: 'Email' , field_name: 'email', value: '' , type: 'text'
    },
    {
      label: 'Password' , field_name: 'password', value: '' , type: 'password'
    },
    ]


  }), 


  methods: {
    submit(){

      console.log(this.$refs);
      this.loading = true;
      if(this.$refs.form.validate()){
        // alert('valid');
        let users_info = {};
        this.forms.forEach((item)=>{
          

          users_info = {...users_info , [item.field_name] : item.value }

        })

        /*let abc = {...users_info , password: md5(password)}
        users_info = {...abc};*/


        console.log(users_info);
        var headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'} ;
          this.$axios.post( this.$store.getters.getModelAddress_laravel+'user_registration',  {
            
            users_info: users_info,
            who_is_doing_registration: 'admin',
          } , headers )
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
    },
    created(){

      

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;
        this.$axios.post(this.$store.getters.modeladmin_options, {
          purpose: 'get_institution_id_label'
        } , headers ).then( function(response){
          console.log(response);

          this.$store.commit('setIInstitution_id_label' , response.data);

        }.bind(this))
        .catch(function () {
        }.bind(this));


      }

    }

  </script>
