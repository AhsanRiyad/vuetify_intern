<template>
	<v-app>
		<v-container class="">
			<v-row>
				<v-col cols="8" xl="4">
					
					<v-text-field
					
					label="Email"
					type="text"
					
					></v-text-field>

					<v-text-field
					
					type="password"
					label="password"
					
					></v-text-field>

					<v-btn
					
					color="success"
					class="mr-4"
					
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
		name: 'riyad',
		valid: true,
		name: '',
		nameRules: [
		v => !!v || 'Name is required',
		v => (v && v.length <= 10) || 'Name must be less than 10 characters',
		],
		email: '',
		emailRules: [
		v => !!v || 'E-mail is required',
		v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		select: null,
		checkbox: false,


	}), 

	methods: {
		submit(){
			this.$axios.post( 'http://jsonplaceholder.typicode.com/posts' , {
				title: 'Notebook',
				body: '',
				userId: 1
				
			})
			.then( function(response){
				
				console.log(response);

			}.bind(this))
			.catch(function (error) {

			}.bind(this)); 

		},



		validate () {
			if (this.$refs.form.validate()) {
				this.snackbar = true
			}
		},
		reset () {
			this.$refs.form.reset()
		},
		resetValidation () {
			this.$refs.form.resetValidation()
		},
	},
}



</script>
