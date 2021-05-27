<template>
  <div class="profile-page">
    <section
      class="section-profile-cover section-shaped my-0 shape shape-style-1 shape-primary shape-skew alpha-4"
    >
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
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
                  <div class="form-group">
                    <input
                      type="hidden"
                      class="form-control"
                      v-model="user.userId"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="row align-items-center">
                  <div class="form-group">
                    <div class="donateItem ">
                      <label class="control-label">Full Name</label>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.fullName"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="row align-items-center">
                  <div class="form-group">
                    <div class="donateItem ">
                      <label class="control-label">Description</label>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.description"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="row align-items-center">
                  <div class="form-group">
                    <label class="control-label">Email</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.email"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="row align-items-center">
                  <div class="form-group">
                    <label class="control-label">Phone</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.phone"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="row align-items-center">
                  <div class="form-group">
                    <div class="donateItem ">
                      <label class="control-label">Date of birth</label>
                    </div>
                    <date-picker
                      v-model="user.birthDay"
                      valueType="format"
                      :disabled-date="(date) => date >= new Date()"
                    ></date-picker>
                  </div>
                </div>
              </div>

              <div class="row justify-content-center">
                <button
                  class="btn btn-primary"
                  type="submit"
                  @click="onEditProfile"
                >
                  Save
                </button>
              </div>
              <div class="row justify-content-center">
                <a
                  v-bind:href="
                    'http://localhost:8080/#/changepassword/' + user.userId
                  "
                  >Click here to change password</a
                >
              </div>
            </div>
          </card>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import axios from "axios";

export default {
  components: { DatePicker },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      disabledAfter: new Date().toLocaleDateString(),
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    
  },
  methods: {
    onEditProfile() {
      let userId = this.user.userId;
      axios
        .put("https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/" + userId, {
          userId: this.user.userId,
          fullName: this.user.fullName,
          description: this.user.description,
          email: this.user.email,
          phone: this.user.phone,
          dayOfBirth: this.user.birthDay,
        })
        .then((response) => {
          if (response.status == 201) {
            this.$alert(
              "Your information is updated",
              "Success",
              "success"
            ).then(() => ("Closed"));
            const userUpdated = JSON.parse(window.localStorage.getItem("user"));
            (userUpdated.fullName = response.data.fullName),
              (userUpdated.description = response.data.description),
              (userUpdated.email = response.data.email),
              (userUpdated.phone = response.data.phone),
              (userUpdated.dayOfBirth = response.data.birthDay);
            window.localStorage.setItem("user", JSON.stringify(userUpdated));
          } else {
            alert("Edit error");
          }
          (response);
        })
        .catch((error) => {
          (error);
        });
    },
  },
};
</script>

<style scoped>
div.absolute {
  position: absolute;
  width: 80%;
  top: 40%;
  left: 10%;
}
label.control-label {
  text-align: left;
}
div.form-group {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
}
.donateItem {
  flex: 0 1 auto;
}
.donateItem * {
  display: inline-block;
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
button.btn {
  width: 200px;
  margin-bottom: 10px;
}
</style>
