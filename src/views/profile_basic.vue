<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >
					
					<v-form
					ref="form"
					v-model="valid"
					:lazy-validation="lazy"
					v-on:submit.prevent
					>

					<slot name="verification_alert"></slot>
					<slot name="email_verification_alert"></slot>
					

					<v-text-field					
					label="First Name"
					type="text"
					v-model='first_name'
					:rules="[ v => !!v || 'required' ]"
					></v-text-field>

					<v-text-field					
					label="Last Name"
					type="text"
					v-model='last_name'
					:rules="[ v => !!v || 'required' ]"
					></v-text-field>


					<v-text-field					
					label="Bangla Name"
					type="text"
					v-model='name_bangla'
					></v-text-field>


					<v-text-field
					v-model="institution_id"
					:label="this.$store.getters.getIInstitution_id_label"
					type="text"
					:rules="[ v => !!v || 'required' ]"
					></v-text-field>


					<v-text-field
					v-model="mobile"
					label="Mobile"
					type="text"
					:rules="[ 
					v => !!v || 'required',
					v => /[+]{0,1}[\d]{11,}/g.test(v) || 'invalide quantity'
					]"
					></v-text-field>

					<v-text-field
					v-model="nid_or_passport"

					label="nid_or_passport"
					type="text"
					:rules="[ v => !!v || 'required' ]"
					></v-text-field> 

					<v-select
					v-model = "blood_group"
					:items="items"
					label="Blood Group"
					:rules="[ v => !!v || 'required' ]"
					></v-select>

					<v-select
					v-model = "religion"
					:items="items_religion"
					label="Religion"
					:rules="[ v => !!v || 'required' ]"
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

				>
				Update
			</v-btn>

			<slot name="buttons"></slot>


		</v-form>
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



		first_name: '',
		last_name: '',
		name_bangla: '',
		religion: 'Islam',


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
		

		lazy: true,
		valid: true,

		registratrion_status: 'default',
		loading: true,
		items: ['select' , 'A+' , 'B+' , 'AB+' , 'O+' , 'A-' , 'B-' , 'AB-' , 'O-'],
		items_religion: ['Islam' , 'Hinduism' , 'Christianity ' , 'Buddhism' , 'Nonreligious' , 'Others'],
		form_items:['first_name_validity' , 'last_name_validity' ]
	}), 
	created(){


// this.setAllInfo();
// this.full_name = this.$store.getters.getAllInfo.full_name;


this.$store.getters.getAllInfo.date_of_birth.toString() == "0000-00-00" ? this.date_of_birth = '1949-08-02' : this.date_of_birth = this.$store.getters.getAllInfo.date_of_birth.toString(); 



this.full_name = this.$store.getters.getAllInfo.full_name;



this.first_name = this.$store.getters.getAllInfo.first_name;
this.last_name = this.$store.getters.getAllInfo.last_name;
this.name_bangla = this.$store.getters.getAllInfo.name_bangla;
this.religion = this.$store.getters.getAllInfo.religion;


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

/*
this.$store.getters.getform_field_rules.forEach((item)=>{


	if(item.rule == 'optional'){
		switch(item.field_name) {
			case 'nid_or_passport_validity':
			this.nid_or_passport_validity = 'valid';
			break;
			case 'blood_group_validity':
			this.blood_group_validity = 'valid';
			break;
			case 'date_of_birth_validity':
			this.date_of_birth_validity = 'valid';
			break;
			case 'religion_validity':
			this.religion_validity = 'valid';
			break;
		}

	}})
	*/



	if( this.$refs.form.validate() ){


		var headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json' , 'charset':'utf-8'} ;

			this.$axios.post( this.$store.getters.modelProfile_basic ,
			{
				id: this.$store.getters.getAllInfo.id ,
				email: this.$store.getters.getAllInfo.email ,
				purpose: 'basic',
				first_name: this.first_name,
				last_name: this.last_name,
				name_bangla: this.name_bangla,
				mobile: this.mobile,
				institution_id: this.institution_id,
				nid_or_passport: this.nid_or_passport,
				blood_group: this.blood_group,
				religion: this.religion,
				dob: this.date_of_birth,
			} , headers
			).then(function(response){

				console.log(response);
				this.type == 'admin' ? this.status_text = 'Updated, Thank You' : this.status_text = 'Update requested successfully! wait for admin approval';
				this.dialog = true;


				this.$store.getters.getAllInfo.full_name = this.full_name;


				this.$store.getters.getAllInfo.first_name = this.first_name;
				this.$store.getters.getAllInfo.last_name = this.last_name;
				this.$store.getters.getAllInfo.name_bangla = this.name_bangla;
				this.$store.getters.getAllInfo.religion = this.religion;


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
}


}



</script>
