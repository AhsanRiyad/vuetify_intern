<template>
  <v-app class="grey" > 
    <v-container class="white" >


      <v-row align="center">
        <v-col offset="1" cols="5" md="4">

          <v-text-field
          v-model="search_text"
          label="Search"
          @keyup="search()"
          required
          ></v-text-field>

        </v-col>
        
        <v-col offset-md="1" cols="5" md="4">


          <v-select @change="search()"
          v-model="category"
          :items="category_items"
          label="Category"
          value="true"
          required
          ></v-select>


        </v-col>
        
        


        <v-col cols="12">


          <v-progress-linear 
          :indeterminate="indeterminate"
          :color="progress_color"
          ></v-progress-linear>


        </v-col>



      </v-row>



      <v-row>
        <v-col>
          <h1 align="center"  class="green darken-1 white--text py-6"> Search Result </h1>
          <v-simple-table >
           <template v-slot:default>
            <thead >
              <tr >
                <th class="text-left">Name</th>
                <th class="text-left">Membership No</th>
                <th class="text-left">Instituion ID</th>
                <th class="text-left">Gallery</th>
                <th class="text-left">Details</th>
              </tr>
            </thead>
            
            <tbody >
              <tr  id="tbody"  v-for="user in getFilteredArray"    :key='user.id'>

                <td> {{ user.full_name }} </td>
                <td> {{ user.membership_number }} </td>
                <td> {{ user.institution_id }} </td>
                
                <td>

                  <gallery :email='user.email' :user_id='user.id' ></gallery>
                </td>

              


              <td>
                <get_details  v-on:update:search="search()" :email='user.email' :user_id='user.id'  :category="category" :search_text="search_text" ></get_details>
              </td>




            </tr>
          </tbody>


        </template>
      </v-simple-table>




    </v-col>
  </v-row>





</v-container>
</v-app>
</template>


<script>

  import get_details from '@/views/get_details.vue'
  import gallery from '@/views/gallery.vue'
  


  export default {
    name: 'search',
    components: {
      'get_details': get_details,
      'gallery': gallery,
    },
    data: ()=>({
      category: 'Full Name',
      category_items: [
      'Full Name',
      'Institution ID',
      'Membership Number',
      ],
      indeterminate: false,
      progress_hidden: true,
      progress_color: 'white',
      search_text: '',
      user_list : [], 
      array_size: true ,
      users_info_as_props: {},
    }),
    computed:{

      getFilteredArray(){

        let arrayNew =  this.user_list.filter( (value) => {

         return this.$store.getters.getAllInfo.id != value.id && value.email != 'admin@admin.com' ;

       });

        // this.user_list = arrayNew;
        return arrayNew;


      }


    },
    methods: {
      institution_id_item(){
        this.category_items = ['Full Name',
        'Membership Number'];

        return this.category_items;
      },
      search(){
        //console.log(this.search_text);
        //console.log(this.category);
        this.indeterminate = true;
        this.progress_hidden=false;
        this.progress_color = 'red';
        this.$axios.post( this.$store.getters.modelSearch ,
        {
          purpose: this.category ,
          search_text: this.search_text,
          main_purpose : 'search',

        }
        ).then(function(response){

          console.log(response);

          if(response.data.length == 1){
            this.user_list = []; 
            this.user_list[0] =  JSON.parse(response.data);

            // this.$store.commit('setSearchResult' , this.user_list[0]);

            // console.log(this.user_list[0]);
          }else if(response.data.length > 1){
            this.user_list =  response.data;
            // console.log(this.user_list[0].email);

            // this.$store.commit('setSearchResult' , this.user_list);

          }else if(response.data == 0){
            this.user_list =  [];
            // this.$store.commit('setSearchResult' , this.user_list);
          }
          console.log(this.user_list);


          this.progress_hidden=true;
          this.indeterminate = false;
          this.progress_color = 'white';

        }.bind(this))
        .catch(function(error){

          console.log(error);

          this.indeterminate = false;
          this.progress_hidden=true;
          this.progress_color = 'white';
          // 
        }.bind(this));


      }


    },
    created(){
      this.$store.getters.getAllInfo.type == 'admin' ? this.category_items.push("Rejected User" , "Newly Registered") : '';

      this.users_info_as_props = this.$store.getters.getAllInfo;
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



    }



  }



</script>