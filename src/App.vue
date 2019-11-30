<template>
  <v-app>
  <toolbar v-if="isLogin"></toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import { bus } from '@/main'

import toolbar from '@/views/toolbar.vue'

export default {
  name: 'App',

   components: {
    toolbar,
  },

  data: () => ({
    login: false,
  }),
  computed: {
    isLogin(){

        return this.$store.state.isLogin;

    }
  }/*
  created(){
    bus.$on('login_status' , (data)=>{

      this.login = data;


    })
  }*/
};
</script>
