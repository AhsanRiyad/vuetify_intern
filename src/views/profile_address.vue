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

label="Present Address Line 1"
type="text"
v-model="present_line1"
:rules="[ v => !!v || 'required' ]"
></v-text-field>



<v-text-field

label="Present post office Name"
type="text"


v-model="present_post_office_name"

:rules="[ v => !!v || 'required' ]"
></v-text-field>



<v-text-field

label="Present post code"
type="text"


v-model="present_post_code"
:rules="[ v => !!v || 'required' ]"
></v-text-field>


<v-text-field

label="Present police station"
type="text"


v-model="present_police_station"
:rules="[ v => !!v || 'required' ]"
></v-text-field>


<v-text-field

label="Present district"
type="text"


v-model="present_district"

:rules="[ v => !!v || 'required' ]"
></v-text-field>



<v-text-field

label="Present country"
type="text"


v-model="present_country"

:rules="[ v => !!v || 'required' ]"
></v-text-field>



<v-text-field

label="permanent Address Line 1"
type="text"


v-model="permanent_line1"

:rules="[ v => !!v || 'required' ]"
></v-text-field>


<v-text-field

label="permanent post office Name"
type="text"


v-model="permanent_post_office_name"

:rules="[ v => !!v || 'required' ]"
></v-text-field>

<v-text-field

label="permanent post code"
type="text"


v-model="permanent_post_code"
:rules="[ v => !!v || 'required' ]"
></v-text-field>



<v-text-field

label="permanent police station"
type="text"


v-model="permanent_police_station"
:rules="[ v => !!v || 'required' ]"
></v-text-field>



<v-text-field

label="permanent district"
type="text"
v-model="permanent_district"
:rules="[ v => !!v || 'required' ]"
></v-text-field>



<v-text-field

label="permanent country"
type="text"


v-model="permanent_country"

:rules="[ v => !!v || 'required' ]"
></v-text-field>

<v-text-field

label="Second Citizenship Country"
type="text"


v-model="second_citizenship_country"
:rules="[ v => !!v || 'required' ]"
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

</v-form>
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

valid: true, 
lazy: true, 


name: 'riyad---vue',
dialog: false,
status_text: '' ,

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





if( this.$refs.form.validate() ){

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


},
}

</script>
