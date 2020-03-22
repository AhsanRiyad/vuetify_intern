<template>
  <v-app>

    <base_table  :headers_for_base_table="headers_for_base_table" :items="this.$store.getters.get_base_table_list"></base_table>
    <noInternetSnackBar ref="snackbar" ></noInternetSnackBar>
  </v-app>
</template>




<script>

  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'
  import noInternetSnackBar from '@/views/noInternetSnackBar'



  export default {
    name: 'get_details',
    components: { 
      'noInternetSnackBar': noInternetSnackBar , 
      'base_table': () => import('@/views/base_component/base_table')
    },
    mixins: [ profile_info_and_privacy_Mixins ],

    props: [  'user_id'  , 'category'  ],
    data: ()=>({

     headers_for_base_table: [
     {
      text: 'Request From',
      align: 'start',
      sortable: false,
      value: 'full_name',
    },
    { text: 'Time', value: 'change_request_time' },
    { text: 'Details', value: 'details', align: 'center', },
    { text: 'Accept', value: 'accept_change_request', align: 'center', },
    { text: 'Reject', value: 'reject_change_request', align: 'center', }
    ],

    items: [],


  }),
    computed:{},
    methods: {

      start_here(){



        this.$store.commit('setComponentName' , 'data_update_request');

      // this.get_data_update_request_list();



      let promise = new Promise((resolve)=>{

        this.get_data_update_request_list(resolve);


      });

      promise.then((response)=>{

        this.items =  response.map((item)=>{

          return {
            full_name: item.full_name,
            change_request_time: this.getMomentDate(item.change_request_time),
            email: item.Email,
          }

        })

        this.$store.commit('set_base_table_list' , [...this.items]);

        console.log('this is from getters');
        console.log(this.$store.getters.get_base_table_list);

        // this.items = [...response];

      })

      /*var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

        this.$axios.post(  this.$store.getters.getModelAddress_laravel+'get_data_update_request_list'  , {
          purpose : 'get_change_req_user'
        } , headers)
        .then(function (response) {
          console.log(response);

           this.items = [...response.data];


        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
        */










      }



    },
    created(){

      // this.start_here();
      this.get_data_update_request_list();


    },
    updated(){

       // this.$store.commit('setComponentName' , 'get_details');
     }
   }



 </script>