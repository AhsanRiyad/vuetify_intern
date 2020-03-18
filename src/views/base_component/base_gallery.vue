<template>
  <v-container>

        <v-row align="center" justify="center">

          <v-col cols="12" align="center" justify="center">
            <h1> Recent Photo </h1>
          </v-col>
          
          <v-col cols="12" align="center" justify="center">

            <v-img
            :src=" recent_photo "
            :lazy-src=" recent_photo "
            aspect-ratio="1"
            class="grey lighten-2"
            contain
            max-width="500"
            max-height="300"
            @click=" (dialog_photo =  recent_photo) "
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



      <v-col cols="12" align="center" justify="center">
        <h1> Old Photo </h1>
      </v-col>

      <v-col cols="12" align="center" justify="center">

        <v-img
        :src=" old_photo "
        :lazy-src=" old_photo "
        aspect-ratio="1"
        class="grey lighten-2"
        contain
        max-width="500"
        max-height="300"
        @click="  (dialog_photo =  old_photo)"
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
<noInternetSnackBar ref="snackbar" ></noInternetSnackBar>
  <v-col cols="12" align="center" justify="center">
    <h1> Group Photo </h1>
  </v-col>
  


  <v-col cols="12" sm="6" offset-sm="3">
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col
          
          v-for="(photo) in group_photos"
          :key="photo.id"
          
          class="d-flex child-flex"
          cols="4"
          >
          <v-card flat tile class="d-flex">
            <v-img
            :src="  $store.getters.assetsRootDirectory+'img/uploads/group_photos/'+photo.group_photo  "
            :lazy-src=" $store.getters.assetsRootDirectory+'img/uploads/group_photos/'+photo.group_photo    "
            
            @click=" ( dialog1 = true ) , ( dialog_photo =  $store.getters.assetsRootDirectory+'img/uploads/group_photos/'+photo.group_photo  ) , ( photo_base_name = photo.group_photo ) "

            contain
            class="grey lighten-2" 
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


<!-- photo zoom dialog starts-->


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

            <p class="red--text"> <b>{{ photo_delete_status }} </b></p>


          </v-row>
          <v-row>
            <v-col xs="12" v-if="$store.getters.getComponentName == 'gallery' ">

              <v-btn :disabled="button_disabled" @click=" ()=>{ deletePhoto( photo_base_name) }" large :loading='loading' color="error"  >Delete</v-btn>
              <v-btn large color="primary"  @click=" (dialog1 = false) , photo_delete_status = '' ">Close</v-btn>
 

            </v-col>
          </v-row> 
          

        </v-container>

      </v-card-actions>


    </v-card>
  </v-dialog>
</v-row>

  </v-container>

</template>


<script>

  // import user_gallery from '@/views/user_gallery.vue'
  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'
  import noInternetSnackBar from '@/views/noInternetSnackBar'


  export default {
    name: 'base_gallery',
    mixins: [ profile_info_and_privacy_Mixins ] ,

    props: ['email' , 'user_id'],
    components: {
      // 'get_details': get_details,
      // 'user_gallery': user_gallery,
      'noInternetSnackBar': noInternetSnackBar,



    },

    data: ()=>({
      


    }),
    computed:{

    },
    methods: {
    },
    created(){


      console.log('user_id '+ this.user_id);
      console.log('email '+ this.email);

      this.getPhotosForAll(this.user_id , this.email);




    }
  }



</script>