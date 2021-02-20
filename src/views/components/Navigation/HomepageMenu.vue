<template>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <router-link to="/cart" title="Your basket">
        <a class="nav-link nav-link-icon" href="#">
          <i class="fa fa-shopping-basket"></i>
          <span class="nav-link-inner--text">Basket</span>
        </a>
      </router-link>
    </li>
    <li class="nav-item" v-if="!isLoggedIn">
      <router-link to="/login" title="Login">
        <a class="nav-link nav-link-icon" href="#">
          <i class="fa fa-sign-in"></i>
          <span class="nav-link-inner--text">Sign in</span>
        </a>
      </router-link>
    </li>
    <li class="nav-item" v-if="isLoggedIn">
      <!-- <div class="media align-items-center" slot="title" @click="handleCloseMenu">
        <span class="avatar avatar-sm rounded-circle">
          <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg" />
        </span>
        <div class="media-body ml-2 d-none d-lg-block">
          <span class="mb-0 text-sm font-weight-bold">Jessica Jones</span>
        </div>
      </div> -->

      <Slide right :closeOnNavigation="true" :burgerIcon="true">
        <div class="media-body ml-2 d-none d-lg-block">
          <!-- <span>
            WELCOME!
          </span> -->
          <span class="avatar avatar-sm rounded-circle">
            <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg" />
          </span>
          <span><h3 style="color: white">Jessica Jones</h3></span>
        </div>
        <router-link to="/profile"
          ><a class="nav-link" href="#">Profile</a>
        </router-link>
        <router-link to="/upload">
          <a class="nav-link" href="#">Upload</a>
        </router-link>
        <div class="dropdown-divider" />
        <!-- <a class="nav-link nav-link-icon" @click="logout">
          <i class="fa fa-sign-out"></i>
          <span class="nav-link-inner--text">Sign out</span>
        </a> -->
        <div class="text-center">
          <base-button type="" @click="logout" style="margin-left: 10%; width: 80%">Log out</base-button>
        </div>
      </Slide>
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
export default {
  components: {
    Slide,
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
<style>
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
  background-color: #fff;
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
