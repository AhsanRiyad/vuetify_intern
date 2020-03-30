<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >



          <slot name="verification_alert"></slot>

          <v-file-input  v-model="recent_photo" show-size accept="image/*" label="Recent Photo"></v-file-input>
          
          <!-- <input type="file" ref="recent_photo" @change="handleFileUpload_recent()"> -->

          <v-btn 
          color="success"
          class="my-4"
          @click="()=>{upload('recent')}"
          :loading="loading_recent_photo"
          >
          Upload
        </v-btn>  

        <v-file-input v-model="old_photo" show-size accept="image/*" label="old Photo"></v-file-input>

        <v-btn 
        color="success"
        class="my-4"
        @click="()=>{upload('old')}"
        :loading="loading_old_photo"

        >
        Upload
      </v-btn>

      <v-file-input v-model="group_photo" show-size accept="image/*" label="Group Photo"></v-file-input>

      <v-btn 
      color="success"
      class="my-4"
      @click="()=>{upload('group')}"
      :loading="loading_group_photo" 
      >
      Upload
    </v-btn>



    <slot name="buttons"></slot>


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
    <v-card-title class="headline">Photo Upload Status</v-card-title>
    <v-card-text class="black--text">
      {{ status }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
      color="green darken-1"
      text
      @click="dialog = false"
      >
      OK
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</v-row>


</v-app>
</template>


<script>

  export default {
    name: 'profile_photo_upload',
    data: ()=>({

      name: 'riyad---vue',
      dialog: false,
      status: '',
      recent_photo: null,
      old_photo: null,
      group_photo: null,
      loading_recent_photo:false,
      loading_old_photo:false,
      loading_group_photo:false,
      profile_photo: '',
      loading: false,
    }),

    methods: {
      upload: function(purpose){
        //alert(this.csrf_token1);
        let photo = null;

        let make_all_loading_false = ()=>{
          this.loading_recent_photo = false;
          this.loading_old_photo = false;
          this.loading_group_photo  = false;
        }



        purpose == 'recent' ? ( photo = this.recent_photo, this.loading_recent_photo = true ) :
        purpose == 'old' ? ( photo = this.old_photo , this.loading_old_photo = true  ) : 
        purpose == 'group' ? ( photo = this.group_photo , this.loading_group_photo  = true ) : '' ;


        if(photo == '' || photo == null || photo == undefined){ this.status = 'Please Select a photo first';
          this.dialog = true;
          make_all_loading_false();
          return 0; }


        if(photo.size/1024/1024 > 1.2){

          make_all_loading_false();
          this.status = 'Failed!! Maximum upload size is 1MB';
          this.dialog = true;
          return 0;
        }



        let make_loading_false = (response)=>{
          purpose == 'recent' ? ( this.loading_recent_photo = false ) :
          purpose == 'old' ? ( this.loading_old_photo = false  ) : 
          purpose == 'group' ? ( this.loading_group_photo  = false ) : '' ;

          response == 'success' ? this.status = 'upload successful' : this.status = 'problem uploading your photo, try again';

          this.dialog = true;
        }
        
        let formData = new FormData();
        formData.append('photo', photo);
        formData.append('purpose', purpose);
        formData.append('email', this.$store.getters.getAllInfo.email);
        formData.append('user_id', this.$store.getters.getAllInfo.id);
          // formData.append('email', 'riyad298@gmail.com');
          // formData.append('user_id', 1);
          // this.loading = true;

          this.$axios.post( this.$store.getters.getModelAddress_laravel+'photo_upload' , 
            formData,
            { 
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            }
            ).then(function(response){

              console.log(response);
              make_loading_false(response.data);

              
            }.bind(this))
            .catch(function(){
              make_loading_false('failed');
            }.bind(this));







            
          },
        }



      }



    </script>