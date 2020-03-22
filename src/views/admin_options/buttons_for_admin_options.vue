<template>
	<div>
		<v-container class="cyan lighten-2">
			<v-row justify="center">
				<v-col cols="auto" v-for="n in numbers1" :key="n">
					
					<v-btn
					:disabled="disabled" :color=" items[n].name == $store.getters.getComponentNameAdminOptions ? (color2 ) : color " @click="changeComponent(items[n].name , items[n].title)"
					> {{items[n].title }} </v-btn>
					
				</v-col>

				<v-col cols="auto" >
					
					<v-btn :loading="loading" color="primary" @click="export_user_data" > Export User Data </v-btn>

					
					
				</v-col>

				

			</v-row>

		</v-container>

	</div>

</template>

<script>
// @ is an alias to /src

import fileDownload from 'js-file-download'

import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'

export default {
	name: 'buttons_for_admin_options',
	mixins: [ profile_info_and_privacy_Mixins  ],
	data(){
		return {
			numbers1: [0,1],
			numbers2: [3,4,5],
			color: 'primary',
			color2: 'secondary',
			disabled: false,
			component_name: 'institution_id_label',
			items: [
			{ title: 'INSTITUTION ID LABEL', name: 'institution_id_label' , color: 'primary' },
			{ title: 'IMPORT', name: 'import_user_data' , color: 'primary' }
			],
		}
		
	},
	methods: {
		changeColor(){
			console.log('change color');
		},
		changeComponent(name , title){

			// console.log('button clicked');
			this.$store.commit('setinstitution_id_labelComponent' , name);
			this.$store.commit('setPageTitle' , title);
			


		},
		export_user_data(){
			console.log('export user data');
			this.loading = true;
			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json' } ;

				this.$axios.post( this.$store.getters.getModelAddress_laravel+'export_user_data' ,
				{

				} , headers
				).then(function(response){

					this.loading = false;

					console.log(response);
					fileDownload( JSON.stringify( response.data )  , 'data.json' );


				}.bind(this))
				.catch(function(){
					this.loading = false;

// this.$refs.snackbar.startSnackBar();

//
}.bind(this));



			}
		}

	}

</script>
