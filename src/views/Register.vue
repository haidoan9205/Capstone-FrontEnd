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
                <h4>Sign up</h4>
              </div>
              <form role="form" @submit.prevent="register">
                <base-input
                  v-model="username"
                  alternative
                  class="mb-3"
                  placeholder="Username"
                  addon-left-icon="ni ni-circle-08"
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
                <base-input
                  v-model="email"
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>
                    <button type="submit">Create Account</button>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import firebase from '../firebase';

export default {
  

  data() {
    return {
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    register() {
      let data = {
        username: this.username,
        password: this.password,
        email: this.email,
      };

      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
