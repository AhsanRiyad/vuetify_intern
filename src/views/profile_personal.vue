<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >

          <slot name="verification_alert"></slot>

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
          
          label="Children Details"
          type="text"
          @click="children_details()"
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

          >
          Update
        </v-btn>

        <br>

        <slot name="buttons"></slot>


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
    designation_validity: 'invalid',
    fathers_name_validity: 'invalid',
    mothers_name_validity: 'invalid',
    spouse_name_validity: 'invalid',
    number_of_children_validity: 'invalid',
    dob_validity: 'invalid',
    profession_validity: 'invalid',
    workplace_or_institution_validity: 'invalid',
    users_info: '',
    submit_disabled: false,
    type: '',
    recent_photo:'',
  }), 

  created(){

     // this.setAllInfo();
    // this.full_name = this.$store.getters.getAllInfo.full_name;


    this.fathers_name = this.$store.getters.getAllInfo.fathers_name;

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

    children_details(){
    alert('children_details clicked');
    },
    submit(){

      this.onChangeValidity('fathers_name');
      this.onChangeValidity('mothers_name');
      this.onChangeValidity('spouse_name');
      this.onChangeValidity('number_of_children');
      this.onChangeValidity('profession');
      this.onChangeValidity('workplace_or_institution');
      this.onChangeValidity('designation');

      this.$store.getters.getform_field_rules.forEach((item)=>{


        if(item.rule == 'optional'){
          switch(item.field_name) {
            case 'number_of_children_validity':
            this.number_of_children_validity = 'valid';
            break;
            case 'profession_validity':
            this.profession_validity = 'valid';
            break;
            case 'workplace_or_institution_validity':
            this.workplace_or_institution_validity = 'valid';
            break;
            case 'designation_validity':
            this.designation_validity = 'valid';
            break;
          }

        }})





      if( this.fathers_name_validity == 'valid' &&  this.mothers_name_validity == 'valid' && this.spouse_name_validity == 'valid' && this.number_of_children_validity == 'valid' &&  this.profession_validity == 'valid' && this.workplace_or_institution_validity == 'valid' && this.designation_validity == 'valid' ){
        var headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'} ;
          this.$axios.post( this.$store.getters.modelProfile_personal ,
          {
            purpose: 'personal',
            id: this.$store.getters.getAllInfo.id ,
            email: this.$store.getters.getAllInfo.email ,
            fathers_name: this.fathers_name,
            mothers_name: this.mothers_name,
            spouse_name: this.spouse_name,
            number_of_children: this.number_of_children,
            profession: this.profession,
            workplace_or_institution: this.workplace_or_institution,
            designation: this.designation,
          } , headers
          ).then(function(){

            this.$store.getters.getAllInfo.type == 'admin' ? this.status_text = 'Updated, Thank You' : this.status_text = 'Update requested successfully! wait for admin approval';

            this.dialog = true;



            this.$store.getters.getAllInfo.fathers_name = this.fathers_name ;
            this.$store.getters.getAllInfo.mother_name = this.mothers_name ;
            this.$store.getters.getAllInfo.spouse_name = this.spouse_name ;
            this.$store.getters.getAllInfo.number_of_children = this.number_of_children ;
            this.$store.getters.getAllInfo.profession = this.profession ;
            this.$store.getters.getAllInfo.institution = this.workplace_or_institution ;
            this.$store.getters.getAllInfo.designation = this.designation ;



          }.bind(this))
          .catch(function(){
        //console.log(error);
      }.bind(this));


          this.status_text = 'All fields are valid';
          this.dialog = true ;
        }else{
          this.status_text = 'invalid fields detected';
          this.dialog = true ;
        }


      },



      /*getData(){
        console.log( this.$store.getters.getAllInfo);

      },*/
      onChangeValidity(inputName){
        //console.log(this.fathers_name);
        if(inputName == 'fathers_name'){ 

          const errors = [];
          
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.fathers_name);
          
          result == false ? ( this.fathers_name_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.fathers_name_validity = 'valid';

          return errors;


        }else if(inputName == 'mothers_name'){
          // console.log(this.mothers_name);


          const errors = [];
          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.mothers_name);
          
          result == false ? ( this.mothers_name_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.mothers_name_validity = 'valid';

          return errors;

        }else if(inputName == 'spouse_name'){
          //console.log(this.spouse_name);
          
          const errors = [];

          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.spouse_name);

          
          result == false ? ( this.spouse_name_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.spouse_name_validity = 'valid';

          return errors;

        }else if(inputName == 'number_of_children'){
          //console.log(this.number_of_children);

          const errors = [];


          let patt= /^[\d]{1,2}$/g;
          let result = patt.test(this.number_of_children);
          

          result == false ? ( this.number_of_children_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.number_of_children_validity = 'valid';

          return errors;

        }else if(inputName == 'profession'){
          //console.log(this.profession);

          const errors = [];


          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.profession);

          result == false ? ( this.profession_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.profession_validity = 'valid';


          return errors;

        }else if(inputName == 'workplace_or_institution'){


          const errors = [];

          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.workplace_or_institution);


          result == false ? ( this.workplace_or_institution_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.workplace_or_institution_validity = 'valid';


          return errors;

        }else if(inputName == 'designation'){
          //console.log(this.designation);

          const errors = [];


          let patt= /[A-Za-z.\s]{5,}/g;
          let result = patt.test(this.designation);
          

          result == false ? ( this.designation_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.designation_validity = 'valid';



          return errors;

        }
      }
    },
    
  }



</script>
