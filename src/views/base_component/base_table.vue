<template>

<v-app class="grey" > 
    <v-container class="white" >
      <v-row justify="center" align="center"> 
        <v-col cols="12" xl="8" >


        <v-card>
          <v-card-title>
            {{ $store.getters.getComponentName == 'new_user_requset' ? 'New Users' : 'Updates'    }}
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
          :headers="headers_for_base_table"
          :items="items"
          :search="search"
          >

          <template v-slot:item.details="{ item }">


            <change_details :email="item.email">
            </change_details>

          </template>

          <template v-slot:item.user_details="{ item }">


            <user_details :email="item.email">
            </user_details>

          </template>

          <template v-slot:item.accept_change_request="{ item }">


            <v-btn small color="success" :email="item.email" @click="()=>{updatePrivacy('all_info_together' , 'change_request' , 'approved' , item.email , 'forUpdateRequest' ); dialog = true;  }">
              Accept
            </v-btn>

          </template>

          <template v-slot:item.reject_change_request="{ item }">


            <v-btn small color="error" :email="item.email" @click="()=>{updatePrivacy('all_info_together' , 'change_request' , 'rejected' , item.email , 'forUpdateRequest' ); dialog = true } ">
              Reject
            </v-btn>

          </template>


          <template v-slot:item.accept_new_user="{ item }">


            <v-btn small color="success" :email="item.email" @click="()=> {updatePrivacy('all_info_together' , 'status' , 'approved' , item.email , 'forNewUserRequest' ); dialog = true; }">
              Accept
            </v-btn>

          </template>

          <template v-slot:item.reject_new_user="{ item }">


            <v-btn small color="error" :email="item.email" @click=" ()=>{   updatePrivacy( 'all_info_together' , 'status' , 'rejected' , item.email , 'forNewUserRequest'); dialog = true; }">
              Reject
            </v-btn>

          </template>


        </v-data-table>



        <noInternetSnackBar ref="snackbar" ></noInternetSnackBar>



        <v-dialog
        v-model="dialog"
        hide-overlay
        persistent
        width="300"
        >
        <v-card
        color="primary"
        dark
        >
        <v-card-text>
          Updating
          <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>


  </v-card>




</v-col>
</v-row>
</v-container>
</v-app>

</template>


<script>

  import _ from 'lodash'

  import change_details from '@/views/requests/change_details'
  import user_details from '@/views/requests/user_details'

  import profile_info_and_privacy_Mixins from '@/mixins/profile_info_and_privacy_Mixins.js'
  import noInternetSnackBar from '@/views/noInternetSnackBar'


  export default {
    props: [ 'headers_for_base_table' , 'items'  ],
    components: { 
      'change_details': change_details,
      'user_details': user_details,
      'noInternetSnackBar': noInternetSnackBar,
    },
    mixins: [ profile_info_and_privacy_Mixins ],
    data () {
      return {
        changed_info: [],


        search: '',

        headers_changes: [
        {
          text: 'Request From',
          align: 'start',
          sortable: false,
          value: 'full_name',
        },
        { text: 'Time', value: 'change_request_time' },
        { text: 'Details', value: 'details' },
        ],

      }
    },

    created(){

      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'} ;

        this.$axios.post( this.$store.getters.getModelAddress_laravel+'test' ,
        {

        } , headers
        ).then(function(response){
          console.log(response);
          console.log(response.data.new[0]);


          //from all_info_together , coming as an object { first_name: 'Riyad' }
          let new_info = response.data.new[0]; 


          console.log(_.toPairs(new_info));

          
          //make pairs of object key value pair [['first_name', 'Ahsan' ],['Last_name' , 'Riyad'] ]  from all_info_together  
          let toPairsNew =  _.toPairs(new_info);

          // [ 'first_name' , 'riyad' , 'last_name' , 'Ahsan' , 'spouse_name' , 'Malliha' ]
          let flattenNew = _.flatten(toPairsNew);


          // [['first_name', 'Ahsan' , 'Last_name' , 'Riyad'] , ['first_name', 'Ahsan' , 'Last_name' , 'Riyad']] 
          let chunkNewIn4 = _.chunk(flattenNew , 4);

          console.log( _.chunk( _.flatten(toPairsNew) , 4 ) );




          // console.log(withOutNullNew);

          //from data_log table
          let old_info = response.data.old[0];
          console.log(_.toPairs(old_info));
          
          //make pairs of object key value pair, from data_log
          let toPairsOld =  _.toPairs(old_info);


          //removes null values, of all_info_together
          /*let withOutNullOld =  toPairsNew.filter((arr)=>{
            return arr[1] != null;
          })*/


          /*let matchingKey = _.difference(withOutNullNew , toPairsOld);*/

          // console.log(matchingKey);

/*
           let newMatchingPair = 
            toPairsOld.filter((arrOld)=>{

              return (

                withOutNullNew.forEach((arrNew)=>{

                  return arrNew[0] == arrOld[0] ;

                })

                )

              })*/
            // console.log(newMatchingPair);
            
            let i,j;
            let obj = [];
            for(i=0; i<chunkNewIn4.length; i++){

              // console.log(toPairsNew[i][0]);
              // console.log(toPairsOld[i][0]);
              
              for(j=0;j<toPairsOld.length;j++){
              // console.log(toPairsOld[j][0]);

              if(chunkNewIn4[i][0]==toPairsOld[j][0] && chunkNewIn4[i][1]!=toPairsOld[j][1])
              {
                console.log('matching');

                obj.push({
                  field_name: chunkNewIn4[i][0],
                  alias_field_name: chunkNewIn4[i][2],
                  new_value: chunkNewIn4[i][1],
                  old_value: toPairsOld[j][1],

                })
              }
            }



          }
          console.log('printing final object');
          console.log(obj);
          this.changed_info = obj;
              // console.log(withOutNullNew);
              // console.log(toPairsOld);

            }.bind(this))
        .catch(function(){


        }.bind(this));


        


      },
      watch: {
        dialog (val) {
          if (!val) return
            setTimeout(() => (this.dialog = false), 2000);
        },
      }



    }
  </script>