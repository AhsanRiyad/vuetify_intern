<template>
  <v-card>
    <v-card-title>
      Nutrition
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
    :headers="headers_changes"
    :items="changed_info"
    :search="search"
    ></v-data-table>
  </v-card>
</template>


<script>

import _ from 'lodash'

  export default {
    data () {
      return {
        changed_info: [],


        search: '',

        headers_changes: [
        
        {
          text: 'Field Name',
          align: 'start',
          sortable: false,
          value: 'alias_field_name',
        },
        { text: 'Old Value', value: 'old_value' },
        { text: 'New Value', value: 'new_value' }

        ],



        headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
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


        


      }


    }
  </script>