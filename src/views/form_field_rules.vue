<template>
  <v-app class="grey" > 

   <v-container>
    <v-row justify="center" >

      <v-col cols="12" md="7" xl="7" class="green white--text text-center">



        <h2 > Select which on is mandatory </h2>

      </v-col>


      <v-col cols="12">
      </v-col>


      <v-col cols="12" xl="7" md="7" class="white" >

        <v-checkbox
        @change="changeValue('nid_or_passport_validity' , nid_or_passport_validity)"
        v-model="nid_or_passport_validity"
        label="NID or Passport number"
        color="info"

        hide-details
        ></v-checkbox>

        <v-checkbox
        v-model="blood_group_validity"
        @change="changeValue('blood_group_validity' , blood_group_validity)" 
        label="Blood Group"
        color="info"
        
        hide-details
        ></v-checkbox>   
        <v-checkbox
        @change="changeValue('date_of_birth_validity' , date_of_birth_validity)"
        v-model="date_of_birth_validity"
        label="Date Of Birth"
        color="info"
        
        hide-details
        ></v-checkbox>

        <v-checkbox
        @change="changeValue('religion_validity' , religion_validity)"
        v-model="religion_validity"
        label="Religion"
        color="info"
        hide-details
        ></v-checkbox>



      </v-col>


      <v-col cols="12" md="7" xl="7">

        <slot name="buttons" ></slot>



      </v-col>



    </v-row>



  </v-container>

</v-app>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'form_field_rules',
  data: ()=>({
    items: ['Institution ID' ,'School ID' , 'College ID' , 'School Roll' , 'College Roll' , 'University Roll'],
    institution_id_label: '',
    dialog : false,
    dialog_text: '',
    nid_or_passport_validity: true,
    blood_group_validity: true,
    date_of_birth_validity: true,
    religion_validity: true,

  }), 

  beforeCreate(){
      // this.institution_id_label = this.institution_id_label__;

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json' , 'charset':'utf-8'} ;

        this.$axios.post( this.$store.getters.modeladmin_options ,
        {
          purpose: 'get_form_field_rules'
        } , headers
        ).then(function(response){

          console.log(response);
          this.$store.commit('setform_field_rules' , response.data);
        }.bind(this))
        .catch(function(){
        //console.log(error);
      }.bind(this));



      },
      mounted(){


        this.$store.getters.getform_field_rules.forEach((item)=>{


          if(item.rule == 'mandatory'){
            switch(item.field_name) {
              case 'nid_or_passport_validity':
              this.nid_or_passport_validity = true;
              break;
              case 'blood_group_validity':
              this.blood_group_validity = true;
              break;
              case 'date_of_birth_validity':
              this.date_of_birth_validity = true;
              break;
              case 'religion_validity':
              this.religion_validity = true;
              break;
            }

          }else{

             switch(item.field_name) {
              case 'nid_or_passport_validity':
              this.nid_or_passport_validity = false;
              break;
              case 'blood_group_validity':
              this.blood_group_validity = false;
              break;
              case 'date_of_birth_validity':
              this.date_of_birth_validity = false;
              break;
              case 'religion_validity':
              this.religion_validity = false;
              break;
            }


          }


        })



      },
      methods: {
        changeValue(field_name , rule){
        // alert('changed');
        // console.log(this.nid_or_passport);


        // alert(name + value);

        var headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'} ;

          this.$axios.post( this.$store.getters.modeladmin_options ,
          {
            purpose: 'set_form_field_rules',
            field_name: field_name,
            rule: rule,

          } , headers
          ).then(function(response){
            console.log(response);
          }.bind(this))
          .catch(function(){

          }.bind(this));
        },

      }
    }
  </script>

