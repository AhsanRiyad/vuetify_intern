<template>
	<div>
		<v-container class="cyan lighten-2">


			<v-row justify="center">

				
					<v-col cols="12">
						
					<v-btn  v-if="$store.getters.getAllInfo.email_verification_status != 'verified'"  block class="px-4 white--text" @click="changeComponent('profile_verify_email' , 'Profile Verify Email')" color="red" 
					> Verify Email </v-btn>
					
				


					</v-col>

				<v-col cols="auto" v-for="n in numbers1" :key="n">
					

					


					<v-btn
					:disabled="disabled" :color=" items[n].name == $store.getters.getComponentName ? (color2 ) : color " @click="changeComponent(items[n].name , items[n].title)"
					> {{items[n].title }} </v-btn>
					
				</v-col>
			</v-row>

			<v-row justify="center">
				<v-col cols="auto" v-for="n in numbers2" :key="n">

					<v-btn class="px-4"  :disabled="disabled" :color=" items[n].name == $store.getters.getComponentName ? (color2 ) : color " @click="changeComponent(items[n].name , items[n].title)" 
					> {{items[n].title }} </v-btn>
					
				</v-col>
			</v-row>	
		</v-container>

	</div>

</template>

<script>
// @ is an alias to /src
export default {
	name: 'buttons_for_profile',
	data(){
		return {
			numbers1: [0,1,2],
			numbers2: [3,4,5],
			color: 'primary',
			color2: 'secondary',
			disabled: false,
			component_name: 'personal',
			items: [
			{ title: 'BASIC', name: 'profile_basic' , color: 'primary' },
			{ title: 'PERSONAL', name: 'profile_personal' , color: 'primary' },
			{ title: 'ADDRESS', name: 'profile_address' , color: 'primary' },
			{ title: 'PHOTO', name: 'profile_photo_upload' , color: 'primary' },
			{ title: 'CHANGE EMAIL', name: 'profile_change_email' , color: 'primary' },
			{ title: 'CHANGE PASSWORD', name: 'profile_change_password' , color: 'primary' },
			],
		}
		
	},
	methods: {
		changeColor(){
			console.log('change color');
		},
		changeComponent(name , title){

			// console.log('button clicked');
			this.$store.commit('setComponentName' , name);
			this.$store.commit('setPageTitle' , title);
			


		}
	}

}

</script>
