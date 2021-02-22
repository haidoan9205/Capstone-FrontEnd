<template>
  <div class="profile-page">
    <section
      class="section-profile-cover section-shaped my-0 shape shape-style-1 shape-primary shape-skew alpha-4"
    >
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div class="row justify-content-center">
          <div class="col-lg-12 order-lg-2">
            <div class="card-profile-image">
              <a href="#">
                <img
                  v-lazy="'img/theme/team-4-800x800.jpg'"
                  class="rounded-circle"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="absolute">
      <section class="section section-skew">
        <div class="container">
          <card shadow class="card-profile mt--300" no-body>
            <div class="mt-5 py-5 px-4 text-center">
              <div class="page"><h2>Profile</h2></div>
              <div class="row justify-content-center">
                <div class="row align-items-center">
                  <div class="col1">
                    <small class="text-uppercase text-muted font-weight-bold"
                      >Name</small
                    >
                  </div>
                  <div class="col2">
                    <base-input>{{user.fullName}} </base-input>
                  </div>
                  <div class="col3"></div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="row align-items-center">
                  <div class="col1">
                    <small class="text-uppercase text-muted font-weight-bold"
                      >Email</small
                    >
                  </div>
                  <div class="col2">
                    <base-input>{{user.email}} </base-input>
                  </div>
                  <div class="col3"></div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="row align-items-center">
                  <div class="col1">
                    <small class="text-uppercase text-muted font-weight-bold"
                      >Phone</small
                    >
                  </div>
                  <div class="col2">
                    <base-input>{{user.phone}} </base-input>
                  </div>
                  <div class="col3"></div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="row align-items-center">
                  <div class="col1">
                    <small class="text-uppercase text-muted font-weight-bold"
                      >Password</small
                    >
                  </div>
                  <div class="col2">
                    <base-input type="password">
                    {{user.password}}
                    </base-input>
                  </div>
                  <div class="col3">
                    <input
                      type="checkbox"
                      id="checkbox"
                      @click="toggleActive"
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-content-center" v-if="isActive == false">
                <div class="row align-items-center">
                  <div class="col1">
                    <small class="text-uppercase text-muted font-weight-bold"
                      >Confirm Password</small
                    >
                  </div>
                  <div class="col2">
                    <base-input type="password">
                    {{user.password}}
                    </base-input>
                  </div>
                  <div class="col3"></div>
                </div>
              </div>
              <base-button
                size="sm"
                type="primary"
                class="btn-tooltip"
                v-b-tooltip.hover.right
                title="Tooltip on right"
                >Edit
              </base-button>
            </div>
          </card>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      const abc = window.localStorage.getItem("user");
      console.log(abc);
      return JSON.parse(abc);
    },
  },
  methods: {
    toggleActive() {
      if (this.isActive == true) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },
};
</script>

<style scoped>
div.absolute {
  position: absolute;
  width: 80%;
  top: 50%;
  left: 10%;
}
div.col1 {
  width: 110px;
  padding-bottom: 11px;
}
div.col2 {
  width: 190px;
}
div.col3 {
  width: 50px;
  padding-bottom: 11px;
}
small {
  font-size: 13px;
}
input.form-control {
  width: auto;
}
div.page {
  position: absolute;
  top: 25px;
  left: 45%;
}
</style>
