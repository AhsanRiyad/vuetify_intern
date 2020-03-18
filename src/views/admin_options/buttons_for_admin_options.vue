<template>
	<div>
		<v-container class="cyan lighten-2">
			<v-row justify="center">
				<v-col cols="auto" v-for="n in numbers1" :key="n">
					
					<v-btn
					:disabled="disabled" :color=" items[n].name == $store.getters.getComponentNameAdminOptions ? (color2 ) : color " @click="changeComponent(items[n].name , items[n].title)"
					> {{items[n].title }} </v-btn>
					
				</v-col>

				

			</v-row>

		</v-container>

	</div>

</template>

<script>
// @ is an alias to /src
export default {
	name: 'buttons_for_admin_options',
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
			{ title: 'FORM FIELD RULE', name: 'form_field_rules' , color: 'primary' }
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
			


		}
	}

}

</script>
