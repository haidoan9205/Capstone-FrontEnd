<template>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <router-link to="/cart" title="Your basket" style="text-decoration:none;">
        <a class="nav-link nav-link-icon  item-nav-bar  nav-menu-item" href="#">
          <i class="fa fa-shopping-basket"></i>
          <span class="nav-link-inner--text">Basket</span>
        </a>
      </router-link>
    </li>
    <li class="nav-item" v-if="!isLoggedIn">
      <router-link to="/login" title="Login" style="text-decoration:none;">
        <a class="nav-link nav-link-icon item-nav-bar  nav-menu-item" href="#">
          <i class="fa fa-sign-in"></i>
          <span class="nav-link-inner--text">Sign in</span>
        </a>
      </router-link>
    </li>

    <li class="nav-item" v-if="isLoggedIn">
      <router-link
        to="/profile"
        title="ProfileMaster"
        style="text-decoration:none;"
      >
        <a class="nav-link nav-link-icon  item-nav-bar  nav-menu-item" href="#">
          <i class="fa fa-user"></i>
          <span class="nav-link-inner--text">Profile</span>
        </a>
      </router-link>
    </li>
    <li class="nav-item dropdown" v-if="isLoggedIn">
      <a
        class="nav-link "
        title="Notification"
        id="navbar-success_dropdown_1"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <notification-bell
          size="22"
          counterLocation="upperRight"
          :count="notifications.length"
          counterStyle="roundRectangle"
          counterBackgroundColor="#FF0000"
          counterTextColor="#FFFFFF"
          iconColor="#000000"
          style="float:right"
        />
         
      </a>
      <div
        class="dropdown-menu dropdown-menu-right"
        aria-labelledby="navbar-success_dropdown_1"
       
      >
     
      
        <div class=" border-0 dropdown-item" v-for="(item, index) in notifications"
        :key="index" >
        <div @click="deleteNoti(item)">
            <router-link class="shadow border-1" 
            
          :to="{ name: 'photo', params: { photoId: item.photoId } }"
        >
        
          <span>  {{ item.username }} has uploaded an image. </span>
        </router-link>
        </div>
        </div>
      </div>
    </li>
    <li class="nav-item" v-if="isLoggedIn">
      <router-link to="/login" title="Login" style="text-decoration:none;">
        <a
          class="nav-link nav-link-icon item-nav-bar nav-menu-item"
          @click="logout"
          href="#"
        >
          <i class="fa fa-sign-in"></i>
          <span class="nav-link-inner--text">Sign out</span>
        </a>
      </router-link>
    </li>

    <!-- <li class="nav-item" v-if="isLoggedIn">
      <router-link to="/profile">
        <img
          v-lazy="
            'https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/box_620_330/image.jpg'
          "
          alt="Raised circle image"
          class="img-fluid rounded-circle shadow-lg"
          style="width: 50px; height: 50px"
        />
      </router-link>
    </li> -->
  </ul>
</template>
<script>
import { Slide } from "vue-burger-menu";
import NotificationBell from "vue-notification-bell";
import axios from "axios";
export default {
  components: {
    Slide,
    NotificationBell,
  },
  data() {
    return {
      user1: JSON.parse(localStorage.getItem("user")),
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    
    notifications() {
      return this.$store.state.notifications;
    },
    user() {
      const abc = window.localStorage.getItem("user");
      // console.log(abc);
      const appove = this.$store.state.approved_images;
      console.log(appove);
      return JSON.parse(abc);
    },
  },
  mounted() {
    
    
this.interval = setInterval(() => this.$store.dispatch("getNotification"), 1000);
    
  },
  
  methods: {
     deleteNoti(item) {
      axios
         .put(
         "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/DeleteNotification?userid=" + this.user1.userId + "&followUserId=" + item.userId
        )
       
        .catch((error) => {
          this.$toasts.push({
            type: "error",
            message: error,
          });
        });
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
   
  },
};
</script>
<style>
.nav-menu-item {
  color: black !important;
  text-decoration: none !important;
  border-radius: 15px !important;
  transition: 1s ease transform !important;
}
.item-nav-bar:hover {
  background-color: black;
}
.item-nav-bar:hover i {
  color: #fff;
}
.item-nav-bar:hover .nav-link-inner--text {
  color: #fff;
}
ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav > li > a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}

.bm-burger-button {
  position: absolute;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
  cursor: pointer;
}
.bm-burger-bars {
  background-color: black;
}
.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #bdc3c7;
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: rgb(63, 63, 65); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  margin-right: 10%;
  font-size: 20px;
  text-align: center;
  font-family: Roboto;
  /* cursor: pointer; */
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: white;
}
</style>
