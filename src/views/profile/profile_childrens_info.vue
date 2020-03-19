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


			<v-btn color="success" class="mr-3 mb-3" @click="()=>{ updateChildren(index) }">
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


		getChildren(){



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

						return { ...item, status: 'old' , date_picker_menu: false, }


					});

					console.log(a);

					this.items_form_field = [];
					


					this.items_form_field = [...a];


				}.bind(this))
				.catch(function(){

// this.$refs.snackbar.startSnackBar();

//
}.bind(this));
















			},



			add_new_children(){


				console.log(this.items_form_field.length);


				this.items_form_field.length < 4 ?

				this.items_form_field.unshift({

					email: this.email ,

					no: this.items_form_field.length+1,

					date_picker_menu: false,

					status: 'new',			

					name: '', 

					gender: 'Male', 

					date_of_birth: new Date().toISOString().substr(0, 10), 


				}): '';
			},
			removeChildren(index){

			/*	console.log(index);
				this.items_form_field.splice(index, 1);

*/
				let {email , no} = this.items_form_field[index];

				var headers = {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json' } ;

					this.$axios.post( this.$store.getters.getModelAddress_laravel+'updateChildren' ,
					{
						email: email,
						no: no,
						purpose: 'remove'
					} , headers
					).then(function(response){

						console.log(response);
						this.getChildren();

					}.bind(this))
					.catch(function(){

// this.$refs.snackbar.startSnackBar();

//
}.bind(this));





				},
				updateChildren(index){

					console.log(this.items_form_field[index]);

					let {email, no, name, gender, date_of_birth} = this.items_form_field[index];

					let obj = {

						name:name,
						gender: gender,
						date_of_birth: date_of_birth,

					}

					console.log(obj);

					var headers = {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json' } ;

						this.$axios.post( this.$store.getters.getModelAddress_laravel+'updateChildren' ,
						{
							childrensInfo: obj,
							email: email,
							no: no,
							purpose: 'updateOrInsert' ,
						} , headers
						).then(function(response){

							console.log(response);
							this.getChildren();



						}.bind(this))
						.catch(function(){

// this.$refs.snackbar.startSnackBar();

//
}.bind(this));

					}
				},

				created(){


					this.getChildren();


				},
				updated(){
					console.log(this.$refs);
				}

			}

		</script>
