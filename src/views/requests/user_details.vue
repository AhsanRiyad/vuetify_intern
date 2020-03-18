<template>
  <v-row justify="center">
    <v-dialog persistent  v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" small>Details</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="(dialog = false) , getSearchInfo()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="(dialog = false) , getSearchInfo()">Save</v-btn>
            <noInternetSnackBar ref="snackbar" ></noInternetSnackBar>

          </v-toolbar-items>
        </v-toolbar>
        

        <base_table :headers_for_base_table="headers_for_base_table" :items="items"></base_table>

      </v-card>
    </v-dialog>
  </v-row>
</template>




<script>



  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'
  import noInternetSnackBar from '@/views/noInternetSnackBar'

  // import base_table from '@/views/base_component/base_table'


  export default {
    name: 'get_details',
    mixins: [ profile_info_and_privacy_Mixins ],
    components: { 
      'noInternetSnackBar': noInternetSnackBar , 
      'base_table': () => import('@/views/base_component/base_table'),
    },
    props: ['email' , 'user_id'  , 'category'  ],
    data: ()=>({

     headers_for_base_table: [
     {
      text: 'Field Name',
      align: 'start',
      sortable: false,
      value: 'field_name',
    },
    { text: 'Field Value', value: 'field_value' },
    ],
    items: [],

  }),
    computed:{},
    methods: {},
    created(){

      console.log('propse email');
      console.log(this.email);
      let promise = new Promise((resolve)=>{

        this.get_info_of_a_particular_user_with_promise( this.email, resolve)


      })


      promise.then((data)=>{

        console.log('im resolved');

        console.log(data);

        let a = Object.entries(data[0]);
        console.log(a);

        let b = a.filter((arr)=>{

          return arr[1]!='' && arr[1]!=null  ;


        })

        let c = b.map((arr)=>{

          return {
            field_name: arr[0],
            field_value: arr[1],
          }


        })

        console.log(c);


        this.items = [...c];

      })


    },
    updated(){

     this.$store.commit('setComponentName' , 'get_details');
   }
 }



</script>