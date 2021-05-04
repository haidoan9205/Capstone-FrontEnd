<template>
  <div>
    <unauthorized v-if="!isLoggedIn"></unauthorized>
    <div class="profile-page" v-if="isLoggedIn">
      <section class="section-profile-cover section-shaped my-0">
        <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
      <section class="section section-skew">
        <div class="container">
          <card shadow class="card-profile " no-body>
            <div class="px-4">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image">
                    <a href="#">
                      <img
                        v-lazy="'img/theme/user.png'"
                        class="rounded-circle"
                      />
                    </a>
                  </div>
                </div>
                <div
                  class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
                >
                  <div class="card-profile-actions py-4 mt-lg-0">
                    <base-button
                      type="default"
                      size="sm"
                      v-if="isFollowed != true && isClick == false"
                      class="float-right"
                      @click="followUser(strange)"
                      >Follow This User</base-button
                    >
                    <base-button
                      type="default"
                      size="sm"
                      v-show="isClick == true"
                      class="float-right"
                      :disabled="isClick == true"
                      >Followed</base-button
                    >
                  </div>
                </div>
                <div class="col-lg-4 order-lg-1">
                  <div class="card-profile-stats d-flex justify-content-center">
                    <div
                      class="modalCursor"
                      @click="modals.modalFollower = true"
                    >
                      <span class="heading">{{ followers.length }}</span>
                      <span class="description">Following</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center mt-5">
                <h3>
                  {{ strange.fullName }}
                  <!-- <span class="font-weight-light">, 27</span> -->
                </h3>
                <div class="h6 font-weight-300">
                  Email : {{ strange.email }}
                </div>
                <div class="h6 font-weight-300">
                  Phone Number : {{ strange.phone }}
                </div>
                <!-- <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i>Solution Manager -
                Creative Tim Officer
              </div>
              <div>
                <i class="ni education_hat mr-2"></i>University of Computer
                Science
              </div> -->
              </div>
              <div class="mt-5 py-5 border-top text-center">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <p>
                      {{ strange.description }}
                    </p>
                    <!-- <a href="#">Show more</a> -->
                  </div>
                </div>
              </div>
               <tabs fill class="flex-column flex-md-row">
                <card shadow slot-scope="{ activeTabIndex }">
                  <tab-pane key="tab1">
                    <template slot="title">
                      Non-Exclusive
                    </template>

                    <div class="container">
                      <div class="ct-example-row">
                        <div class="row">
                          <div
                            class="col-6 col-md-4"
                            v-for="item in imageNonExlusive"
                            :key="item.photoId"
                          >
                            <img v-lazy="item.wmlink" class="img-fit" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </tab-pane>

                  <tab-pane key="tab2">
                    <template slot="title">
                      Exclusive
                    </template>

                    <div class="container">
                      <div class="ct-example-row">
                        <div class="row">
                          <div
                            class="col-6 col-md-4"
                            v-for="(item, index) in imageExlusive"
                            :key="index"
                          >
                            <img v-lazy="item.wmlink" class="img-fit hov" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </tab-pane>
               
                
                </card>
              </tabs>
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
import Modal from "@/components/Modal.vue";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import Unauthorized from "./Unauthorized.vue";
export default {
  components: { DatePicker, Modal, Unauthorized, Tabs, TabPane },
  data() {
    return {
      isClick: false,
      userId: "",
      alreadyFollowed: false,
      countFollower: this.$store.getters.followerCount,
      user: JSON.parse(localStorage.getItem("user")),
      disabledAfter: new Date().toLocaleDateString(),
      modals: {
        modalFollower: false,
        modalEditProfile: false,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    strange() {
      return this.$store.state.stranger;
    },
    images() {
      return this.$store.state.approved_images_stranger;
    },
    followers() {
      return this.$store.state.followingStranger;
    },
    isFollowed(){
      return this.$store.state.checkIsFollowed;
    },
    imageNonExlusive() {
      return this.$store.state.stranger_non_exlusive_images;
    },
    imageExlusive() {
      return this.$store.state.stranger_exlusive_images;
    },
  },
  mounted() {
    this.$store.dispatch(
      "getFollowingStranger",
      window.localStorage.getItem("strangerId")
    );
    this.$store.dispatch("getStrangeUser", this.$route.params.userId);
    window.localStorage.setItem("strangerId", this.$route.params.userId);
    this.$store.dispatch("getApprovedImageByStranger");
    this.$store.dispatch("checkIsFollowed");
    this.$store.dispatch("getStrangerNonExlusiveImages");
    this.$store.dispatch("getStrangerExlusiveImages");
  },
  methods: {
    followUser(strange) {
      // console.log(user.userId)
      axios({
        method: "POST",
        url:
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/Follow",
        data: {
          userId: JSON.parse(this.$store.state.user).userId,
          followUserId: this.$route.params.userId,
        },
      }).then((response) => {
        if (response.data == true) {
          this.$alert("Follow Successfully", "Success", "success").then(() =>
            console.log("Closed")
          );
          this.isClick = true;
        } else {
          this.$toasts.push({
            type: "error",
            message: "Something went wrong",
          });
        }
      });
    },
    unFollowUser(follower) {
      // console.log(user.userId)
      axios({
        method: "POST",
        url:
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/UnFollow",
        data: {
          userId: JSON.parse(this.$store.state.user).userId,
          followUserId: follower.userId,
        },
      }).then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.modalCursor {
  cursor: pointer;
}
.modal.show .modal-dialog {
  width: 45% !important;
}
.modal-body {
  overflow-y: scroll !important;
  overflow-x: hidden !important;
  padding: 0 !important;
}
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 100%;
  min-width: 500px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
.mini-button {
  font-weight: 200 !important;
  padding: 0.2rem 1rem !important;
}
.img-fit {
  width: 100%;
  height: 15vw;
  object-fit: cover;
  margin-bottom: 15px;
  border-radius: 10px;
}
</style>
