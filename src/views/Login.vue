<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >
					
					<p v-bind:class="{ 'red--text': redText, 'green--text': greenText }">{{ email_validity }}</p>
					<v-text-field
					v-model="email"
					label="Email"
					type="text"
					:error-messages="onChangeValidity('email')"
					@keyup="onChangeValidity('email')"
					></v-text-field>

					<v-text-field
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

export default {
	name: 'login',


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
	}), 


	methods: {
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
			// console.log(this.email);
			// console.log(this.password); 
			this.loading = true;
			if(this.email_validity == 'valid' && this.password_validity == 'valid'){
			// alert('submitted');
			this.$axios.post( this.model.modelLogin , {
				email: this.email,  
				password: this.password
			})
			.then( function(response){
				this.loading = false;
					//window.location.href = 'http://google.com';

					// console.log(response);

					if(response.data == 'YES_USER' || response.data == 'YES_ADMIN'){

						// bus.$emit('login_status' , true);
						this.$store.commit('loginTrue');
						this.$router.push({ name: 'profile' }) ;
					}else{
						this.login_status = 'email/password doesnt match';  
					}




					this.dialog= true;
				}.bind(this))
			.catch(function () {
				this.loading = false;
                //return 'hi';
            }.bind(this)); 

		}else{
			this.login_status = 'invalid field detected';
			this.dialog = true;
			this.loading = false;			
		}
	},
},
created(){
		this.$store.commit('loginFalse');

}

}

</script>
