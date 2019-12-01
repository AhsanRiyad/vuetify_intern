<template>
  <div>
    <v-app-bar 
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

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
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
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
    <v-list-item-title>John Leider</v-list-item-title>
  </v-list-item-content>
</v-list-item>

<v-divider></v-divider>

<v-list dense>

  <v-list-item
  v-for="item in items"
  :key="item.title"
  link
  >
  <v-list-item-icon>
    <v-icon>{{ item.icon }}</v-icon>
  </v-list-item-icon>

  <v-list-item-content>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
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
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
        ],
      }
    },
    
  }
</script>



<style >

  .v-navigation-drawer>.v-list:not(.v-list--dense) .v-list__tile {
    text-decoration: none;
  }

</style>
