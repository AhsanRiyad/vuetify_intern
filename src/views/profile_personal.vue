<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >


          <v-text-field
          label="Father's Name"
          type="text"
          v-model="fathers_name"
          :error-messages="onChangeValidity('fathers_name')"
          ></v-text-field>

          <v-text-field
          v-model="mothers_name"    
          label="mothers_name"
          type="text"
          :error-messages="onChangeValidity('mothers_name')"
          ></v-text-field>


          <v-text-field
          v-model="spouse_name"
          label="spouse_name"
          type="text"
          :error-messages="onChangeValidity('spouse_name')"
          ></v-text-field>
          
          <v-text-field
          v-model="number_of_children"
          label="number_of_children"
          type="text"
          :error-messages="onChangeValidity('number_of_children')"
          ></v-text-field>      


          <v-text-field
          v-model="profession"
          label="profession"
          type="text"
          :error-messages="onChangeValidity('profession')"
          ></v-text-field>  

          <v-text-field
          v-model="workplace_or_institution"
          label="workplace_or_institution"
          type="text"
          :error-messages="onChangeValidity('workplace_or_institution')"
          ></v-text-field>      

          <v-text-field
          v-model="designation"
          label="designation"
          type="text"
          :error-messages="onChangeValidity('designation')"
          ></v-text-field> 
        

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
  name: 'profile_personal',
  data: ()=>({
    name: 'riyad---vue',
      dialog: '' , 
      status_text: '',
      fathers_name_input: true,
      mothers_name_input: true,
      spouse_name_input: true,
      number_of_children_input: true,
      dob_input: true,
      profession_input: true,
      workplace_or_institution_input: true,
      designation_input: true,
      fathers_name: '',
      mothers_name: '',
      spouse_name: '',
      number_of_children: '',
      dob: '',
      profession: '',
      workplace_or_institution: '',
      designation: '',
      designation_validity: false,
      fathers_name_validity: false,
      mothers_name_validity: false,
      spouse_name_validity: false,
      number_of_children_validity: false,
      dob_validity: false,
      profession_validity: false,
      workplace_or_institution_validity: false,
      users_info: '',
      submit_disabled: false,
      type: '',
      recent_photo:'',
  }), 

  created(){

     // this.setAllInfo();
    // this.full_name = this.$store.getters.getAllInfo.full_name;


    this.fathers_name = this.$store.getters.getAllInfo.fathers_name.toString();


    this.mothers_name = this.$store.getters.getAllInfo.mother_name;
    this.spouse_name = this.$store.getters.getAllInfo.spouse_name;
    this.number_of_children = this.$store.getters.getAllInfo.number_of_children;
    this.profession = this.$store.getters.getAllInfo.profession;
    this.workplace_or_institution = this.$store.getters.getAllInfo.institution;
    this.designation = this.$store.getters.getAllInfo.designation;



     // this.date_of_birth = new Date(this.$store.getters.getAllInfo.date_of_birth);
     
    // alert(this.$store.getters.getAllInfo.date_of_birth);

  },
  methods: {

      /*getData(){
        console.log( this.$store.getters.getAllInfo);

      },*/
      onChangeValidity(inputName){
        //console.log(this.fathers_name);
        if(inputName == 'fathers_name'){
          //console.log(this.fathers_name);
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.fathers_name);
          result == false ? this.fathers_name_validity = 'invalid' : this.fathers_name_validity = 'valid';
        }else if(inputName == 'mothers_name'){
          //console.log(this.mothers_name);
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.mothers_name);
          result == false ? this.mothers_name_validity = 'invalid' : this.mothers_name_validity = 'valid';
        }else if(inputName == 'spouse_name'){
          //console.log(this.spouse_name);
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.spouse_name);
          result == false ? this.spouse_name_validity = 'invalid' : this.spouse_name_validity = 'valid';
        }else if(inputName == 'number_of_children'){
          //console.log(this.number_of_children);
          let patt= /^[\d]{1,2}$/g;
          let result = patt.test(this.number_of_children);
          result == false ? this.number_of_children_validity = 'invalid' : this.number_of_children_validity = 'valid';
        }else if(inputName == 'profession'){
          //console.log(this.profession);
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.profession);
          result == false ? this.profession_validity = 'invalid' : this.profession_validity = 'valid';
        }else if(inputName == 'workplace_or_institution'){
          //console.log(this.workplace_or_institution);
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.workplace_or_institution);
          result == false ? this.workplace_or_institution_validity = 'invalid' : this.workplace_or_institution_validity = 'valid';
        }else if(inputName == 'designation'){
          //console.log(this.designation);
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.designation);
          result == false ? this.designation_validity = 'invalid' : this.designation_validity = 'valid';
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
