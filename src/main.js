import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import VueResouce from 'vue-resource'
import axios from 'axios'


Vue.prototype.$axios = axios;

Vue.config.productionTip = false

Vue.mixin({
  data: () => ({
    model: {
      modelLogin: 'http://www.localhost/vue/model/login.php',
      modelRegistration: 'http://www.localhost/vue/model/registration.php',
    },
    address: {
      registrationPage: 'http://localhost:8080/#/registration',
      loginPage: 'http://localhost:8080/#/login',
    },


  }),
  created: function () {}
})

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) },
  created(){


    let axiosConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    };


    this.$axios.post('http://www.localhost/vue/address.php', {
      title: 'Notebook',
      body: '',
      userId: 1,
    }, axiosConfig )
      .then(function (response) {

        console.log(response);

      }.bind(this))
      .catch(function () {

      }.bind(this));
  }
}).$mount('#app')
