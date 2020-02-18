<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >


					<slot name="verification_alert"></slot>

					<v-text-field

					label="Name"
					type="text"
					v-model="full_name"
					:error-messages="validityCheckInput('full_name')"

					></v-text-field>


					<v-text-field
					v-model="institution_id"

					:label="this.$store.getters.getIInstitution_id_label"
					type="text"
					:error-messages="validityCheckInput('institution_id')"
					></v-text-field>


					<v-text-field
					v-model="mobile"

					label="Mobile"
					type="text"
					:error-messages="validityCheckInput('mobile')"
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
						<v-text-field
						v-model="date_of_birth"
						label="Picker in menu"
						readonly
						v-on="on"
						:error-messages="onChangeValidity('date_of_birth')"
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

				>
				Update
			</v-btn>

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
		date_of_birth: new Date().toISOString().substr(0, 10),
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
		loading: true,
		items: ['select' , 'A+' , 'B+' , 'AB+' , 'O+' , 'A-' , 'B-' , 'AB-' , 'O-']
	}), 

	created(){

// this.setAllInfo();
// this.full_name = this.$store.getters.getAllInfo.full_name;


this.$store.getters.getAllInfo.date_of_birth.toString() == "0000-00-00" ? this.date_of_birth = '1949-08-02' : this.date_of_birth = this.$store.getters.getAllInfo.date_of_birth.toString(); 






this.full_name = this.$store.getters.getAllInfo.full_name;
this.institution_id = this.$store.getters.getAllInfo.institution_id;
this.mobile = this.$store.getters.getAllInfo.mobile;
this.nid_or_passport = this.$store.getters.getAllInfo.nid_or_passport;
this.blood_group = this.$store.getters.getAllInfo.blood_group;



// this.date_of_birth = new Date(this.$store.getters.getAllInfo.date_of_birth);

// alert(this.$store.getters.getAllInfo.date_of_birth);

},
methods: {  
	submit(){
// alert(this.blood_group);
// console.log(this.$store.getters.getAllInfo.email);

//alert(this.blood_group);
this.validityCheckInput('full_name');
this.validityCheckInput('mobile');
this.validityCheckInput('institution_id');
this.validityCheckInput('nid_or_passport');
this.onChangeValidity('blood_group');
this.onChangeValidity('date_of_birth');


if(this.full_name_validity == 'valid' && this.mobile_validity == 'valid' && this.institution_id_validity == 'valid' && this.nid_or_passport_validity == 'valid' && this.blood_group_validity == 'valid' && this.dob_validity == 'valid' ){


	var headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept': 'application/json'} ;

		this.$axios.post( this.$store.getters.modelProfile_basic ,
		{
			id: this.$store.getters.getAllInfo.id ,
			email: this.$store.getters.getAllInfo.email ,
			purpose: 'basic',
			full_name: this.full_name,
			mobile: this.mobile,
			institution_id: this.institution_id,
			nid_or_passport: this.nid_or_passport,
			blood_group: this.blood_group,
			dob: this.date_of_birth,
		} , headers
		).then(function(result){

			console.log(result);
			this.type == 'admin' ? this.status_text = 'Updated, Thank You' : this.status_text = 'Update requested successfully! wait for admin approval';
			this.dialog = true;



			this.$store.getters.getAllInfo.full_name = this.full_name;
			this.$store.getters.getAllInfo.mobile = this.mobile;
			this.$store.getters.getAllInfo.institution_id = this.institution_id;
			this.$store.getters.getAllInfo.nid_or_passport = this.nid_or_passport;
			this.$store.getters.getAllInfo.blood_group = this.blood_group;
			this.$store.getters.getAllInfo.date_of_birth = this.date_of_birth;



		}.bind(this))
		.catch(function(){
//console.log(error);
}.bind(this));

	}else{
		this.status_text = 'all field are not valid';
		this.dialog = true;

	}

},

/*getData(){
console.log( this.$store.getters.getAllInfo);

},*/
onChangeValidity(inputName){

	if(inputName == 'blood_group'){

		const errors = [];

		let patt= /[+-A-O]{1,3}/g;
		let result = patt.test(this.blood_group);

		result == false ? ( this.blood_group_validity = 'invalid' , errors.push('DOB is Not Valid') )   : this.blood_group_validity = 'valid';

		return errors;

	}else if(inputName == 'date_of_birth'){

		const errors = [];
		let patt= /^([0-9]{4})([-]{1}[0-9]{2}[-]{1}[0-9]{2}$)/igm;
		let result = patt.test(this.date_of_birth);

		patt = /^([0-9]{4})/g;
		const matches = this.date_of_birth.match(patt);



		if(result == true && matches[0]>1950 && matches[0] <2000){
			this.dob_validity = 'valid';
		}else{
			this.dob_validity = 'invalid';
			errors.push('DOB is Not Valid')
		}

		return errors;

//result == false ? this.dob_validity = 'invalid' : this.dob_validity = 'valid';
}
},
validityCheckInput( inputName  ){

	if(inputName == 'full_name'){
		const errors = [];
		let patt= /[A-Za-z.\s]{5,}/g;
		let result = patt.test(this.full_name);

		result == false ? ( this.full_name_validity = 'invalid' , errors.push('Name is Not Valid') ) : this.full_name_validity = 'valid';

		return errors;

	}else if(inputName == 'mobile'){

		const errors = [];
		let patt= /[+]{0,1}[\d]{11,}/g;
		let result = patt.test(this.mobile);

		result == false ? ( this.mobile_validity = 'invalid' , errors.push('Name is Not Valid') ) : this.mobile_validity = 'valid';

		return errors;

	}else if(inputName == 'institution_id'){

		const errors = [];
		let patt= /[\S]{5,}/g;
		let result = patt.test(this.institution_id);

		result == false ? ( this.institution_id_validity = 'invalid' , errors.push('Name is Not Valid') ) : this.institution_id_validity = 'valid';

		return errors;


	}else if(inputName == 'nid_or_passport'){

		const errors = [];
		let patt= /[\S]{10,}/g;
		let result = patt.test(this.nid_or_passport);

		result == false ? ( this.nid_or_passport_validity = 'invalid' , errors.push('Name is Not Valid') ) : this.nid_or_passport_validity = 'valid';

		return errors;

	}
}
}


}



</script>
