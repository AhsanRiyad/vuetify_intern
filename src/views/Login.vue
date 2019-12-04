<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >
					
					<p v-bind:class="{ 'red--text': redText, 'green--text': greenText }">{{ email_validity }}</p>
					<v-text-field
					@keyup.enter="submit()"
					v-model="email"
					label="Email"
					type="text"
					:error-messages="onChangeValidity('email')"
					@change="getUserDetails()"
					></v-text-field>

					<v-text-field
					@keyup.enter="submit()"
					v-model="password"
					type="password"
					label="password"
					@keyup="onChangeValidity('password')"
					
					></v-text-field>

					<v-btn
					color="success"
					class="mr-4"
					@click="submit()"
					:loading="loading"
					>
					Login
				</v-btn>

				<v-btn
				router :to="{ name : 'registration' }"
				color="success"
				class="mr-4"
				>
				Registration
			</v-btn>

			<router-link :to="{ name : 'profile_forgot_password' }">
				<v-btn 
				color="success"
				class="mr-4"
				>
				Forgot Password
			</v-btn>
		</router-link>


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
			{{ login_status }}
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
// import { bus } from '@/main'
import cookie_mixins from '@/mixins/cookie_mixins'
const md5 = require('crypto-js/md5');
export default {
	name: 'login',

	mixins: [cookie_mixins],
	data: ()=>({
		loading: false,
		dialog: false,
		status_text: '',
		email: '',
		password: '',
		email_validity: '',
		password_validity: '',
		login_status: '',
		greenText: false,
		redText: false,
		date : new Date(),
		expires: '',
	}), 


	methods: {
		getUserDetails(){
			//this.expires = this.date.setTime(this.date.getTime() + 7*24*60*60*1000).toGMTString();
			this.$axios.post( this.$store.getters.modelProfile_basic , {
				purpose : 'getProfileBasicInfo',
				email: this.email , 
			})
			.then( function(response){

				console.log(response);

				if(response.data !=0){
					this.$store.commit('set_user_info' , response.data);
				}

					// this.$store.commit('set_user_info' , response.data);
						//this.$store.commit('loginTrue');

						// this.$router.push({ name: 'profile' }) ;

					}.bind(this))
			.catch(function () {

			}.bind(this));

		},
		onChangeValidity(inputName){
			if(inputName == 'email'){ var patt_email= /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g;
			var result_email = patt_email.test(this.email);

			if(!result_email){
				let errors = [];
				errors.push('email error');
				this.email_validity = 'invalid'
				return errors;
			}else{
				this.email_validity = 'valid';
			}
			if(result_email== false){
				this.redText = true;
				this.greenText = false;
			}else{
				this.greenText = true;
				this.redText = false;
			}

		}else if(inputName == 'password'){
			var patt= /[\S]{6,}/g;
			var result = patt.test(this.password);
			result == false ? this.password_validity = 'invalid' : this.password_validity = 'valid';
		}
	},
	submit(){
		this.loading = true;
		if(this.email_validity == 'valid' && this.password_validity == 'valid'){
			if(md5(this.password) == this.$store.getters.getAllInfo.password){
				
				this.setCookie('email' , this.email , 7);
				this.setCookie('crypto' , this.$store.getters.getAllInfo.forgot_password_crypto , 7);



				this.loading = false;
				this.$router.push({ name: 'profile' }) ;
			}else{
				this.loading = false;
				this.login_status = 'email/password doesnt match';  
			}
		}else{
			this.login_status = 'invalid field detected';
			this.dialog = true;
			this.loading = false; 
		}
	}
},
created(){
	this.setCookie('email' , '' , -7);
	this.setCookie('crypto' , '' , - 7);
}
}
</script>
