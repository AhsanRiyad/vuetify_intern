<template>
<v-app>
<toolbar v-if="isLogin.isLogin"></toolbar>
<router-view></router-view>
</v-app>
</template>

<script>
// import { bus } from '@/main'
import cookie_mixins from '@/mixins/cookie_mixins'
import toolbar from '@/views/toolbar.vue'

export default {
name: 'App',
mixins: [cookie_mixins],
components: {
toolbar,
},

data: () => ({
login: false,
}),
computed: {
isLogin(){
  return this.$store.getters.auth;
}
},
beforeCreate(){

		

},
created(){




}
};
</script>
