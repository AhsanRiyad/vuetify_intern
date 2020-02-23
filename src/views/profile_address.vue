<template>
<v-app class="grey" > 
<v-container class="white" >
<v-row justify="center" align="center"> 
<v-col cols="8" xl="4" >

<slot name="verification_alert"></slot>
<slot name="email_verification_alert"></slot>


<v-text-field

label="Present Address Line 1"
type="text"
v-model="present_line1"

:error-messages="onChangeValidity('present_line1')"
></v-text-field>



<v-text-field

label="Present post office Name"
type="text"


v-model="present_post_office_name"

:error-messages="onChangeValidity('present_post_office_name')"
></v-text-field>



<v-text-field

label="Present post code"
type="text"


v-model="present_post_code"

:error-messages="onChangeValidity('present_post_code')"
></v-text-field>


<v-text-field

label="Present police station"
type="text"


v-model="present_police_station"

:error-messages="onChangeValidity('present_police_station')"
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

label="permanent Address Line 1"
type="text"


v-model="permanent_line1"

:error-messages="onChangeValidity('permanent_line1')"
></v-text-field>


<v-text-field

label="permanent post office Name"
type="text"


v-model="permanent_post_office_name"

:error-messages="onChangeValidity('permanent_post_office_name')"
></v-text-field>

<v-text-field

label="permanent post code"
type="text"


v-model="permanent_post_code"

:error-messages="onChangeValidity('permanent_post_code')"
></v-text-field>



<v-text-field

label="permanent police station"
type="text"


v-model="permanent_police_station"

:error-messages="onChangeValidity('permanent_police_station')"
></v-text-field>



<v-text-field

label="permanent district"
type="text"
v-model="permanent_district"

:error-messages="onChangeValidity('permanent_district')"
></v-text-field>



<v-text-field

label="permanent country"
type="text"


v-model="permanent_country"

:error-messages="onChangeValidity('permanent_country')"
></v-text-field>

<v-text-field

label="Second Citizenship Country"
type="text"


v-model="second_citizenship_country"

:error-messages="onChangeValidity('second_citizenship_country')"
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
name: 'profile_basic',
data: ()=>({
date_of_birth: '',
menu: false,
modal: false,
menu2: false,

present_post_office_name:'',
present_police_station: '',

permanent_post_office_name:'',
permanent_police_station: '',

second_citizenship_country:'' ,  

present_post_office_name_validity:'',
present_police_station_validity: '',

permanent_post_office_name_validity:'',
permanent_police_station_validity: '',

second_citizenship_country_validity:'' ,  

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
this.permanent_line1= this.$store.getters.getAllInfo.parmanent_line1;
this.permanent_district= this.$store.getters.getAllInfo.parmanent_district;
this.permanent_post_code= this.$store.getters.getAllInfo.parmanent_post_code;
this.permanent_country= this.$store.getters.getAllInfo.parmanent_country;





this.permanent_post_office_name=this.$store.getters.getAllInfo.parmanent_post_office_name;
this.permanent_police_station=this.$store.getters.getAllInfo.parmanent_police_station;
this.present_post_office_name=this.$store.getters.getAllInfo.present_post_office_name;
this.present_police_station=this.$store.getters.getAllInfo.present_police_station;
this.second_citizenship_country=this.$store.getters.getAllInfo.second_citizenship_country;






// this.date_of_birth = new Date(this.$store.getters.getAllInfo.date_of_birth);

// alert(this.$store.getters.getAllInfo.date_of_birth);

},
methods: {

submit(){




this.onChangeValidity('present_line1');
this.onChangeValidity('present_district');
this.onChangeValidity('present_post_code');
this.onChangeValidity('present_country');
this.onChangeValidity('permanent_line1');
this.onChangeValidity('permanent_district');
this.onChangeValidity('permanent_post_code');
this.onChangeValidity('permanent_country');


this.onChangeValidity('present_post_office_name');
this.onChangeValidity('present_police_station');
this.onChangeValidity('permanent_post_office_name');
this.onChangeValidity('permanent_police_station');
this.onChangeValidity('second_citizenship_country');


if(this.present_line1_validity == 'valid' && this.present_district_validity == 'valid' && this.present_country_validity == 'valid' && this.present_post_code_validity == 'valid' &&  this.permanent_line1_validity == 'valid' &&  this.permanent_district_validity == 'valid' &&  this.permanent_country_validity == 'valid' &&  this.permanent_post_code_validity == 'valid' ){

var headers = {
'Content-Type': 'application/x-www-form-urlencoded',
'Accept': 'application/json'} ;


this.$axios.post( this.$store.getters.modelProfile_address ,
{
purpose: 'address1',
id: this.$store.getters.getAllInfo.id ,
email: this.$store.getters.getAllInfo.email ,
present_line1: this.present_line1,
present_district: this.present_district,
present_post_code: this.present_post_code,
present_country: this.present_country,
permanent_line1: this.permanent_line1,
permanent_district: this.permanent_district,
permanent_post_code: this.permanent_post_code,
permanent_country: this.permanent_country,


permanent_post_office_name:this.permanent_post_office_name,
permanent_police_station:this.permanent_police_station,
present_post_office_name:this.present_post_office_name,
present_police_station:this.present_police_station,
second_citizenship_country:this.second_citizenship_country,



} , headers
).then(function(response){


console.log(response);

this.type == 'admin' ? this.status_text = 'Updated, Thank You' : this.status_text = 'Update requested successfully! wait for admin approval';
this.dialog = true;


this.$store.getters.getAllInfo.present_line1=this.present_line1;
this.$store.getters.getAllInfo.present_district=this.present_district;
this.$store.getters.getAllInfo.present_post_code=this.present_post_code;
this.$store.getters.getAllInfo.present_country=this.present_country;
this.$store.getters.getAllInfo.parmanent_line1=this.permanent_line1;
this.$store.getters.getAllInfo.parmanent_district=this.permanent_district;
this.$store.getters.getAllInfo.parmanent_post_code=this.permanent_post_code;
this.$store.getters.getAllInfo.parmanent_country=this.permanent_country;


this.$store.getters.getAllInfo.parmanent_post_office_name=this.permanent_post_office_name;
this.$store.getters.getAllInfo.parmanent_police_station=this.permanent_police_station;
this.$store.getters.getAllInfo.present_post_office_name=this.present_post_office_name;
this.$store.getters.getAllInfo.present_police_station=this.present_police_station;
this.$store.getters.getAllInfo.second_citizenship_country=this.second_citizenship_country;

}.bind(this))
.catch(function(){
}.bind(this));
this.status_text = 'all fields are valid';
this.dialog = true;
}else {
this.status_text = 'all fields are not valid';
this.dialog = true;
}

},


onChangeValidity(inputName){

if(inputName == 'present_line1'){


const errors = [];

let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.present_line1);

result == false ? ( this.present_line1_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.present_line1_validity = 'valid';


return errors;




}else if(inputName == 'present_district'){
//console.log(this.present_district);


const errors = [];
let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.present_district);
result == false ? ( this.present_district_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.present_district_validity = 'valid';


return errors;



}else if(inputName == 'present_country'){
//console.log(this.present_country);

const errors = [];
let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.present_country);
result == false ? ( this.present_country_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.present_country_validity = 'valid';


return errors;


}else if(inputName == 'present_post_code'){
//console.log(this.present_post_code);


const errors = [];
let patt= /[+]{0,1}[\d]{4,}/g;
let result = patt.test(this.present_post_code);
result == false ? ( this.present_post_code_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.present_post_code_validity = 'valid';


return errors;


}else if(inputName == 'permanent_line1'){


const errors = [];

let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.permanent_line1);

result == false ? ( this.permanent_line1_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.permanent_line1_validity = 'valid';


return errors;




}else if(inputName == 'permanent_police_station'){


const errors = [];

let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.permanent_police_station);

result == false ? ( this.permanent_police_station_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.permanent_police_station_validity = 'valid';


return errors;




}else if(inputName == 'present_police_station'){


const errors = [];

let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.present_police_station);

result == false ? ( this.present_police_station_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.present_police_station_validity = 'valid';


return errors;




}else if(inputName == 'permanent_district'){
//console.log(this.permanent_district);


const errors = [];
let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.permanent_district);
result == false ? ( this.permanent_district_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.permanent_district_validity = 'valid';


return errors;



}else if(inputName == 'permanent_country'){
//console.log(this.permanent_country);

const errors = [];
let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.permanent_country);
result == false ? ( this.permanent_country_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.permanent_country_validity = 'valid';


return errors;


}else if(inputName == 'permanent_post_office_name'){
//console.log(this.permanent_post_office_name);


const errors = [];
let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.permanent_post_office_name);
result == false ? ( this.permanent_post_office_name_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.permanent_post_office_name_validity = 'valid';


return errors;


}else if(inputName == 'present_post_office_name'){
//console.log(this.present_post_office_name);


const errors = [];
let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.present_post_office_name);
result == false ? ( this.present_post_office_name_validity = 'invalid' , errors.push('name is Not Valid' )) : this.present_post_office_name_validity = 'valid';


return errors;


}else if(inputName == 'permanent_post_code'){
//console.log(this.permanent_post_code);


const errors = [];
let patt= /[+]{0,1}[\d]{4,}/g;
let result = patt.test(this.permanent_post_code);
result == false ? ( this.permanent_post_code_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.permanent_post_code_validity = 'valid';


return errors;


}else if(inputName == 'second_citizenship_country'){
//console.log(this.second_citizenship_country);


const errors = [];
let patt= /[A-Za-z.\S]{5,}/g;
let result = patt.test(this.second_citizenship_country);
result == false ? ( this.second_citizenship_country_validity = 'invalid' , errors.push('Fathers name is Not Valid' )) : this.second_citizenship_country_validity = 'valid';


return errors;


}
}
},
}

</script>
