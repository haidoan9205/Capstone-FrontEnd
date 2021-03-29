<template>
  
    <div class="pt-lg-md" style="background-image: linear-gradient(to left bottom, #ffafbd, #ffb3b4, #ffb7ac, #ffbda5, #ffc3a0);">
      <div class="row justify-content-center">
        <div class="col-lg-5 mt-0">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mb-5 mt-4"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <h4>Sign up</h4>
              </div>
              <form role="form" @submit.prevent="register">
                <base-input
                  v-model="fullName"
                  alternative
                  class="mb-3"
                  placeholder="Fullname"
                  addon-left-icon="ni ni-circle-08"
                >
               
                </base-input>
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
                    <div class="row justify-content-center">
                  <button class="register-button" type="submit">Sign Up</button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
</template>
<script>
import firebase from '../firebase';

export default {
  

  data() {
    return {
      fullName: "",
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    register() {
      let data = {
        fullName: this.fullName,
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
<style scoped>
.register-button {
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