<template>
    <div class="content divElement">
        <h2 style="color:#069">Unauthorized Access</h2>
        <section class="content"
            style="background-image: url('img/theme/error.png')"
        >
        <a href="#/login">Click here to login</a>
        </section>
    </div>
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
        alert("Username and password must not empty");
      } else {
        this.$store
          .dispatch("login", { username, password })
          .then(() => this.$router.push("/"))
          .catch(
            (err) => (
              console.log(err),
              alert("The username and / or password is incorrect")
            )
          );
        this.$store.dispatch("auth");
      }
    },
  },
};
</script>
<style scoped>
.divElement{
    text-align: center;
    margin-top: 5%;
}
.content {
    text-align: center;
    height: 600px;
    width: 800px;
    display: block;
    margin-left: auto;
    margin-right: auto;

}
</style>
