<template>
  <div
    class="pt-lg-md"
    style="background-image: url('img/theme/background.jpg')"
  >
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
              <span style="color:red" v-if="msg.password">{{msg.password}}</span>
              <base-input
                v-model="email"
                alternative
                class="mb-3"
                placeholder="Email"
                addon-left-icon="ni ni-email-83"
              >
              </base-input>
              <span style="color:red" v-if="msg.email">{{ msg.email }}</span>
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
import firebase from "../firebase";

export default {
  data() {
    return {
      fullName: "",
      username: "",
      password: "",
      email: "",
      msg: [],
    };
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      this.email = value;
      this.validateEmail(value);
    },
     password(value){
      this.password = value;
      this.validatePassword(value);
    }
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
        .then(() => this.$router.push("/login"))
        .catch((err) => console.log(err));
    },
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
      }
    },
    validatePassword(value){
      let difference = 8 - value.length;
      if (value.length<8) {
        this.msg['password'] = 'Must be at least 8 characters! '+ difference + ' characters left' ;
      } else {
         this.msg['password'] = '';
      }
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
