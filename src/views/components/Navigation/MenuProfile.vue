<template>
  <base-nav effect="dark"
                  expand
                  title="Imago"> 
    <div class="row" slot="content-header">
      <ul class="navbar-nav ml-auto row justify-content-center mx-auto">
        <li class="nav-item">
          <router-link to="/cart" title="Your basket">
            <a class="nav-link nav-link-icon" href="#">
              <i class="fa fa-shopping-basket"></i>
              <span class="nav-link-inner--text">Basket</span>
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
    </div>

    <!-- <div class="col-md-6 m-auto justify-content-center cat-bar">
      <div class="col-lg-8 text-center">
        <div class="btn-wrapper">
          <a
            href="https://demos.creative-tim.com/argon-design-system/docs/foundation/icons.html"
            class="btn btn-primary"
            >Your Images</a
          >
          <a
            href="https://nucleoapp.com/?ref=1712"
            target="_blank"
            class="btn btn-primary mt-3 mt-md-0"
            >Dowloaded</a
          >
        </div>
      </div>
    </div> -->
  </base-nav>
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
