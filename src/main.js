import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import "./registerServiceWorker";
import store from "./store";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import VueSimpleAlert from "vue-simple-alert";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueContext from 'vue-context';
import LightTimeline from 'vue-light-timeline';
Vue.use(Loading);
Vue.use(VueMaterial);
Vue.use(VueSidebarMenu);
Vue.use(VueContext);
Vue.use(router);
Vue.use(LightTimeline);
// import Vue from 'vue'

Vue.use(VueToast);

Vue.use(VueRouter);
const vuexLocalStorage = new VuexPersist({
    key: "vuex", // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    // reducer: state => state,
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
});



const token = window.localStorage.getItem("token");
if (token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] = "Bearer " + token;
}


window.Event = new Vue();
Vue.use(Chartkick.use(Chart));
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(Vuex);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");