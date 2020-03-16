<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >


					<noInternetSnackBar ref="snackbar" ></noInternetSnackBar>


					<slot name="verification_alert"></slot>
					<slot name="email_verification_alert"></slot>
					
					<div 
					v-for="( item ) in items_form_field"
					:key="item.field_name"	
					>



					
					<v-menu
					ref="menu"
					v-model="menu"
					:close-on-content-click="false"
					:return-value.sync="date"
					transition="scale-transition"
					offset-y
					min-width="290px"
					v-if="item.field_name == 'date_of_birth' "
					>
					<template v-slot:activator="{ on }">
						<v-text-field
						v-model="date"
						:label="item.alias_field_name"
						readonly
						v-on="on"
						:ref="item.field_name"
						@change="updateData_profile( item.field_name , item.index_number )"
						></v-text-field>
					</template>
					<v-date-picker v-model="date" no-title scrollable>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
						<v-btn text color="primary" 
						@click="saveDate(date) , updateData_profile( item.field_name , item.index_number )"

						>OK</v-btn>
					</v-date-picker>
				</v-menu>







				<v-select
				v-else-if=" item.field_name == 'gender' || item.field_name == 'blood_group'  || item.field_name == 'religion' "
				v-model = "item.field_value"
				:rules=" field_rules_prop(  item.field_name , item.index_number  ) "
				@change="updateData_profile( item.field_name , item.index_number , item.field_value )"
				:ref = 'item.field_name'
				:items="item.field_name == 'gender' ? item_gender :  item.field_name == 'blood_group' ? item_blood_group : item.field_name == 'religion' ? item_religion : [] "
				:label="item.alias_field_name"
				></v-select>


				<v-text-field
				v-else
				:label="item.alias_field_name"
				v-model="item.field_value"
				:rules=" field_rules_prop(  item.field_name , item.index_number  ) "
				@change="updateData_profile( item.field_name , item.index_number )"
				:ref = 'item.field_name'
				:id="item.field_name"
				:disabled=" item.field_name == 'email' || item.field_name == 'status' || item.field_name == 'type' || item.field_name == 'change_request' "
				>
			</v-text-field>
			
		</div>


		<buttons_for_profile></buttons_for_profile>
<!-- 
<v-btn @click="getData()"
color="success"
class="mr-4"
>
getData
</v-btn> -->


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
import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'

import noInternetSnackBar from '@/views/noInternetSnackBar'
import buttons_for_profile from '@/views/buttons_for_profile.vue'


export default {
	name: 'base_form',
	props: [ 'items_form_field' , 'email' ],
	mixins: [ profile_info_and_privacy_Mixins ] ,
	components: {
		'noInternetSnackBar': noInternetSnackBar,
		'buttons_for_profile': buttons_for_profile, 
	},

	data: ()=>({}), 
	methods: {
		saveDate(date){

			console.log(this.$refs);
			console.log(date);

			this.$refs.menu[0].save(date);



		}
	},

	created(){

		console.log(this.$refs);

	}

}

</script>
