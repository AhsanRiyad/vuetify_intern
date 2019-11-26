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
					@keyup="onChangeValidity('email')"
					></v-text-field>

					<v-text-field
					v-model="password"
					type="password"
					label="password"
					
					></v-text-field>

					<v-btn
					
					color="success"
					class="mr-4"
					@click="submit"
					>
					Login
				</v-btn>


			</v-col>
		</v-row>
	</v-container>	
</v-app>

</template>

<script>
// @ is an alias to /src


export default {
	name: 'Login',


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
			if(inputName == 'email'){

				var patt_email= /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g;
				var result_email = patt_email.test(this.email);

				result_email == false ? this.email_validity = 'invalid' : this.email_validity = 'valid';

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
			this.$axios.post( 'http://jsonplaceholder.typicode.com/posts' , {
				title: 'Notebook',
				body: '',
				userId: 1
				
			})
			.then( function(){
				
				// console.log(response);

			}.bind(this))
			.catch(function () {

			}.bind(this)); 

		},
	},
}



</script>
