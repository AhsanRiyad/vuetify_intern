<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >
					



					<noInternetSnackBar ref="snackbar" ></noInternetSnackBar>


					<slot name="verification_alert"></slot>
					<slot name="email_verification_alert"></slot>
					


					<div 
					v-for="item in items"
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
						label="item.alias_field_name"
						readonly
						v-on="on"
						ref="item.field_name"
						@change="updateData_profile( item.field_name , item.index_number )"
						></v-text-field>
					</template>
					<v-date-picker v-model="date" no-title scrollable>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
						<v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
					</v-date-picker>
				</v-menu>







				<v-select
				v-else-if=" item.field_name == 'gender' || item.field_name == 'blood_group'  || item.field_name == 'religion' "
				v-model = "item.field_value"
				:rules=" field_rules_prop(  item.field_name , item.index_number  ) "
				@change="updateData_profile( item.field_name , item.index_number )"
				:ref = " item.field_name"
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



		<slot name="buttons"></slot>
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



export default {
	name: 'profile_basic',

	mixins: [ profile_info_and_privacy_Mixins ] ,
	components: { 'noInternetSnackBar': noInternetSnackBar },

	data: ()=>({
		email: 'riyad298@gmail.com',

		items : [
		{
			alias_field_name : 'first_name',
			privacy_value : 0,
			field_name : 'first_name',
			field_value : 'Ahsan',
			index_number: 0,

		}

		],
	}), 
	created(){

		this.$store.commit('setComponentName' , 'base_profile');
		
		let promese = new Promise((resolve  )=>{


			this.getGeneralInfo( this.$store.getters.getAllInfo.id , this.$store.getters.getAllInfo.email , resolve );



		})
		
		promese.then((all_info)=>{
			console.log('promese trying');
			console.log(all_info);

			this.items = [...all_info.privacy_info];

			this.items = [];
			this.items =  all_info.privacy_info.filter((item)=>{

				return item.field_name == 'first_name' || item.field_name == 'last_name' || item.field_name == 'nid_or_passport' || item.field_name == 'name_bangla' || item.field_name == 'institution_id' || item.field_name == 'mobile'  || item.field_name == 'blood_group' || item.field_name == 'religion'  || item.field_name == 'date_of_birth'   ;


			})



		})

		// console.log(i);


	}

}

</script>
