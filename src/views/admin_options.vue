<template>
  <v-app class="grey" > 


   <v-container>
    <v-row justify="center" >

      <v-col cols="12" md="7" xl="7" class="green white--text text-center">
        <h2 > Select Option From Below Table </h2>
      </v-col>


      <v-col cols="12">
      </v-col>


      <v-col cols="12" xl="7" md="7" >

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr class="blue ">
                <th class="text-left white--text headline py-5">Name</th>
                <th class="text-left white--text headline py-5">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-left white--black ">
                <td class=" py-5">Change Label of Institution ID</td>
                <td class=" py-5">



                  <v-select @change="change_label()"

                  v-model ="institution_id_label"
                  :items="items"
                  label="Institution Id"
                  ></v-select>

                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>


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

export default {
  name: 'admin_options',
  data: ()=>({
    items: ['Institution ID' ,'School ID' , 'College ID' , 'School Roll' , 'College Roll' , 'University Roll'],
    institution_id_label: '',
    dialog : false,
    dialog_text: '',

  }), 

  created(){
      // this.institution_id_label = this.institution_id_label__;

    },
    methods: {
      change_label(){

        this.$axios.post( this.$store.getters.modeladmin_options ,
        {
          purpose: 'change_institution_id_label',
          institution_id_label: this.institution_id_label,

        }
        ).then(function(response){
          console.log(response);

          if(response.data == 'success'){
            this.dialog_text = 'Label Changed Successfully';
            this.dialog = true;

          }else{
            this.dialog_text = 'Server Problem';
            this.dialog = true;

          }
        }.bind(this))
        .catch(function(){

        }.bind(this));


      }


    }


  }



</script>
