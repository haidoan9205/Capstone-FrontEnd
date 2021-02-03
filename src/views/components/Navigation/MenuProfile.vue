<template>
  <div class="row justify-content-center mt-0">
    <div class="col-lg-12">
      <div class="row">
        <div class="col-lg-12">
          <base-nav expand effect="dark" type="primary" round title="Menu">
            <div class="row" slot="content-header" slot-scope="{ closeMenu }">
              <div class="col-6 collapse-brand">
                <a href="./index.html">
                  <img src="img/brand/blue.png" />
                </a>
              </div>
              <div class="col-6 collapse-close">
                <close-button target="nav-inner-primary" @click="closeMenu">
                </close-button>
              </div>
            </div>

            <ul class="navbar-nav ml-lg-auto">
              <li class="nav-item">
                <router-link to="/">
                   <a class="nav-link" href="#"
                  >Discover
                  <span class="sr-only">(current)</span>
                </a>
                </router-link>
               
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link nav-link-icon" @click="logout">
                  <i class="fa fa-sign-out"></i>
                  <span class="nav-link-inner--text">Sign out</span>
                </a>
              </li>
            </ul>
          </base-nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import CloseButton from "@/components/CloseButton";
export default {
  components: {
    BaseNav,
    CloseButton,
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
</style>
