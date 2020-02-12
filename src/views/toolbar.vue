<template>
  <div>
    <v-app-bar 
    color="deep-purple accent-4"
    dark
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title> {{  this.$store.getters.getPageTitle }} </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
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
    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
  </v-list-item-avatar>

  <v-list-item-content>
    <v-list-item-title> {{ this.$store.getters.getAllInfo.full_name }} </v-list-item-title>
  </v-list-item-content>
</v-list-item>

<v-divider></v-divider>

<v-list dense>

  <v-list-item
  v-for="item in items"
  :key="item.title"
  link
  >


  <v-list-item-content>
    <router-link  :to=' { name : `${item.name}` }' 
    class="green py-3 my-n1 white--text text-center"
    :class=" $route.path == item.link ?  secondary = true : ''"
    active-class = "secondary"
    
    >
    <v-list-item-title  > {{ item.title }}</v-list-item-title>
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
        drawer: null,
        items: [
        { title: 'Profile', name: 'profile' , link: '/profile' },
        { title: 'Logout',  name: 'login' , link: '/login'  },
        ],
        green : true,
        secondary: false,
        
      }
    },
    methods: {
      colorChange(){
        console.log('color change');
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
