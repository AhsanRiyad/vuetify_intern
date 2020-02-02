<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >
          
          <v-text-field
        
          label="Name"
          type="text"
  

          v-model="full_name"

          :error-messages="onChangeValidity('full_name')"
          ></v-text-field>

          <v-text-field
          v-model="institution_id"
          
          label="Institution ID"
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
          v-model="nid_or_passport"
          
          label="nid_or_passport"
          type="text"
          :error-messages="onChangeValidity('nid_or_passport')"
          ></v-text-field> 

          <v-select
          v-model = "blood_group"
          :items="items"
          label="Blood Group"
          :error-messages="onChangeValidity('blood_group')"
          ></v-select>





          <v-menu 
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date_of_birth"
          transition="scale-transition"
          offset-y
          min-width="290px"
          >
          <template v-slot:activator="{ on }">
            <v-text-field :error-messages="onChangeValidity('date_of_birth')"
            v-model="date_of_birth"
            label="Date of birth"
            readonly
            v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date_of_birth" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date_of_birth)">OK</v-btn>
          </v-date-picker>
        </v-menu>

        <v-btn 
        color="success"
        class="my-4"
        @click="submit()"
        :loading="loading"
        >
        Update
      </v-btn>

      <br>

      <slot></slot>

<!-- 
  <v-btn @click="getData()"
  color="success"
  class="mr-4"
  >
  getData
</v-btn> -->


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
  name: 'profile_basic',
  data: ()=>({
    date_of_birth: '',
    menu: false,
    modal: false,
    menu2: false,


    name: 'riyad---vue',
    dialog: false,
    status_text: '',
    full_name : '',
    email: '',
    mobile: '',
    institution_id: '',
    blood_group: '',
    dob: '',
    nid_or_passport:'',
    nid_or_passport_validity:'',
    blood_group_validity : '',
    dob_validity : '',
    full_name_validity : '',
    date_of_birth_validity: '',
    email_validity: '',
    mobile_validity: '',
    institution_id_validity: '',
    password_validity: '',
    registratrion_status: 'default',
    loading: false,
    items: ['A+' , 'B+' , 'AB+' , 'O+' , 'A-' , 'B-' , 'AB-' , 'O-']
  }), 

  created(){

     // this.setAllInfo();
    // this.full_name = this.$store.getters.getAllInfo.full_name;


    this.date_of_birth = this.$store.getters.getAllInfo.date_of_birth.toString();


    this.full_name = this.$store.getters.getAllInfo.full_name;
    this.institution_id = this.$store.getters.getAllInfo.institution_id;
    this.mobile = this.$store.getters.getAllInfo.mobile;
    this.nid_or_passport = this.$store.getters.getAllInfo.nid_or_passport;
    this.blood_group = this.$store.getters.getAllInfo.blood_group;



     // this.date_of_birth = new Date(this.$store.getters.getAllInfo.date_of_birth);
     
    // alert(this.$store.getters.getAllInfo.date_of_birth);

  },
  methods: {

      /*getData(){
        console.log( this.$store.getters.getAllInfo);

      },*/
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
          let errors = [];
          errors.push(true);
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
          let errors = [];
          errors.push(false);
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

      }else if(inputName == 'nid_or_passport'){

        let patt= /[\S]{10,}/g;
        let result = patt.test(this.nid_or_passport);

        result == false ? this.nid_or_passport_validity = 'invalid' : this.nid_or_passport_validity = 'valid';

        if(!result){
          let errors = [];
          errors.push('invalid nid or passport number');
          this.nid_or_passport_validity = 'invalid'
          return errors;
        }else{
          this.nid_or_passport_validity = 'valid';
        }
      }else if(inputName == 'blood_group'){

        let patt= /[+-A-O]{1,3}/g;
        let result = patt.test(this.blood_group);


        if(!result){
          let errors = [];
          errors.push('invalid nid or passport number');
          this.blood_group_validity = 'invalid'
          return errors;
        }else{
          this.blood_group_validity = 'valid';
        }



      }else if(inputName == 'date_of_birth'){
        //alert(this.date_of_birth);
        let patt= /^([0-9]{4})([-]{1}[0-9]{2}[-]{1}[0-9]{2}$)/igm;
        let result = patt.test(this.date_of_birth);

        patt = /^([0-9]{4})/g;
        const matches = this.date_of_birth.match(patt);

        if(result == true && matches[0]>1950 && matches[0] <2000){
          this.date_of_birth_validity = 'valid';
        }else{
          let errors = [];
          errors.push('invalid date of birth');
          this.date_of_birth_validity = 'invalid'
          return errors;
        }

          //result == false ? this.dob_validity = 'invalid' : this.dob_validity = 'valid';
        }
      }
    },
    submit(){
        //alert(this.blood_group);

        this.validityCheckInput('full_name');
        this.validityCheckInput('mobile');
        this.validityCheckInput('institution_id');
        this.validityCheckInput('nid_or_passport');
        this.onChangeValidity('blood_group');
        this.onChangeValidity('date_of_birth');

        if(this.full_name_validity == 'valid' && this.mobile_validity == 'valid' && this.institution_id_validity == 'valid' && this.nid_or_passport_validity == 'valid' && this.blood_group_validity == 'valid' && this.date_of_birth_validity == 'valid' ){

          this.$axios.post( this.$store.getters.modelProfile_basic ,
          {
            purpose: 'basic',
            full_name: this.full_name,
            mobile: this.mobile,
            institution_id: this.institution_id,
            nid_or_passport: this.nid_or_passport,
            blood_group: this.blood_group,
            dob: this.date_of_birth,
          }
          ).then(function(){
            this.type == 'admin' ? this.status_text = 'Updated, Thank You' : this.status_text = 'Update requested successfully! wait for admin approval';
            this.dialog = true;

          }.bind(this))
          .catch(function(){
        //console.log(error);
      }.bind(this));
        }else{
          this.status_text = 'all field are not valid';
          this.dialog = true;
          //alert('all filed are not valid');
        }
      },

    }



  </script>
