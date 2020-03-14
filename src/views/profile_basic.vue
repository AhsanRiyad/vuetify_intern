<template>


	<base_form :items_form_field="items_form_field"  ></base_form>



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
	mixins: [ profile_info_and_privacy_Mixins ] ,
	data: ()=>({


		
		

		items_form_field : [],


	}), 
	created(){



		this.$store.commit('setComponentName' , 'profile_basic');
		
		let promese = new Promise((resolve  )=>{


			this.getGeneralInfo( resolve );



		})
		
		promese.then((all_info)=>{
			console.log('promese trying');
			console.log(all_info);

			this.items_form_field = [...all_info.privacy_info];

			this.items_form_field = [];
			this.items_form_field =  all_info.privacy_info.filter((item)=>{

				return item.field_name == 'first_name' || item.field_name == 'last_name' || item.field_name == 'nid_or_passport' || item.field_name == 'name_bangla' || item.field_name == 'institution_id' || item.field_name == 'mobile'  || item.field_name == 'blood_group' || item.field_name == 'religion'  || item.field_name == 'date_of_birth'   ;


			})
		})
		// console.log(i);
	},
}
</script>