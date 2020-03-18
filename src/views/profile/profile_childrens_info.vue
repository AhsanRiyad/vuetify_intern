<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >
					
					<!-- <h1>hellow</h1> -->

					<noInternetSnackBar ref="snackbar" ></noInternetSnackBar>


					<slot name="verification_alert"></slot>
					<slot name="email_verification_alert"></slot>
					
					<div 
					v-for="( item ) in items_form_field"
					:key="item.field_name"	
					>

					<!-- form starts -->
					<v-form
					ref="form"
					v-model="valid"
					:lazy-validation="lazy"
					v-on:submit.prevent
					>


					<v-menu
					ref="menu"
					v-model="item.date_picker_menu"
					:close-on-content-click="false"
					:return-value.sync="date"
					transition="scale-transition"
					offset-y
					min-width="290px"
					
					>
					<template v-slot:activator="{ on }">
						<v-text-field
						v-model="item.field_value_date_of_birth"
						:label="item.alias_field_name_date_of_birth"
						readonly
						v-on="on"
						></v-text-field>
					</template>
					<v-date-picker v-model="date" no-title scrollable>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
						<v-btn text color="primary" 
						@click="saveDate(date)"

						>OK</v-btn>
					</v-date-picker>
				</v-menu>

				<v-select
				v-model = "item.field_value_date_of_birth"
				:rules=" field_rules_prop(  item.field_name , item.index_number  ) "
				:items="item_gender"
				:label="item.alias_field_name_gender"
				></v-select>


				<v-text-field
				:label="item.alias_field_name_name"
				v-model="item.field_value_name"
				:rules=" field_rules_prop(  item.field_name , item.index_number  ) "				
				>
			</v-text-field>

			<v-btn color="success" class="mr-3 mb-3">
				Update
			</v-btn>
			<v-btn color="error" class="mr-3 mb-3">
				Remove
			</v-btn>


		</v-form>
		<!-- form ends -->
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
import buttons_for_profile from '@/views/profile/buttons_for_profile.vue'


export default {
	name: 'profile_childrens_info',
	props: [],
	mixins: [ profile_info_and_privacy_Mixins ] ,
	components: {
		'noInternetSnackBar': noInternetSnackBar,
		'buttons_for_profile': buttons_for_profile, 
	},

	data: ()=>({

		items_form_field: [

		{
			email: 'riyad298@gmail.como',

			no: 1,

			date_picker_menu: false,


			field_name_name: 'first_name', 
			field_value_name: 'Ahsan Riyad', 
			alias_field_name_name: 'First Name',

			field_name_gender: 'gender', 
			field_value_gender: 'Male', 
			alias_field_name_gender: 'Gender',	

			field_name_date_of_birth: 'date_of_birth', 
			field_value_date_of_birth: '20/12/1969', 
			alias_field_name_date_of_birth: 'Date Of Birth', 
		},

		{
			email: 'riyad298@gmail.como',

			no: 1,

			date_picker_menu: false,

			field_name_name: 'last_name', 
			field_value_name: 'Ahsan Riyad', 
			alias_field_name_name: 'First Name' ,



			field_name_gender: 'gender', 
			field_value_gender: 'Male', 
			alias_field_name_gender: 'Gender',	

			field_name_date_of_birth: 'date_of_birth', 
			field_value_date_of_birth: '20/12/1969', 
			alias_field_name_date_of_birth: 'Date Of Birth',
		}

		],
		email: 'riyad298@gmail.como',


	}), 
	methods: {
		saveDate(date){

			console.log(this.$refs);
			console.log(date);

			this.$refs.menu[0].save(date);



		}
	},

	created(){

		console.log(this.$refs);

	},
	updated(){
		console.log(this.$refs);
	}

}

</script>
