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
import History from "./views/History.vue";
import ProfileMaster from "./views/ProfileMaster.vue";
import ChangePassword from "./views/ChangePassword.vue";
import ChangeForgotPassword from "./views/ChangeForgotPassword.vue";
import RequestChangePassword from "./views/RequestChangePassword.vue";
import Photo from "./views/Photo.vue";
import Cart from "./views/Cart.vue";
import MenuProfile from "./views/components/Navigation/MenuProfile.vue";
import UploadPhoto from "./views/UploadPhoto.vue";
import YourPhoto from "./views/YourPhoto.vue";
import Checkout from "./views/Checkout.vue";
import YourPhotoDenied from "./views/YourPhotoDenied.vue";
import Unauthorized from "./views/Unauthorized.vue";
import Search from "./views/Search.vue";
import TransactionHistory from "./views/TransactionHistory.vue";
import Sidebar from "./views/Sidebar.vue";
import ProfileStranger from "./views/ProfileStranger.vue";
import TransactionDetail from "./views/TransactionDetail.vue";
import Statistic from "./views/Statistic.vue";
import YourPhotoPending from "./views/YourPhotoPending.vue"
import Feeds from "./views/Feeds.vue"
import ListNormalImage from "./views/ListNormalImage.vue"
import ListExclusiveImage from "./views/ListExclusiveImage.vue"
import Download from "./views/Donwload.vue"

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
            path: "/normal_images",
            name: "normal",
            components: {
                header: AppHeader,
                default: ListNormalImage,
                footer: AppFooter
            }
        },
        {
            path: "/exclusive_images",
            name: "exclusive",
            components: {
                header: AppHeader,
                default: ListExclusiveImage,
                footer: AppFooter
            }
        },
        {
            path: "/changepassword/:userId",
            name: "changepassword",
            components: {
                header: AppHeader,
                default: ChangePassword,
                footer: AppFooter
            },
            props: true,
        },
        {
            path: "/download",
            name: "download",
            components: {
                header: AppHeader,
                default: Download,
                footer: AppFooter
            },
            props: true,
        },
        {
            path: "/changeforgotpassword",
            name: "changeforgotpassword",
            components: {
                header: AppHeader,
                default: ChangeForgotPassword,
                footer: AppFooter
            },
            props: true,
        },
        {
            path: "/news",
            name: "New Feeds",
            components: {
                header: AppHeader,
                default: Feeds,
                footer: Sidebar,
            },
            props: true,
        },
        {
            path: "/sidebar",
            name: "sidebar",
            components: {
                header: AppHeader,
                default: Sidebar,
                footer: AppFooter
            },
            props: true,
        },
        {
            path: "/requestchangepassword",
            name: "requestchangepassword",
            components: {
                header: AppHeader,
                default: RequestChangePassword,
                footer: AppFooter
            },
            props: true,
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
            path: "/unauthorized",
            name: "unauthorized",
            component: Unauthorized,

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
            name: "profileMaster",
            components: {
                header: AppHeader,
                default: ProfileMaster,
                footer: Sidebar
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
            path: "/stranger/:userId",
            name: "Profile",
            components: {
                header: AppHeader,
                default: ProfileStranger,
                footer: AppFooter
            },
            props: true,
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
                footer: Sidebar
            }
        },
        {
            path: "/transactionDetail/:transactionId",
            name: "transactionDetail",
            components: {
                header: AppHeader,
                default: TransactionDetail,
                footer: Sidebar
            },
            props: true,
        },
        {
            path: "/statistic",
            name: "statistic",
            components: {
                header: AppHeader,
                default: Statistic,
                footer: Sidebar
            },
            props: true,
        },
        {
            path: "/uploaded",
            name: "yourphoto",
            components: {
                header: AppHeader,
                default: YourPhoto,
                footer: Sidebar
            },
            props: true,
        },
        {
            path: "/denied",
            name: "yourphotodenied",
            components: {
                header: AppHeader,
                default: YourPhotoDenied,
                footer: Sidebar
            },
            props: true,
        },
        {
            path: "/pending",
            name: "yourphotopending",
            components: {
                header: AppHeader,
                default: YourPhotoPending,
                footer: Sidebar
            },
            props: true,
        },
        {
            path: "/boughtphoto",
            name: "boughtphoto",
            components: {
                header: AppHeader,
                default: TransactionHistory,
                footer: Sidebar
            },
            props: true,
        },
        {
            path: "/history",
            name: "history",
            components: {
                header: AppHeader,
                default: History,
                footer: Sidebar
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