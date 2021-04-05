<template>
  <div class="profile-page">
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
                    <img v-lazy="'img/theme/user.png'" class="rounded-circle" />
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
                    v-show="alreadyFollowed == false"
                    class="float-right"
                    @click="followUser(strange)"
                    >Follow This User</base-button
                  >
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div class="modalCursor" @click="modals.modalFollower = true">
                    <span class="heading">{{ countFollower }}</span>
                    <span class="description">Follower</span>
                  </div>
                  <div>
                    <span class="heading">10</span>
                    <span class="description">Photos</span>
                  </div>
                  <div>
                    <span class="heading">89</span>
                    <span class="description">Following</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                {{ strange.fullName }}
                <!-- <span class="font-weight-light">, 27</span> -->
              </h3>
              <div class="h6 font-weight-300">Email : {{ strange.email }}</div>
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
            <div class="container">
              <div class="ct-example-row">
                <div class="row">
                  <div
                    class="col-6 col-md-4"
                    v-for="item in images"
                    :key="item.photoId"
                  >
                    <router-link
                      :to="{name: 'photo', params: {photoId: item.photoId}}"
                    >
                      <img v-lazy="item.wmlink" class="img-fit" />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import axios from 'axios';
import Modal from '@/components/Modal.vue';

export default {
  components: {DatePicker, Modal},
  data() {
    return {
      userId: '',
      alreadyFollowed: false,
      countFollower: this.$store.getters.followerCount,
      user: JSON.parse(localStorage.getItem('user')),
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
    followingUsers() {
      return this.$store.state.followingUsers;
    },
    strange() {
      return this.$store.state.stranger;
    },
    images() {
      return this.$store.state.approved_images_stranger;
    },
  },
  mounted() {
    this.$store.dispatch('getFollowingUsers');
    this.$store.dispatch('getStrangeUser', this.$route.params.userId);
    window.localStorage.setItem('strangerId', this.$route.params.userId);
    this.$store.dispatch('getApprovedImageByStranger');
    axios({
      method: 'GET',
      url:
        'https://imago.azurewebsites.net/api/v1/Follow/CheckFollowedUser?userId=' +
        JSON.parse(this.$store.state.user).userId +
        '&followId=' +
        window.localStorage.getItem('strangerId'),
    }).then((response) => {
      this.alreadyFollowed = response.data;
    });
  },
  methods: {
    followUser(strange) {
      // console.log(user.userId)
      axios({
        method: 'POST',
        url: 'https://imago.azurewebsites.net/api/v1/Follow/Follow',
        data: {
          userId: JSON.parse(this.$store.state.user).userId,
          followUserId: this.$route.params.userId,
        },
      }).then((response) => {
        if (response.data == true) {
          this.$alert('Follow Successfully', 'Success', 'success').then(() =>
            console.log('Closed')
          );
        } else {
          this.$toasts.push({
            type: 'error',
            message: 'Something went wrong',
          });
        }
      });
    },
    unFollowUser(follower) {
      // console.log(user.userId)
      axios({
        method: 'POST',
        url: 'https://imago.azurewebsites.net/api/v1/Follow/UnFollow',
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
