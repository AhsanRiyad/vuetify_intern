import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import VueResouce from 'vue-resource'
import axios from 'axios'
import { store } from './store/store'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

// set default config
VueCookies.config('7d');

// export const bus = new Vue();

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;




/*Vue.mixin({
  data: () => ({

  }),
  computed: {

  },
  created: function () {}
})*/



new Vue({
  router,
  vuetify,
  store: store,
  render: function (h) { return h(App) },
  methods:{},
  beforeCreate(){

    //this.$cookies.isKey('email') ? alert(true) : alert(false); 
        
    
  }
}).$mount('#app')
