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
					<a v-bind:href="this.address.registrationPage" >
					<v-btn
					
					color="success"
					class="mr-4"
					>
					Registration
				</v-btn>
				</a>

				<v-btn
					color="success"
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
			if(inputName == 'email'){ var patt_email= /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g;
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
					console.log(response);
				response.data == 'YES_USER' || response.data == 'YES_ADMIN' ? window.location.href = this.address.registrationPage : this.login_status = 'email/password doesnt match';  

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
}

}

</script>
