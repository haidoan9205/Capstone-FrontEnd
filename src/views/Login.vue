<template>
  <section
    class="section section-shaped section-lg my-0"
    style="background-image: url('img/theme/background.jpg')"
  >
    <div class="container pt-lg-md" >
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
            style="background-color:#FFFFFF"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <p class="lead text-muted">Welcome to IMAGO</p>
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
                <div class="row justify-content-center">
                  <button class="login-button" type="submit">Sign in</button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <router-link to="/requestchangepassword" title="Register">
                <a href="#" style="color:#0886DE">
                  <small>Forgot password?</small>
                </a>
              </router-link>
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" title="Register">
                 <a href="#" style="color:#0886DE">
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
      if (username === "" || password === "") {
        this.$toast.warning('Please input username and password!')
      } else {
        this.$store
          .dispatch("login", { username, password })
          .then(() => this.$router.push("/"))
          .catch(
            (err) => (
              console.log(err)
            )
          );
        this.$store.dispatch("auth");
      }
    },
  },
  mounted: function() {
    let chk = this.$store.getters.isLoggedIn;
    if (chk) {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.login-button {
  background-color: #525f7f;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 12px;
}
</style>
