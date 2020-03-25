<template>


<v-app>
<slot name="verification_alert"></slot>
<slot name="email_verification_alert"></slot>

	<base_form :items_form_field="items_form_field" :email="email"  ></base_form>

</v-app>

</template>
<script>
// @ is an alias to /src
import base_form from '@/views/base_component/base_form'

import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'


export default {
	name: 'profile_basic',
	components:
	{ 'base_form': base_form }
	,
	props: ['email'],
	mixins: [ profile_info_and_privacy_Mixins ] ,
	data: ()=>({



		items_form_field : [],


	}), 
	created(){


		this.$store.commit('setComponentName' , 'profile_address');

		let promese = new Promise((resolve  )=>{


			this.getGeneralInfo( this.$store.getters.getAllInfo.id , this.$store.getters.getAllInfo.email , resolve );



		})

		promese.then((all_info)=>{
			console.log('promese trying');
			console.log(all_info);

			this.items_form_field = [...all_info.privacy_info];

			this.items_form_field = [];
			this.items_form_field =  all_info.privacy_info.filter((item)=>{

				return item.field_name == 'present_line1' || item.field_name == 'present_line2' || item.field_name == 'present_district' || item.field_name == 'present_police_station' || item.field_name == 'present_post_office_name' || item.field_name == 'present_post_code'  || item.field_name == 'present_country'   
				||

				item.field_name == 'parmanent_line1' || item.field_name == 'parmanent_line2' || item.field_name == 'parmanent_district' || item.field_name == 'parmanent_police_station' || item.field_name == 'parmanent_post_office_name' || item.field_name == 'parmanent_post_code'  || item.field_name == 'parmanent_country'  

				;


			})
		})
// console.log(i);
},
}
</script>