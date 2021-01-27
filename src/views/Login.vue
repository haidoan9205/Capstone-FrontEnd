<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <h4>Login Form</h4>
              </div>
              <form role="form" @submit.prevent="login">
                <base-input
                  v-model="username"
                  alternative
                  class="mb-3"
                  placeholder="Username"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>
                <base-input
                  v-model="password"
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                >
                </base-input>

                <button type="submit">Login</button>

              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <router-link to="/changepassword" title="Register">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
              </router-link>
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" title="Register">
              <a href="#" class="text-light">
                <small>Create new account</small>
              </a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style></style>
