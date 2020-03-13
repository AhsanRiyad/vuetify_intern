
import _ from 'lodash'

export default {

	data: function(){

		return {
			status_text: '',
			

//data table
users_info:[],
search:'',
table_loading: false,

headers: [
{
	text: 'User Profile',
	align: 'left',
	sortable: false,
	value: 'Label',
},
{ 
	text: 'Value', value: 'brand_name',
},

],

headers_privacy: [
{
	text: 'Field Name',
	align: 'left',
	sortable: false,
	value: 'field_name',
},
{ 
	text: 'Privacy', value: 'privacy_value',
},
{ 
	text: 'Options', value: 'options',
},

],


headers_get_details: [
{
	text: 'Field Name',
	align: 'left',
	sortable: false,
	value: 'field_name',
},
{ 
	text: 'Value', value: 'field_value',
},

],

headers_get_details_edit_admin: [
{
	text: 'Field Name',
	align: 'left',
	sortable: false,
	value: 'field_name',
},
{ 
	text: 'Value', value: 'field_value',
},
{ 
	sortable: false,
	text: 'Edit', value: 'edit',
},

],


headers_search: [
{
	text: 'Name',
	align: 'left',
	sortable: false,
	value: 'full_name',
},
{ 
	text: 'Institution Id', value: 'institution_id',
},
{ 
	text: 'Membership Number', value: 'membership_number',
},
{ 
	text: 'Status', value: 'status',
},
{ 
	text: 'Gallery', value: 'gallery',
},
{ 
	text: 'Profile', value: 'profile',
},

],
users_list: [],



dialog: false,
notifications: false,
sound: true,
widgets: false,




products: [],
desserts: [],
items: [
{ title: 'Edit' },

],


photos: [],
recent_photo: '',
old_photo: '',
group_photos: [],
photo_delete_status: '',
photo_base_name: '',


loading: false,
button_disabled: false,

dialog1: false,
dialog_photo: '',


valid: false,
lazy: true, 




profile_user_status:'approved',
change_request_status: 'requested',
profile_user_type: 'admin',
edit_info: false,
indeterminate: false,
progress_color:'white',


all_info: [],


}
},

methods: {

	deletePhoto(photo_name){

		



		var headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'} ;

			this.$axios.post( this.$store.getters.getModelAddress_laravel+'deletePhoto' ,
			{
				email: this.$store.getters.getAllInfo.email ,
				user_id: this.$store.getters.getAllInfo.id ,
				photo_name: photo_name
			} , headers
			).then(function(response){
				console.log(response);

				this.getPhotosForAll(this.user_id, this.email);
				this.photo_delete_status = 'Photo Deleted Successfully';




			}.bind(this))
			.catch(function(){

		// this.$refs.snackbar.startSnackBar();

        //
    }.bind(this));



		},
		getPhotosForAll(user_id , email){





			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'} ;

				this.$axios.post( this.$store.getters.getModelAddress_laravel+'getPhotosForAll' ,
				{

					purpose: 'getPhotos_for_all_users',
					main_purpose : 'search_other_option',
					email: email ,
					user_id: user_id ,
				} , headers
				).then(function(response){
        //this.users_info = response.data;
        // alert(rootAdress+'/assets/img/uploads/recent_photo/'+recent_photo);

        console.log(response);

        this.photos = response.data ;
        // this.recent_photo = this.photos.recent_and_old[0].recent_photo;




        this.photos.recent_and_old[0].recent_photo == 'not_set' ? this.recent_photo =  this.$store.getters.assetsRootDirectory+'img/uploads/default.jpg' : this.recent_photo = this.$store.getters.assetsRootDirectory+'img/uploads/recent_photos/'+this.photos.recent_and_old[0].recent_photo;



        this.photos.recent_and_old[0].old_photo == 'not_set' ? this.old_photo =  this.$store.getters.assetsRootDirectory+'img/uploads/default.jpg' : this.old_photo = this.$store.getters.assetsRootDirectory+'img/uploads/old_photos/'+this.photos.recent_and_old[0].old_photo;



        

        this.group_photos = response.data.group_photos ;


        console.log('group photo');

        console.log(this.group_photos);

        // this.recent_photo = response.data.recent_photo;
        // this.old_photo = response.data.old_photo;
        // this.group_photo = response.data.group_photo;

        //alert(this.rootAdress+'assets/img/uploads/recent_photos/'+this.recent_photo);
        //alert(this.rootAdress+'assets/img/uploads/group_photos/'+this.group_photo[0]);

    }.bind(this))
				.catch(function(){

		// this.$refs.snackbar.startSnackBar();

        //
    }.bind(this));










			},
			getSearchInfo(){
				this.table_loading = true;

				var headers = 
				{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'} ;

					this.$axios.post( this.$store.getters.getModelAddress_laravel+'getAllPeopleList',
					{
						purpose: 'getPrivacy',

					}, headers
					).then(function(response){
						this.table_loading = false;
						console.log(response);

						let people_excluding_searcher =  response.data.filter(( item )=>{
							return item.email != this.$store.getters.getAllInfo.email;
						})


						this.$store.commit('setPeopleSearchList' , people_excluding_searcher);


					}.bind(this))
					.catch(function(){
						this.table_loading = false;

						this.$refs.snackbar.startSnackBar();
						this.table_loading = false;


					}.bind(this));

				},
				getPrivacyInfo( id , email){

					this.table_loading = true;
					this.indeterminate = true;
					this.progress_color='red';


					var headers = 
					{
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json'} ;

						this.$axios.post( this.$store.getters.getModelAddress_laravel+'getPrivacyData',
						{
							purpose: 'getPrivacy',
							id: id ,
							email: email ,
						}, headers
						).then(function(response){

							this.table_loading = false;

							console.log(response);
							this.users_info = response.data.privacy_info;
							this.all_info = response.data.all_info;
							console.log(this.users_info);
// let p = Object.entries(this.users_info[0]);

let obj2array = _.entries(this.users_info[0]); // makes object to array
console.log(obj2array);
let flatArray =  _.flatten(obj2array); //flat array [individual element]

let chunkArray =  _.chunk(flatArray, 4);  //group by 4 element of the array


let finalObject =  chunkArray.map((value , index )=>{ //array to object conversion for pages
	console.log(value[3]);
	
	return {
		field_name : value[0],
		privacy_value : value[3],
		alias_field_name : value[2],
		field_value : value[1],
		index_number: index,
	}
});



if(this.$store.getters.getComponentName == 'get_details' && this.$store.getters.getAllInfo.type !=  'admin'){

	finalObject =  finalObject.filter((item)=>{
		return item.privacy_value == 1 ;

	})
}

console.log(finalObject);

console.log(finalObject); 

// console.log(_.fromPairs(r));

this.users_info = [...finalObject] ;

this.profile_user_status = this.all_info[0].status;
this.change_request_status = this.all_info[0].change_request;
this.profile_user_type = this.all_info[0].type;

this.indeterminate = false;
console.log(this.all_info[0]);
this.progress_color = 'white';

//return r;

}.bind(this))
						.catch(function(){
							this.indeterminate = false;
							this.progress_color = 'white';

							this.$refs.snackbar.startSnackBar();
							this.table_loading = false;


						}.bind(this));

					}, 
					updatePrivacy(table_name, field_name , privacy_value , email){
//alert('upadate privacy');
this.dialog = true;

var headers = {
	'Content-Type': 'application/x-www-form-urlencoded',
	'Accept': 'application/json'} ;

	this.$axios.post( this.$store.getters.getModelAddress_laravel+'updatePrivacy' ,
	{
		table_name: table_name,
		field_name: field_name,
		privacy_value: privacy_value,
		id: this.$store.getters.getAllInfo.id ,
		email: email ,
	} , headers
	).then(function(response){
//this.users_info = response.data;
// this.dialog = false;
console.log(response);

this.getPrivacyInfo(this.user_id , email);




}.bind(this))
	.catch(function(){

		this.$refs.snackbar.startSnackBar();
	}.bind(this));



},








},


}

