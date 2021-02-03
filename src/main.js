
import Vue from "vue";
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import store from './store';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';


Vue.use(VueMaterial);

// import Vue from 'vue'




Vue.use(VueRouter);
const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const token = window.localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}




Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(Vuex);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
