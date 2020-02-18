<template>


<div class="text-center ma-2">
    
    <v-snackbar
      v-model="snackbar"
      top
      color="error"
    >
      {{ text }}
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>

</template>

<script>
// @ is an alias to /src
// import { bus } from '@/main'

export default {
	name: 'noInternetSnackBar',
	data: ()=>({
		text: 'Internet connection problem',
    snackbar: false,
    
	}),
  methods: {
    startSnackBar(){
      this.snackbar = true;
    },
    stopSnackBar(){
      this.snackbar = false;
    },
  },
	created(){

    

	},
	updated(){

    

	}
}
</script>
