<template>
  <v-app class="grey" > 

   <v-container>
    <v-row justify="center" >
      <v-col cols="12" md="7" xl="7" class="green white--text text-center">

        <h2> Import User Data </h2>

      </v-col>


      <v-col cols="12">
      </v-col>
      <v-col cols="12" xl="7" md="7" class="white" >

        <h4 class="my-3"> Choose File To Download </h4>

        <v-file-input v-model="user_import_data_file" label="File input" accept="application/json" outlined dense show-size></v-file-input>

        <v-btn @click="handleUpload_user_data" color="primary"  :loading="loading" block>
          Start Importing
        </v-btn>

      </v-col>


      <v-col cols="12" md="7" xl="7">

        <slot name="buttons" ></slot>
        
      </v-col>

    </v-row>


    <v-row justify="center">


      <v-dialog
      v-model="dialog"
      max-width="290"
      >
      <v-card>
        <v-card-title class="headline">Status</v-card-title>

        <v-card-text class="black--text">
         {{ dialog_text }}
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

</v-container>

</v-app>
</template>



<script>
// @ is an alias to /src
import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'

export default {
  name: 'import_user_data',
  mixins: [ profile_info_and_privacy_Mixins  ] ,
  components: {}, 
  data: ()=>({
    user_import_data_file: [],
    dialog_text: '',

  }), 
  created(){



  },
  methods: {
    handleUpload_user_data(){


      if( this.user_import_data_file != undefined && this.user_import_data_file.length != 0  ){

        this.loading = true;
        console.log( this.user_import_data_file);
        let formData = new FormData();
        formData.append('user_import_data_file', this.user_import_data_file);


        this.$axios.post( this.$store.getters.getModelAddress_laravel+'import_user_data' ,
          formData,
          { 
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          ).then(function(response){

            this.loading = false;
            console.log(response);

            this.dialog = true;
            this.dialog_text = 'Imported successfully';

          }.bind(this))
          .catch(function(){
            this.loading = false;
            this.dialog = true;
            this.dialog_text = 'Import Failed';
          }.bind(this));

        }else{

          console.log('no file');
          this.dialog = true;
          this.dialog_text = 'no file selected';

        }

      },


    },
    submit(){},

  }
</script>

<style>
</style>