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
    <!-- <li class="nav-item" > -->
    <li class="nav-item" v-if="isLoggedIn">
      <a class="nav-link nav-link-icon" @click="logout">
        <i class="fa fa-sign-out"></i>
        <span class="nav-link-inner--text">Sign out</span>
      </a>
    </li>
    <li class="nav-item" v-if="isLoggedIn">
      <img
        v-lazy="
          'https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/box_620_330/image.jpg'
        "
        alt="Raised circle image"
        class="img-fluid rounded-circle shadow-lg"
        style="width: 50px; height: 50px"
      />
    </li>
  </ul>
</template>
<script>
export default {
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
</style>
