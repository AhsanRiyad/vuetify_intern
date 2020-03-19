<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >
					
					<!-- <h1>hellow</h1> -->

					<noInternetSnackBar ref="snackbar" ></noInternetSnackBar>


					<slot name="verification_alert"></slot>
					<slot name="email_verification_alert"></slot>
					

					<v-btn block color="success" class="mb-4" @click="add_new_children">
						Add New
					</v-btn>

					<div 
					v-for="( item , index ) in items_form_field"
					:key="item.index"	
					>

					
					<h3> {{ item.no == 1 ? 'First Child' : item.no == 2 ? 'Second Child' : item.no == 3 ? 'Thirt Child' : item.no == 4 ? 'Fourth Child' : '' }} </h3>


					<!-- form starts -->
					<v-form
					ref="form"
					v-model="valid"
					:lazy-validation="lazy"
					v-on:submit.prevent
					>




					<v-text-field
					:label="item.alias_field_name_name"
					v-model="item.field_value_name"
					:rules=" field_rules_prop(  item.field_name , item.index_number  ) "				
					>
				</v-text-field>


				<v-select
				v-model = "item.field_value_date_of_birth"
				:rules=" field_rules_prop(  item.field_name , item.index_number  ) "
				:items="item_gender"
				:label="item.alias_field_name_gender"
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
					v-model="item.field_value_date_of_birth"
					:label="item.alias_field_name_date_of_birth"
					readonly
					v-on="on"
					></v-text-field>
				</template>
				<v-date-picker v-model="item.field_value_date_of_birth" no-title scrollable>
					<v-spacer></v-spacer>
					<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
					<v-btn text color="primary" 
					@click="saveDate(item.field_value_date_of_birth , index)"

					>OK</v-btn>
				</v-date-picker>
			</v-menu>


			<v-btn color="success" class="mr-3 mb-3" @click="()=>{ updateChildren(index)}">
				{{ item.status == 'new' ? 'ADD' : 'UPDATE' }}
			</v-btn>
			<v-btn color="error" class="mr-3 mb-3" @click="()=>{ removeChildren(index) }">
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
			index: 0,			

			email: 'riyad298@gmail.com',

			no: 1,

			date_picker_menu: false,

			status: 'old',

			field_name_name: 'name', 
			field_value_name: 'Ahsan Riyad', 
			alias_field_name_name: 'Name',

			field_name_gender: 'gender', 
			field_value_gender: 'Male', 
			alias_field_name_gender: 'Gender',	

			field_name_date_of_birth: 'date_of_birth', 
			field_value_date_of_birth: new Date().toISOString().substr(0, 10), 
			alias_field_name_date_of_birth: 'Date Of Birth', 
		},
		{
			index: 1,

			email: 'riyad298@gmail.com',

			no: 2,

			date_picker_menu: false,

			status: 'old',

			field_name_name: 'name', 
			field_value_name: 'Ahsan Riyad', 
			alias_field_name_name: 'Name' ,


			field_name_gender: 'gender', 
			field_value_gender: 'Male', 
			alias_field_name_gender: 'Gender',	

			field_name_date_of_birth: 'date_of_birth', 
			field_value_date_of_birth: new Date().toISOString().substr(0, 10), 
			alias_field_name_date_of_birth: 'Date Of Birth',
		}

		],
		email: 'riyad298@gmail.com',


	}), 
	methods: {
		saveDate(date , index){

			console.log(this.$refs);
			console.log(date);

			this.$refs.menu[index].save(date);



		},
		add_new_children(){


			console.log(this.items_form_field.length);


			this.items_form_field.length < 4 ?

			this.items_form_field.unshift({


				index: this.items_form_field.length,			

				email: this.email ,

				no: this.items_form_field.length+1,

				date_picker_menu: false,

				status: 'new',			

				field_name_name: 'name', 
				field_value_name: 'Ahsan Riyad', 
				alias_field_name_name: 'Name',

				field_name_gender: 'gender', 
				field_value_gender: 'Male', 
				alias_field_name_gender: 'Gender',	

				field_name_date_of_birth: 'date_of_birth', 
				field_value_date_of_birth: new Date().toISOString().substr(0, 10), 
				alias_field_name_date_of_birth: 'Date Of Birth', 

			}): '';
		},
		removeChildren(index){

			console.log(index);
			this.items_form_field.splice(index, 1);


		},
		updateChildren(index){

			let obj = {

				[ this.items_form_field[index].field_name_name ]: this.items_form_field[index].field_value_name,
				[ this.items_form_field[index].field_name_gender ]: this.items_form_field[index].field_value_gender,
				[ this.items_form_field[index].field_name_date_of_birth ]: this.items_form_field[index].field_value_date_of_birth,
				email: this.items_form_field[index].email,
				no: this.items_form_field[index].no,
				// status: this.items_form_field[index].status,
			}






			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'} ;

				this.$axios.post( this.$store.getters.getModelAddress_laravel+'updateChildren' ,
				{
					childrensInfo: obj,
				} , headers
				).then(function(response){

					console.log(response);

				}.bind(this))
				.catch(function(){

// this.$refs.snackbar.startSnackBar();

//
}.bind(this));





				console.log(obj);

			}





		},

		created(){
			console.log(this.$refs);

			console.log('email printing .............');

			console.log(this.email);


			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'} ;

				this.$axios.post( this.$store.getters.getModelAddress_laravel+'getChildren' ,
				{
					email: this.email,
				} , headers
				).then(function(response){

					console.log(response);

					let a = response.data.map((item)=>{

						return { ...item, status: 'new' }


					});
					
					console.log(a);


				}.bind(this))
				.catch(function(){

// this.$refs.snackbar.startSnackBar();

//
}.bind(this));








			},
			updated(){
				console.log(this.$refs);
			}

		}

	</script>
