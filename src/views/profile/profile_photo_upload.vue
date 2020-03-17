<template>
  <v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="8" xl="4" >



          <slot name="verification_alert"></slot>

          <v-file-input  @change="handleFileUpload_recent()" v-model="recent_photo" show-size accept="image/*" label="Recent Photo"></v-file-input>
          
          <!-- <input type="file" ref="recent_photo" @change="handleFileUpload_recent()"> -->

          <v-btn 
          color="success"
          class="my-4"
          @click="uploadPhoto_recent()"
          :loading="loading_recent_photo"
          >
          Upload
        </v-btn>  

        <v-file-input  @change="handleFileUpload_old()" v-model="old_photo" show-size accept="image/*" label="old Photo"></v-file-input>

        <v-btn 
        color="success"
        class="my-4"
        @click="uploadPhoto_old()"
        :loading="loading_old_photo"

        >
        Upload
      </v-btn>

      <v-file-input @change="handleFileUpload_group()" v-model="group_photo" show-size accept="image/*" label="Group Photo"></v-file-input>

      <v-btn 
      color="success"
      class="my-4"
      @click="uploadPhoto_group()"
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
      recent_photo_name: 'choose file',
      old_photo: null,
      old_photo_name: 'choose file',
      group_photo: null,
      group_photo_name: 'choose file',
      loading_recent_photo:false,
      loading_old_photo:false,
      loading_group_photo:false,
      file_type: false,
      profile_photo: '',
      loading: false,
    }),

    methods: {


      uploadPhoto_recent: function(){
        //alert(this.csrf_token1);
        if(this.file_type == true){
          this.loading_recent_photo = true;
          let formData = new FormData();
          formData.append('recent_photo', this.recent_photo);
          formData.append('purpose', 'recent_photo');
          formData.append('email', this.$store.getters.getAllInfo.email);
          formData.append('user_id', this.$store.getters.getAllInfo.id);
          // formData.append('email', 'riyad298@gmail.com');
          // formData.append('user_id', 1);
          this.loading = true;

        

          this.$axios.post( this.$store.getters.modelProfile_photo_upload, 
            formData,
            { 
              headers: {
                'Content-Type': 'multipart/form-data '
              }
            }
            ).then(function(response){
              this.loading_recent_photo = false;
              response.data == 'success' ? this.status = 'upload successful' : this.status = 'problem uploading your photo, try again';
              
              console.log(response);
              this.loading = false;
              this.dialog = true;
              this.recent_photo_name = 'choose file';
              
            }.bind(this))
            .catch(function(){
              this.loading_recent_photo = false;
              this.status = 'You are not authorized';
              this.dialog = true;
              this.recent_photo_name = 'choose file';
            }.bind(this));
            
            this.file_type = false;
          }else{
            this.status = 'select right type of file first';
            this.dialog = true;
          }
        },
        handleFileUpload_recent: function(){


          if(this.recent_photo != null){



        //console.log(this.recent_photo.size/1024/1024);
        var patt = /^(image\/){1}[A-Za-z]*/g;
        var result = patt.test(this.recent_photo.type);
        if(!result){
          this.file_type = false;
          this.status = 'incorrect file type\n select again';
          this.dialog = true;
        }else if(this.recent_photo.size/1024/1024 > 1.5){

          this.file_type = false;
          this.status = 'Size limit exceeds, maximum size 1.5MB';
          this.dialog = true;
        }
        else{
          this.file_type = true;
          this.recent_photo_name = this.recent_photo.name.slice(0,15);
          
        }
        

      }

    },
    uploadPhoto_old: function(){
        //alert(this.csrf_token1);
        if(this.file_type == true){
          this.loading_old_photo = true;
          let formData = new FormData();
          formData.append('old_photo', this.old_photo);
          formData.append('purpose', 'old_photo');
          formData.append('email', this.$store.getters.getAllInfo.email);
          formData.append('user_id', this.$store.getters.getAllInfo.id);
          // formData.append('email', 'riyad298@gmail.com');
          // formData.append('user_id', 1);
          formData.append('csrf_token1', this.csrf_token1);
          this.$axios.post( this.$store.getters.modelProfile_photo_upload,
            formData,
            { 
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            ).then(function(response){
              this.loading_old_photo = false;
              console.log(response);

              response.data == 'success' ? this.status = 'upload successful' : this.status = 'problem uploading your photo, try again';
              this.dialog = true;
              this.old_photo_name = 'choose file';
              
            }.bind(this))
            .catch(function(){
              this.loading_old_photo = false;
              this.status = 'You are not authorized';
              this.dialog = true;
              this.old_photo_name = 'choose file';
              
            }.bind(this));
            
            this.file_type = false;
          }else{
            this.status = 'select right type of file first';
            this.dialog = true;
          }
        },
        handleFileUpload_old: function(){


          if(this.old_photo != null){
        //console.log(this.old_photo.size/1024/1024);
        var patt = /^(image\/){1}[A-Za-z]*/g;
        var result = patt.test(this.old_photo.type);
        if(!result){
          this.file_type = false;
          this.status = 'incorrect file type\n select again';
          this.dialog = true;
        }else if(this.old_photo.size/1024/1024 > 1.5){

          this.file_type = false;
          this.status = 'Size limit exceeds, maximum size 1.5MB';
          this.dialog = true;
        }
        else{
          this.file_type = true;
          this.old_photo_name = this.old_photo.name.slice(0,15);
          
        }
        

      }

    },
    uploadPhoto_group: function(){
        //alert(this.csrf_token1);
        if(this.file_type == true){
          this.loading_group_photo = true;
          let formData = new FormData();
          formData.append('group_photo', this.group_photo);
          formData.append('purpose', 'group_photo');
          formData.append('email', this.$store.getters.getAllInfo.email);
          formData.append('user_id', this.$store.getters.getAllInfo.id);
          // formData.append('email', 'riyad298@gmail.com');
          // formData.append('user_id', 1);
          formData.append('csrf_token1', this.csrf_token1);
          this.$axios.post( this.$store.getters.modelProfile_photo_upload,
            formData,
            { 
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            ).then(function(response){
              this.loading_group_photo = false;
              response.data == 'success' ? this.status = 'upload successful' : this.status = 'problem uploading your photo, try again';
              this.dialog = true;
              this.group_photo_name = 'choose file';
              
            }.bind(this))
            .catch(function(){
              this.loading_group_photo = false;
              this.status = 'You are not authorized';
              this.dialog = true;
              this.group_photo_name = 'choose file';
              //console.log(error);
            }.bind(this));
            
            this.file_type = false;
          }else{
            this.status = 'select right type of file first';
            this.dialog = true;
          }
        },
        handleFileUpload_group: function(){
        //alert('uploading files');

        if(this.group_photo != null){


        //console.log(this.group_photo.size/1024/1024);
        var patt = /^(image\/){1}[A-Za-z]*/g;
        var result = patt.test(this.group_photo.type);
        if(!result){
          this.file_type = false;
          this.status = 'incorrect file type\n select again';
          this.dialog = true;
        }else if(this.group_photo.size/1024/1024 > 1.5){

          this.file_type = false;
          this.status = 'Size limit exceeds, maximum size 1.5MB';
          this.dialog = true;
        }
        else{
          this.file_type = true;
          this.group_photo_name = this.group_photo.name.slice(0,15);
          
        }
        



      }
    }
  }



}



</script>