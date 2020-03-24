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
					<h3> Dear User, We are glad you are here, please register </h3>


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
					v-model="institution_id"
					:label="$store.getters.getIInstitution_id_label"
					type="text"
					:rules="[ v => !!v || 'required' ]"
					></v-text-field>


					<v-text-field
					v-model="mobile"
					label="Mobile"
					type="text"
					:rules="[ 
					v => !!v || 'required',
					v => /[+]{0,1}[\d]{11,}/g.test(v) || 'invalide format'
					]"
					></v-text-field>

					<v-text-field
					v-model="email"
					label="Email"
					type="text"
					:rules="[ 
					v => !!v || 'required',
					v => /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g.test(v) || 'invalide format'
					]"
					></v-text-field>

					<v-text-field
					v-model="password"
					type="password"
					label="password"
					:rules="[ v => !!v || 'required' ]"
					></v-text-field>

					<v-btn 
					
					color="success"
					class="my-4"
					@click="submit()"
					:loading="loading"
					>
					Register
				</v-btn>
				
				<br>

			</v-form>
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


export default {
	name: 'registration',


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
	}), 


	methods: {
		submit(){


			this.loading = true;
			if(this.$refs.form.validate()){
				// alert('valid');
				var headers = {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'} ;
					this.$axios.post(this.$store.getters.modelRegistration, {
						first_name: this.first_name,
						last_name: this.last_name,
						institution_id: this.institution_id,
						email: this.email,
						mobile: this.mobile,
						password: this.password,
						who_is_doing_registration: 'user',
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

			this.$store.commit('loginFalse');
			this.$store.commit('adminFalse');
			this.$cookies.set('email', '');
			this.$cookies.set('crypto', '');

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
