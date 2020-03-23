<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >
					
					<!-- <h1>hellow</h1> -->

					<noInternetSnackBar ref="snackbar" ></noInternetSnackBar>


					<slot name="verification_alert"></slot>
					<slot name="email_verification_alert"></slot>
					

					<v-btn block color="success" class="mb-4" @click="add_new_children" v-if="$store.getters.getComponentName == 'get_details' && $store.getters.getAllInfo.type == 'admin'  ?  true :  $store.getters.getComponentName != 'get_details' ? true : false  ">
						Add New
					</v-btn>

					<div 
					v-for="( item , index ) in items_form_field"
					:key="item.index"	
					>

					
					<h3 align="center" class="primary white--text py-2"> {{ item.no == 1 ? 'First Child' : item.no == 2 ? 'Second Child' : item.no == 3 ? 'Third Child' : item.no == 4 ? 'Fourth Child' : '' }} </h3>


					<!-- form starts -->
					<v-form
					ref="form"
					v-model="valid"
					:lazy-validation="lazy"
					v-on:submit.prevent
					>




					<v-text-field
					label="Name"
					v-model="item.name"
					:rules=" field_rules_prop(  item.name , index  ) "			
					>
				</v-text-field>


				<v-select
				v-model = "item.gender"
				:rules=" field_rules_prop(  item.gender , index  ) "
				:items="item_gender"
				label="Gender"
				></v-select>



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
					v-model="item.date_of_birth"
					label="Date Of Birth"
					readonly
					v-on="on"
					></v-text-field>
				</template>
				<v-date-picker v-model="item.date_of_birth" no-title scrollable>
					<v-spacer></v-spacer>
					<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
					<v-btn text color="primary" 
					@click="saveDate(item.date_of_birth , index)"
					>OK</v-btn>
				</v-date-picker>
			</v-menu>


			<v-btn color="success" class="mr-3 mb-3" @click="()=>{ updateChildren(index) ; dialog = true; }"

				v-if="$store.getters.getComponentName == 'get_details' && $store.getters.getAllInfo.type == 'admin'  ?  true :  $store.getters.getComponentName != 'get_details' ? true : false  "

				>
				{{ item.status == 'new' ? 'ADD' : 'UPDATE' }}
			</v-btn>
			<v-btn color="error" class="mr-3 mb-3" @click="()=>{ removeChildren(index); dialog = true; }" 	
				v-if="$store.getters.getComponentName == 'get_details' && $store.getters.getAllInfo.type == 'admin'  ?  true :  $store.getters.getComponentName != 'get_details' ? true : false  "

				>
				Remove
			</v-btn>


		</v-form>
		<!-- form ends -->
	</div>


	<buttons_for_profile v-if=" $store.getters.getComponentName != 'get_details' " ></buttons_for_profile>
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


<v-dialog
v-model="dialog"
hide-overlay
persistent
width="300"
>
<v-card
color="primary"
dark
>
<v-card-text>
	Updating
	<v-progress-linear
	indeterminate
	color="white"
	class="mb-0"
	></v-progress-linear>
</v-card-text>
</v-card>
</v-dialog>



</v-app>
</template>
<script>
// @ is an alias to /src
import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'

import noInternetSnackBar from '@/views/noInternetSnackBar'
import buttons_for_profile from '@/views/profile/buttons_for_profile.vue'


export default {
	name: 'profile_childrens_info',
	props: ['email'],
	mixins: [ profile_info_and_privacy_Mixins ] ,
	components: {
		'noInternetSnackBar': noInternetSnackBar,
		'buttons_for_profile': buttons_for_profile, 
	},

	data: ()=>({

		items_form_field: [],
		loading_remove: false,


	}), 
	methods: {},

	created(){


		this.getChildren();


	},
	updated(){
		console.log(this.$refs);
	},
	watch: {
		dialog (val) {
			if (!val) return
				setTimeout(() => (this.dialog = false), 2000);
		},
	}

}

</script>
