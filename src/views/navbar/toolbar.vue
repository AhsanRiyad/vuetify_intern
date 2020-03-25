<template>
  <div>
    <v-app-bar 
    color="deep-purple accent-4" 
    dark
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title> {{  this.$store.getters.getPageTitle }} </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn @click="titleChange('Search')" icon router :to="{ name : 'search' }">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu
    left
    bottom
    >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title > <v-btn router :to="{ name : 'login' }">Logout</v-btn> </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</v-app-bar>



<v-navigation-drawer
v-model="drawer"
absolute
temporary
>
<v-list-item>
  <v-list-item-avatar>
    <v-img :src="profile_photo"></v-img>
  </v-list-item-avatar>

  <v-list-item-content>
    <v-list-item-title> {{ this.$store.getters.getAllInfo.full_name }} </v-list-item-title>
  </v-list-item-content>
</v-list-item>

<v-divider></v-divider>

<v-list dense>

  <v-list-item 
  v-for="item in getMenuList"
  :key="item.title"
  link>
  

<v-list-item-content @click="titleChange(item.title)">

  <router-link    :to=' { name : `${item.name}` }' 
  class="green py-3 my-n1 white--text text-center"
  active-class = "secondary"  
  >
  <v-list-item-title> {{ item.title  }}
  

  <span class="blue mx-1 px-2" v-if="item.name == 'new_user_request'" > {{ $store.getters.getCountRequest.verificationRequest }} </span>
  <span class="blue mx-1 px-2" v-else-if="item.name == 'data_update_request'" > {{ 
  $store.getters.getCountRequest.changeRequest
  
   }} </span>

  </v-list-item-title>
  
</router-link>

</v-list-item-content>

</v-list-item>
</v-list>
</v-navigation-drawer>
</div>




</template>
<script>
  export default {
    name: 'toolbar' ,
    data () {
      return {
        verificationRequest: 0,
        changeRequest: 0,
        absolute: true,
        drawer: null,
        items: [
        { title: 'Profile', name: 'profile' , link: '/profile' },
        { title: 'Add User', name: 'add_user' , link: '/add_user' },
        { title: 'New User Request', name: 'new_user_request' , link: '/new_user_request' },
        { title: 'Data Update Request', name: 'data_update_request' , link: '/data_update_request' },
        { title: 'Gallery', name: 'gallery' , link: '/gallery' },
        { title: 'Privacy', name: 'data_privacy' , link: '/data_privacy' },
        { title: 'Admin Options', name: 'admin_options' , link: '/admin_options' },/*
        { title: 'Logout',  name: 'login' , link: '/login'  },*/
        ],
        green : true,
        secondary: false,
        profile_photo: 'default.jpg',
        
      }
    },

    updated(){

      
      if(this.$store.getters.getAllInfo.recent_photo == ''){
      this.profile_photo = this.$store.getters.getUploadDirectory.recentPhoto_directory+'default.jpg';
      }else{

      this.profile_photo = this.$store.getters.getModelAddress_laravel+this.$store.getters.getAllInfo.recent_photo;

      }
      this.verificationRequest = this.$store.getters.getCountRequest.verificationRequest;
      this.changeRequest = this.$store.getters.getCountRequest.changeRequest;

    },

    computed:{
      getMenuList(){
        if(this.$store.getters.isAdmin){
          return this.items;
        }else{
          return  [
          { title: 'Profile', name: 'profile' , link: '/profile' },
          { title: 'Gallery', name: 'gallery' , link: '/gallery' },
          { title: 'Privacy', name: 'data_privacy' , link: '/data_privacy' }
          ];
        }
      }
    },

    methods: {
      checkAdmin(title){

        if(this.$store.getters.isAdmin ){
          return true;
        }else{
          if(title == 'gallery' || title == 'profile' || title == 'data_privacy' || title == 'search' ){
            return true;
          }
        }

      },
      colorChange(){
        console.log('color change');
      },
      titleChange(name){

        this.$store.commit('setPageTitle' , name);
      }
    }
    
  }
</script>



<style scoped>

  .v-navigation-drawer>.v-list:not(.v-list--dense) .v-list__tile {
    text-decoration: none;
  }

  .highlighted{
    background-color: 'red';
    color: 'yellow';
  }

</style>
