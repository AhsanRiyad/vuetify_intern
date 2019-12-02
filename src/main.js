import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import VueResouce from 'vue-resource'
import axios from 'axios'
import { store } from './store/store'
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
/*
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    };
*/

   /* this.$axios.post('http://www.localhost/vue/address.php', {
      title: 'Notebook',
      body: '',
      userId: 1,
    }, axiosConfig )
      .then(function (response) {

        console.log(response);

      }.bind(this))
      .catch(function () {

      }.bind(this));*/
  
}).$mount('#app')
