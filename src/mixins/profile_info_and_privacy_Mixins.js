
import _ from 'lodash'
import moment from 'moment'


export default {

	data: function(){

		return {
			status_text: '',


//data table
users_info:[],
search:'',
table_loading: false,


date: new Date().toISOString().substr(0, 10),
menu: false,
modal: false,
menu2: false,

item_gender: ['Male' , 'Female', 'Others'],
item_religion: ['Islam' , 'Hinduism' , 'Christianity ' , 'Buddhism' , 'Nonreligious' , 'Others'],
item_blood_group: ['select' , 'A+' , 'B+' , 'AB+' , 'O+' , 'A-' , 'B-' , 'AB-' , 'O-'],

/*for social network and children info*/

item_social_network_type:['Facebook', 'Messenger' , 'Viber', 'WhatsApp'],
facebook: [],
forum_info: [],
selected: [],


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
	value: 'alias_field_name',
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
	value: 'alias_field_name',
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
	value: 'alias_field_name',
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

	// childrens_info starts



		
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

					},
				




	/*Social Network and Children's info*/


	saveDate(date , index){

		console.log(this.$refs);
		console.log(date);

		this.$refs.menu[index].save(date);



	},


	getFacebookAndForumMemeberShipInfo(){



		console.log(this.$refs);

		console.log('email printing .............');

		console.log(this.email);


		var headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json'} ;

			this.$axios.post( this.$store.getters.getModelAddress_laravel+'getFacebookAndForumMemeberShipInfo' ,
			{
				email: this.email,
			} , headers
			).then(function(response){

				console.log(response);

/*
						this.facebook = [...response.data.facebook_personal[0]];
						this.forum_info = [...response.data.forum_info];
						*/
						console.log(response.data.facebook_personal[0]);


						this.facebook = {...response.data.facebook_personal[0], email: this.email , type: 'personal' };
						this.forum_info = [...response.data.forum_info];


						this.forum_info = this.response.data.forum_info.map((item)=>{

							return {
								...item, status: 'old'
							}

						})


						console.log('facbook info');
						console.log(this.forum_info);

					}.bind(this))
			.catch(function(){

// this.$refs.snackbar.startSnackBar();

//
}.bind(this));



		},



		add_new_forum_info(){


			console.log(this.forum_info.length);


			this.forum_info.length < 4 ?

			this.forum_info.unshift({

				email: this.email ,

				status: 'new',			

				media_name: 'Facebook', 

				profile_link: '', 

				type: 'forum',


			}): '';
		},
		removeForumInfo(index){

			/*	console.log(index);
				this.items_form_field.splice(index, 1);

				*/
				let {email , media_name , type} = this.forum_info[index];

				var headers = {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json' } ;

					this.$axios.post( this.$store.getters.getModelAddress_laravel+'updateForum' ,
					{
						email: email,
						media_name: media_name,
						type: type,
						purpose: 'remove'
					} , headers
					).then(function(response){

						console.log(response);
						this.getFacebookAndForumMemeberShipInfo();

					}.bind(this))
					.catch(function(){

// this.$refs.snackbar.startSnackBar();

//
}.bind(this));

				},
				updateForumInfo(index , facebook_or_forum){

					console.log(this.forum_info[index]);
					
					let { email, type, media_name , profile_name ,  profile_link } = 
					facebook_or_forum == 'forum'
					? this.forum_info[index]
					: this.facebook ;

					let obj = {

						profile_name : profile_name,
						profile_link : profile_link,

					}

					console.log(obj);

					var headers = {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json' } ;

						this.$axios.post( this.$store.getters.getModelAddress_laravel+'updateForum' ,
						{
							forum_info: obj,
							email: email,
							type: type,
							media_name: media_name,
							purpose: 'updateOrInsert' ,
						} , headers
						).then(function(response){

							console.log(response);
							this.getFacebookAndForumMemeberShipInfo();

						}.bind(this))
						.catch(function(){

// this.$refs.snackbar.startSnackBar();

//
}.bind(this));

					},







					getMomentDate(date){

						return moment(date).format('dddd, MMMM Do YYYY');

					},
					get_Data_Update_Details(resolve){


						var headers = {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept': 'application/json'} ;
							this.$axios.post( this.$store.getters.getModelAddress_laravel+'test' ,
							{
								email: this.email

							} , headers
							).then(function(response){
								console.log(response);
								console.log(response.data.new[0]);
//from all_info_together , coming as an object { first_name: 'Riyad' }
let new_info = response.data.new[0]; 
console.log(_.toPairs(new_info));

//make pairs of object key value pair [['first_name', 'Ahsan' ],['Last_name' , 'Riyad'] ]  from all_info_together  
let toPairsNew =  _.toPairs(new_info);
// [ 'first_name' , 'riyad' , 'last_name' , 'Ahsan' , 'spouse_name' , 'Malliha' ]
let flattenNew = _.flatten(toPairsNew);
// [['first_name', 'Ahsan' , 'Last_name' , 'Riyad'] , ['first_name', 'Ahsan' , 'Last_name' , 'Riyad']] 
let chunkNewIn4 = _.chunk(flattenNew , 4);
console.log( _.chunk( _.flatten(toPairsNew) , 4 ) );
// console.log(withOutNullNew);
//from data_log table
let old_info = response.data.old[0];
console.log(_.toPairs(old_info));

//make pairs of object key value pair, from data_log
let toPairsOld =  _.toPairs(old_info);
//removes null values, of all_info_together
/*let withOutNullOld =  toPairsNew.filter((arr)=>{
return arr[1] != null;
})*/
/*let matchingKey = _.difference(withOutNullNew , toPairsOld);*/
// console.log(matchingKey);
/*
let newMatchingPair = 
toPairsOld.filter((arrOld)=>{
return (
withOutNullNew.forEach((arrNew)=>{
return arrNew[0] == arrOld[0] ;
})
)
})*/
// console.log(newMatchingPair);

let i,j;
let obj = [];
for(i=0; i<chunkNewIn4.length; i++){
// console.log(toPairsNew[i][0]);
// console.log(toPairsOld[i][0]);

for(j=0;j<toPairsOld.length;j++){
// console.log(toPairsOld[j][0]);
if(chunkNewIn4[i][0]==toPairsOld[j][0] && chunkNewIn4[i][1]!=toPairsOld[j][1])
{
	console.log('matching');
	obj.push({
		field_name: chunkNewIn4[i][0],
		alias_field_name: chunkNewIn4[i][2],
		new_value: chunkNewIn4[i][1],
		old_value: toPairsOld[j][1],
	})
}
}
}
console.log('printing final object');
console.log(obj);
// this.changed_info = obj;

resolve(obj);

// this.items = [...obj];
// console.log(withOutNullNew);
// console.log(toPairsOld);
}.bind(this))
							.catch(function(){
							}.bind(this));



						},


						get_new_user_request_list(){



							console.log('in the new user req list');


							var headers = {
								'Content-Type': 'application/x-www-form-urlencoded',
								'Accept': 'application/json'} ;

								this.$axios.post(  this.$store.getters.getModelAddress_laravel+'get_new_user_request_list'  , {
									purpose : 'get_new_user_request_list'
								} , headers)
								.then(function (response) {
									console.log(response);

// resolve(response.data);
// this.items = [...response.data];

let items =  response.data.map((item)=>{

	return {
		full_name: item.full_name,
		registration_date: this.getMomentDate(item.registration_date),
		email: item.Email,
	}

})



this.$store.commit('set_base_table_list' , [...items]);




}.bind(this))
								.catch(function (error) {
									console.log(error);
								});



							},



							get_data_update_request_list(){


								var headers = {
									'Content-Type': 'application/x-www-form-urlencoded',
									'Accept': 'application/json'} ;

									this.$axios.post(  this.$store.getters.getModelAddress_laravel+'get_data_update_request_list'  , {
										purpose : 'get_change_req_user'
									} , headers)
									.then(function (response) {
										console.log(response);

// resolve(response.data);
// this.items = [...response.data];

let items =  response.data.map((item)=>{

	return {
		full_name: item.full_name,
		change_request_time: this.getMomentDate(item.change_request_time),
		email: item.Email,
	}

})



this.$store.commit('set_base_table_list' , [...items]);




}.bind(this))
									.catch(function (error) {
										console.log(error);
									});



								},

//from user update request
get_users: function(){

	var headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept': 'application/json'} ;

		this.$axios.post( this.$store.getters.modeldata_update_request , {
			purpose : 'get_change_req_user'
		} , headers ).then(function(response){

// console.log(JSON.parse(response.data));



if(response.data.length == 1){
	this.user_list = []; 
	this.user_list[0] =  JSON.parse(response.data);
// console.log(this.user_list[0]);
}else if(response.data.length > 1){
	this.user_list =  response.data;
// console.log(this.user_list[0].email);
}else if(response.data == 0){
	this.user_list =  [];
}


}.bind(this));
	},
	approve_id: function(email , user_id){
//console.log(email);

var headers = {
	'Content-Type': 'application/x-www-form-urlencoded',
	'Accept': 'application/json'} ;

	this.$axios.post(this.$store.getters.modeldata_update_request, {
		purpose : 'approve_user_change_request', 
		email: email,
		user_id: user_id,
	} , headers ).then(function(){
//var obj = JSON.parse(data);
// console.log(obj);
//this.user_list = JSON.parse(data.bodyText);
//alert(data);
//console.log(obj[0].status);
// console.log(data);

this.admin_approval_status = 'Changes approved';
this.get_users();
this.dialog = true;
//console.log(obj.length);


}.bind(this));

},
reject_id: function(email , user_id){
//console.log(email);

var headers = {
	'Content-Type': 'application/x-www-form-urlencoded',
	'Accept': 'application/json'} ;

	this.$axios.post(this.$store.getters.modeldata_update_request , {
		purpose : 'reject_user_user_request', 
		email: email,
		user_id: user_id,
	}, headers )
	.then(function () {

// console.log(response);
this.admin_approval_status = 'User change request is rejected';
this.dialog = true;
this.get_users();

}.bind(this))
	.catch(function () {

	});


},



field_rules_prop( field_name ){

	if(field_name == 'first_name')
	{

		return ([
			v => !!v || 'required',
			]);

	}
},
updateData(field_name , index_number , value){

	console.log(field_name);
	console.log(index_number);
	console.log('form validate');

// console.log(this.$refs.form.validate());
console.log(this.$refs[field_name]);



(field_name != 'blood_group' && field_name !='religion') &&  (!this.$refs[field_name].hasError) ?

this.updatePrivacy(
	'all_info_together' ,
	field_name ,
	this.$refs[field_name].value ,
	this.email , 'forPrivacy') 

: (field_name == 'blood_group' || field_name =='religion') &&  (!this.$refs[field_name].hasError) ?
this.updatePrivacy(
	'all_info_together' ,
	field_name ,
	value ,
	this.email , 'forPrivacy')

: '' ;




// console.log(this.$refs.)
},
updateData_profile(field_name , index_number , value ){

	console.log(field_name);
	console.log(index_number);
	console.log('form validate');

// console.log(this.$refs.form.validate());
// console.log(this.users_info[index_number]);
console.log(value);
// console.log(this.$refs);

// console.log(this.$refs[field_name][0].value);

console.log(field_name);








(field_name != 'blood_group' && field_name !='religion' && field_name !='date_of_birth') &&  (!this.$refs[field_name][0].hasError) ?

this.updatePrivacy(
	'all_info_together' ,
	field_name ,
	this.$refs[field_name][0].value ,
	this.email , 'forProfile') 

: (field_name == 'blood_group' || field_name =='religion' || field_name == 'date_of_birth') &&  (!this.$refs[field_name][0].hasError) ?
(this.updatePrivacy(
	'all_info_together' ,
	field_name ,
	value ,
	this.email , 'forProfile') , console.log('in the date') )

: '' ;





// console.log(this.$refs.)
},
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
			get_info_of_a_particular_user_with_promise(email, resolve){

				var headers = 
				{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'} ;

					this.$axios.post( this.$store.getters.getModelAddress_laravel+'get_info_of_a_particular_user_with_promise',
					{
						purpose: 'get_info_of_a_particular_user_with_promise',
						email: email ,
					}, headers
					).then(function(response){

						resolve(response.data);

					}.bind(this))
					.catch(function(){

					}.bind(this));

				},
//get general info_promise by email
getGeneralInfo(id , email , resolve){

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
			alias_field_name : value[0],
			privacy_value : value[3],
			field_name : value[2],
			field_value : value[1],
			index_number: index,
		}
	});




	this.users_info = [...finalObject] ;

	this.profile_user_status = this.all_info[0].status;
	this.change_request_status = this.all_info[0].change_request;
	this.profile_user_type = this.all_info[0].type;



	this.indeterminate = false;
// console.log(this.all_info[0]);
this.progress_color = 'white';

let obj ={
	privacy_info: finalObject,
	all_info: this.all_info,
}

resolve(obj);


//return r;

}.bind(this))
		.catch(function(){
			this.indeterminate = false;
			this.progress_color = 'white';

			this.$refs.snackbar.startSnackBar();
			this.table_loading = false;


		}.bind(this));


	},

	getPrivacyInfo( id , email  ){

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
			alias_field_name : value[0],
			privacy_value : value[3],
			field_name : value[2],
			field_value : value[1],
			index_number: index,
		}
	});

	if(this.$store.getters.getComponentName == 'get_details' && this.$store.getters.getAllInfo.type !=  'admin'){

		finalObject =  finalObject.filter((item)=>{
			return item.privacy_value == 1 ;

		})
	}
// console.log(finalObject);

// console.log(finalObject); 

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
		updatePrivacy(table_name, field_name , privacy_value , email , purpose ){


			console.log(table_name);
			console.log(field_name);
			console.log(privacy_value);
			console.log(email);


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
		purpose: purpose,
	} , headers
	).then(function(response){
//this.users_info = response.data;
// this.dialog = false;
console.log(response);

this.$store.getters.getComponentName == 'get_details' ? ( (this.dialog_update_text = 'upadated'),
	(this.dialog_update_status = true) ) : '';

this.getPrivacyInfo(this.user_id , email);

purpose == 'forUpdateRequest'?
this.get_data_update_request_list(): '';

purpose == 'forNewUserRequest'?
this.get_new_user_request_list(): '';



}.bind(this))
	.catch(function(){

		this.$refs.snackbar.startSnackBar();
	}.bind(this));







},





}

}


