<template>
  <v-app>
	<h1> I am login  </h1>


	<h1 @click="submit()" > I am name {{ name }}</h1>

	<div>
    <v-alert type="success">
      I'm a success alert.
    </v-alert>

    <v-alert type="info">
      I'm an info alert.
    </v-alert>

    <v-alert type="warning">
      I'm a warning alert.
    </v-alert>

    <v-alert type="error">
      I'm an error alert.
    </v-alert>
  </div>





</v-app>

</template>

<script>
// @ is an alias to /src


export default {
  name: 'Login',


  data: ()=>({
  	name: 'riyad',


  }), 

  methods: {
  	submit(){
  		alert('riyad');
  	}
  }

 
}
</script>
