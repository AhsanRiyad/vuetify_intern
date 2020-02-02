<template>
	
	<div>

		<v-container class="cyan lighten-2">
			<v-row justify="center">
				<v-col cols="auto" v-for="n in numbers1" :key="n">
					
					
					<v-btn :color="color" 
					:class=" items[n].name == $store.getters.getComponentName ? (color = 'secondary' , disabled = true ) : (color =  'primary' , disabled = false ) "
					:disabled="disabled" @click="changeComponent(items[n].name)"
					> {{items[n].title }} </v-btn>
					

				</v-col>
			</v-row>


			<v-row justify="center">
				<v-col cols="auto" v-for="n in numbers2" :key="n">

					<v-btn class="px-4" :color="color" 
					:class=" items[n].name == $store.getters.getComponentName ? (color = 'secondary' , disabled = true ) : (color =  'primary' , disabled = false ) "
					:disabled="disabled" @click="changeComponent(items[n].name)"> {{items[n].title }} </v-btn>
					

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
			disabled: false,
			component_name: 'personal',
			items: [
			{ title: 'BASIC', name: 'profile_basic' },
			{ title: 'PERSONAL',  name: 'profile_personal'  },
			{ title: 'ADDRESS',  name: 'profile_address'  },
			{ title: 'PHOTO',  name: 'profile_photo'  },
			{ title: 'CHANGE EMAIL',  name: 'profile_change_email'  },
			{ title: 'CHANGE PASSWORD',  name: 'profile_change_password'  },
			],
		}
		
	},
	methods: {
		changeColor(){
			console.log('change color');
		},
		changeComponent(name){
			this.$store.commit('setComponentName' , name);
		}
	}

}

</script>
