import Vue from "vue";
import Router from "vue-router";
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import ChangePassword from "./views/ChangePassword.vue";
import ImageDetailed from "./views/ImageDetailed.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/changepassword",
      name: "changepassword",
      components: {
        header: AppHeader,
        default: ChangePassword,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    },
    {
      path: "/imagedetailed",
      name: "imagedetailed",
      components: {
        header: AppHeader,
        default: ImageDetailed,
        footer: AppFooter
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
