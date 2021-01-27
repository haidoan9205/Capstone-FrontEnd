<template>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <a class="nav-link nav-link-icon" href="#">
        <i class="fa fa-files-o"></i>
        <span class="nav-link-inner--text">Board</span>
      </a>
    </li>
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
        <a class="nav-link nav-link-icon" @click="logout" >
        <i class="fa fa-sign-out"></i>
        <span class="nav-link-inner--text">Sign out</span>
        </a>
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
<style></style>
