<template>

  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Gallery</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Gallery</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Close</v-btn>
          </v-toolbar-items>
        </v-toolbar>



        <v-row align="center" justify="center">

          <v-col cols="12" align="center" justify="center">
            <h1> Recent Photo </h1>
          </v-col>
          
          <v-col cols="12" align="center" justify="center">

            <v-img
            :src="getRecentPhoto"
            :lazy-src="getRecentPhoto"
            aspect-ratio="1"
            class="grey lighten-2"
            contain
            max-width="500"
            max-height="300"
            >
            <template v-slot:placeholder>
              <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
              >
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>

      </v-col>

    </v-row>
    <v-row align="center" justify="center">

      <v-col cols="12" align="center" justify="center">
        <h1> Old Photo </h1>
      </v-col>

      <v-col cols="12" align="center" justify="center">

        <v-img
            :src="getOldPhoto"
            :lazy-src="getOldPhoto"
            aspect-ratio="1"
            class="grey lighten-2"
            contain
            max-width="500"
            max-height="300"
            >
        <template v-slot:placeholder>
          <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
          >
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

  </v-col>

</v-row>



<v-row>

  <v-col cols="12" align="center" justify="center">
    <h1> Group Photo </h1>
  </v-col>
  



  <v-col cols="12" sm="6" offset-sm="3">
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col
          
          v-for="(photo) in group_photo"
          :key="photo.id"
          
          class="d-flex child-flex"
          cols="4"
          >
          <v-card flat tile class="d-flex">
            <v-img
            :src="getGroupPhoto+photo"
            :lazy-src="getGroupPhoto+photo"
            
            contain
            class="grey lighten-2" @click="zoom_in(getGroupPhoto+photo , 'Group Photo')"
            >
            <template v-slot:placeholder>
              <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
              >
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</v-card>
</v-col>
</v-row>




</v-card>
</v-dialog>







<v-row justify="center">

  <v-dialog v-model="dialog1"  max-width="700px">
    <v-card>
      <v-card-title>Image</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="max-height: 400px;">

        <v-row align="center" justify="center">
          <v-img
          :src="dialog_photo"
          class="grey lighten-2"
          
          contain
          max-width="400" max-height="400"
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

</v-row>



</template>


<script>



  export default {
    name: 'user_gallery',
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
    computed:{
      getRecentPhoto(){
        let recent_photo;
        this.recent_photo == 'not_set' ? recent_photo = this.$store.getters.getUploadDirectory.recentPhoto_directory+'default.jpg' : recent_photo = this.$store.getters.getUploadDirectory.recentPhoto_directory + this.recent_photo;

        return recent_photo;

      },
      getOldPhoto(){


       let old_photo;
       this.old_photo == 'not_set' ? old_photo = this.$store.getters.getUploadDirectory.oldPhoto_directory+'default.jpg' : old_photo = this.$store.getters.getUploadDirectory.oldPhoto_directory + this.old_photo;

       return old_photo;
     },
     getGroupPhoto(){

          return this.$store.getters.getUploadDirectory.groupPhoto_directory;


     }

   },
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