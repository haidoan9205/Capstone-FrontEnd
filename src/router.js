import Vue from "vue";
import Router from "vue-router";
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import ChangePassword from "./views/ChangePassword.vue";
import Photo from "./views/Photo.vue";
import Cart from "./views/Cart.vue";
import MenuProfile from "./views/components/Navigation/MenuProfile.vue";
import UploadPhoto from "./views/UploadPhoto.vue";
import YourPhoto from "./views/YourPhoto.vue";
import Checkout from "./views/Checkout.vue";
import YourPhotoDenied from "./views/YourPhotoDenied.vue";
import Search from "./views/Search.vue";

Vue.use(Router);

export default new Router({
    linkExactActiveClass: "active",
    routes: [{
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
               
            }
        },
        {
            path: "/login",
            name: "login",
            components: {
                header: AppHeader,
                default: Login,
            }
        },
        {
            path: "/register",
            name: "register",
            components: {
                header: AppHeader,
                default: Register,
             
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
            path: "/checkout",
            name: "checkout",
            components: {
                header: AppHeader,
                default: Checkout,
                footer: AppFooter
            }
        },
        {
            path: "/photo/:photoId",
            name: "photo",
            components: {
                header: AppHeader,
                default: Photo,
                footer: AppFooter
            },
            props: true,
        },
        {
            path: "/cart",
            name: "cart",
            components: {
                header: AppHeader,
                default: Cart,
                footer: AppFooter
            },
            props: true,
        },
        {
            path: "/upload",
            name: "upload",
            components: {
                header: AppHeader,
                default: UploadPhoto,
                footer: AppFooter
            }
        },
        {
            path: "/uploaded/:userId",
            name: "yourphoto",
            components: {
                header: AppHeader,
                default: YourPhoto,
                footer: AppFooter
            },
            props: true,
        },
        {
            path: "/denied/:userId",
            name: "yourphotodenied",
            components: {
                header: AppHeader,
                default: YourPhotoDenied,
                footer: AppFooter
            },
            props: true,
        },
        {
            path: "/search",
            name: "search",
            components: {
                header: AppHeader,
                default: Search,
                footer: AppFooter
            },
            props: true,
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