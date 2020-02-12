<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >

          <v-text-field

          label="Present Address Line 1"
          type="text"


          v-model="present_line1"

          :error-messages="onChangeValidity('present_line1')"
          ></v-text-field>

          <v-text-field

          label="Present post code"
          type="text"


          v-model="present_post_code"

          :error-messages="onChangeValidity('present_post_code')"
          ></v-text-field>


          <v-text-field

          label="Present district"
          type="text"


          v-model="present_district"

          :error-messages="onChangeValidity('present_district')"
          ></v-text-field>



          <v-text-field

          label="Present country"
          type="text"


          v-model="present_country"

          :error-messages="onChangeValidity('present_country')"
          ></v-text-field>


          
          <v-text-field

          label="Present Address Line 1"
          type="text"


          v-model="present_line1"

          :error-messages="onChangeValidity('present_line1')"
          ></v-text-field>



          <v-text-field

          label="Present post code"
          type="text"


          v-model="present_post_code"

          :error-messages="onChangeValidity('present_post_code')"
          ></v-text-field>



          <v-text-field

          label="Present district"
          type="text"


          v-model="present_district"

          :error-messages="onChangeValidity('present_district')"
          ></v-text-field>



          <v-text-field

          label="Present country"
          type="text"


          v-model="present_country"

          :error-messages="onChangeValidity('present_country')"
          ></v-text-field>

          <v-btn 
          color="success"
          class="my-4"
          @click="submit()"
          
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
    status_text: '' ,
    present_line1_input: true,
    present_line2_input: true,
    present_district_input: true,
    present_post_code_input: true,
    present_country_input: true,
    permanent_line1_input: true,
    permanent_line2_input: true,
    permanent_district_input: true,
    permanent_post_code_input: true,
    permanent_country_input: true,
    present_line1_validity: false,
    present_line2_validity: false,
    present_district_validity: false,
    present_post_code_validity: false,
    present_country_validity: false,
    permanent_line1_validity: false,
    permanent_line2_validity: false,
    permanent_district_validity: false,
    permanent_post_code_validity: false,
    permanent_country_validity: false,
    present_line1: '',
    recent_photo: '',
    present_line2: '',
    present_district: '',
    present_post_code: '',
    present_country: '',
    permanent_line1: '',
    permanent_line2: '',
    permanent_district: '',
    permanent_post_code: '',
    permanent_country: '',
    users_info: '',
  }), 

  created(){

     // this.setAllInfo();
    // this.full_name = this.$store.getters.getAllInfo.full_name;

    this.present_line1= this.$store.getters.getAllInfo.present_line1;
    this.present_district= this.$store.getters.getAllInfo.present_district;
    this.present_post_code= this.$store.getters.getAllInfo.present_post_code;
    this.present_country= this.$store.getters.getAllInfo.present_country;
    this.permanent_line1= this.$store.getters.getAllInfo.permanent_line1;
    this.permanent_district= this.$store.getters.getAllInfo.permanent_district;
    this.permanent_post_code= this.$store.getters.getAllInfo.permanent_post_code;
    this.permanent_country= this.$store.getters.getAllInfo.permanent_country;


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
