<template>
  <v-container>
<v-card>

    <v-card-title>
     Search People
      <v-spacer></v-spacer>

      <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      ></v-text-field>
    </v-card-title>


    <v-data-table
    :headers=" headers_search "
    :items="$store.getters.getPeopleSearchList"
    class="elevation-1"
    :search="search"
    :loading="table_loading" loading-text="Loading... Please wait"
    >

    <template v-slot:item.gallery="{ item }">


       <user_gallery :email='item.email' :user_id='item.id' ></user_gallery>

      <!-- <v-btn :color="getColor(item.Calcium)" dark>{{ item.Calcium }}</v-btn> -->
    </template>

    <template v-slot:item.profile="{ item }">


       <get_details  :email='item.email' :user_id='item.id' ></get_details>

      <!-- <v-btn :color="getColor(item.Calcium)" dark>{{ item.Calcium }}</v-btn> -->
    </template>


    <template  v-slot:item.status="{ item }">

      <v-chip dark class="white--text"
      :color=" item.status == 'rejected' ? 'red' : item.status == 'approved' ? 'green' : 'warning' ">
        {{ item.status  }}
      </v-chip>
      <!-- <v-btn :color="getColor(item.Calcium)" dark>{{ item.Calcium }}</v-btn> -->
    </template>






</v-data-table>

</v-card>


<noInternetSnackBar ref="snackbar" ></noInternetSnackBar>


</v-container>

</template>

<script>
  import noInternetSnackBar from '@/views/noInternetSnackBar'
  import get_details from '@/views/get_details.vue'
  import user_gallery from '@/views/user_gallery.vue'
  // import data_privacy from '@/views/data_privacy.vue'
  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'
  


  export default {
    name: 'search',
    mixins: [ profile_info_and_privacy_Mixins ] ,
    components: {
      'get_details': get_details,
      'user_gallery': user_gallery,
      // 'data_privacy': data_privacy,
      'noInternetSnackBar': noInternetSnackBar
    },
    data: ()=>({}),
    computed:{



    },
    methods: {},
    created(){
      console.log('search created');

      this.$store.commit('setComponentName' , 'search');


      console.log(this.$store.getters.getAllInfo.email);

      this.getSearchInfo();

      // this.$store.getters.isAdmin  ? this.category_items.push("Rejected User" , "Newly Registered") : '';

      // this.users_info_as_props = this.$store.getters.getAllInfo;
/*

      bus.$on('categroy_from_get_details' , (data)=>{
        this.category = data ; 
        this.search();
        
      })*/
      // this.users_info__.admin__ = true;
     /* 
      this.$axios.post( this.$store.getters.modelSearch ,
      {
        purpose: 'getProfileBasicInfo',
        id:

        main_purpose : 'search_other_option',
        
      }
      ).then(function(response){
        // console.log(response);
        this.users_info_as_props = response.data ;
        
      }.bind(this))
      .catch(function(){



        //
      }.bind(this));*/



    },
    mounted(){
      console.log('search upadated');

      this.$store.commit('setComponentName' , 'search');

    }



  }



</script>