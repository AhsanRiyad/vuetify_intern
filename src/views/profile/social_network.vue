<template>
	<v-app class="grey" > 
		<v-container class="white" >
			<v-row justify="center" align="center"> 
				<v-col cols="8" xl="4" >
					
					<!-- <h1>hellow</h1> -->

					<noInternetSnackBar ref="snackbar" ></noInternetSnackBar>


					<slot name="verification_alert"></slot>
					<slot name="email_verification_alert"></slot>
					
					<h3 block class="primary  white--text py-3" align="center">Facebook Info</h3>

					<v-text-field
					label="Profile Name"
					v-model="facebook.profile_name"
					>
				</v-text-field>
				
				<v-text-field
				label="Profile Link/ID"
				v-model="facebook.profile_link"
				>
			</v-text-field>


			<v-btn :loading="loading_add_or_update_facebook" block color="blue darken-3"  class="mb-4 white--text" @click="()=>{ updateForumInfo('index' , 'facebook'); dialog = true; }"  v-if="$store.getters.getComponentName == 'get_details' && $store.getters.getAllInfo.type == 'admin'  ?  true :  $store.getters.getComponentName != 'get_details' ? true : false  " >
				ADD/UPDATE
			</v-btn>



			<h3 block class="orange white--text py-3 mb-5" align="center">ADD GROUP/FORUM INFO</h3>
			



			<v-btn block color="success" class="mb-4" @click="add_new_forum_info" v-if="$store.getters.getComponentName == 'get_details' && $store.getters.getAllInfo.type == 'admin'  ?  true :  $store.getters.getComponentName != 'get_details' ? true : false  ">
				Add New Forum Info
			</v-btn >

			<div 
			v-for="( item , index ) in forum_info"
			:key="item.id"	
			>


			<!-- form starts -->
			<v-form
			ref="form"
			v-model="valid"
			:lazy-validation="lazy"
			v-on:submit.prevent
			>


			<v-select
			v-model = "item.media_name"
			:rules=" field_rules_prop(  item.media_name , index  ) "
			:items="item_social_network_type"
			label="Type"
			></v-select>

			<v-text-field
			:label=" item.media_name == 'Facebook' || item.media_name == 'Messenger'  ? 'Profile Id/Link' : 'Mobile Number'  "
			v-model="item.profile_link"
			:rules=" field_rules_prop(  item.profile_link , index  ) "				
			>
		</v-text-field>




		<v-btn color="success" class="mr-3 mb-3" @click="()=>{ updateForumInfo(index , 'forum') ; dialog = true;  }" :loading="loading_add_or_update_forum" v-if="$store.getters.getComponentName == 'get_details' && $store.getters.getAllInfo.type == 'admin'  ?  true :  $store.getters.getComponentName != 'get_details' ? true : false  ">
			{{ item.status == 'new' ? 'ADD' : 'UPDATE' }}
		</v-btn>
		<v-btn color="error" class="mr-3 mb-3" @click="()=>{ removeForumInfo(index) ; dialog = true;  }" :loading="loading_remove_forum" v-if="$store.getters.getComponentName == 'get_details' && $store.getters.getAllInfo.type == 'admin'  ?  true :  $store.getters.getComponentName != 'get_details' ? true : false  ">
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
	name: 'social_network',
	props: ['email'],
	mixins: [ profile_info_and_privacy_Mixins ] ,
	components: {
		'noInternetSnackBar': noInternetSnackBar,
		'buttons_for_profile': buttons_for_profile, 
	},

	data: ()=>({

		items_form_field: [],
		loading_add_or_update_facebook: false,
		loading_add_or_update_forum: false,
		loading_remove_forum:false,
		
	}), 
	created(){


		this.getFacebookAndForumMemeberShipInfo();


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
