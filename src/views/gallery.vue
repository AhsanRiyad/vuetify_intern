<template>
  <v-app class="grey" > 
    <v-container class="white" >




<v-row justify="center">
  <v-dialog v-model="dialog1" scrollable max-width="700px">

    <v-card>
      <v-card-title>Image</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 400px;">

        <v-row align="center" justify="center">
          <v-img
          :src="dialog_photo"
          class="grey lighten-2"
          max-width="600"

          aspect-ratio="1"
          ></v-img>
        </v-row>

      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="mb-5">

        <v-container>
          <v-row class="ml-3">

          </v-row>
          <v-row>
            <v-col xs="12">

            </v-col>
          </v-row>
        </v-container>


      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>




  






</v-container>
</v-app>
</template>


<script>



  export default {
    name: 'gallery',
    props: ['email' , 'user_id'],
    data: ()=>({
      notifications: false,
      sound: true,
      widgets: false,

      dialog1: false,
      dialog: false,
      dialog_photo: '',
      dialog_photo_baseName: '',
      recent_photo: '' ,
      old_photo: '' ,
      group_photo: [],
      recent_photos: 'assets/img/uploads/recent_photos/',
      old_photos: 'assets/img/uploads/old_photos/',
      group_photos:  'assets/img/uploads/group_photos/',
      uploads:  'assets/img/uploads/',



    }),
    computed:{},
    methods: {
      zoom_in(photo , baseName){
      //alert(photo);
      this.button_disabled = false;
      this.photo_delete_status = '';
      this.dialog_photo_baseName = baseName;
      this.dialog_photo = photo;
      this.dialog1 = true;
      // alert('zooming in photo');
    },
  },
  created(){


    this.$axios.post( this.$store.getters.modelSearch ,
    {

      purpose: 'getPhotos_for_all_users',
      main_purpose : 'search_other_option',
      email: this.email ,
      user_id: this.user_id ,
    }
    ).then(function(response){
        //this.users_info = response.data;
        // alert(rootAdress+'/assets/img/uploads/recent_photo/'+recent_photo);

        // console.log(response);
        this.recent_photo = response.data.recent_photo;
        this.old_photo = response.data.old_photo;
        this.group_photo = response.data.group_photo;

        //alert(this.rootAdress+'assets/img/uploads/recent_photos/'+this.recent_photo);
        //alert(this.rootAdress+'assets/img/uploads/group_photos/'+this.group_photo[0]);

      }.bind(this))
    .catch(function(){

        //
      }.bind(this));
  }
}



</script>