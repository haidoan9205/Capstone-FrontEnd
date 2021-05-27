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
          <card shadow class="card-profile" no-body>
            <div class="px-4">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image">
                    <a href="#">
                      <img
                        v-lazy="'img/theme/profile.png'"
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
                      type="info"
                      size="sm"
                      @click="modals.modalEditProfile = true"
                      class="mr-4"
                      >Edit Profile</base-button
                    >
                    <modal :show.sync="modals.modalEditProfile">
                      <h6
                        slot="header"
                        class="modal-title mb-0"
                        id="modal-title-default"
                      >
                        Edit Profile
                      </h6>

                      <div class="text-center">
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
                              <div class="donateItem">
                                <label class="control-label">Full Name</label>
                              </div>
                              <input
                                type="text"
                                class="form-control"
                                v-model="user.fullName"
                                required
                              />
                            </div>
                            <div class="form-group pl-3">
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
                              <div class="donateItem">
                                <label class="control-label"
                                  >Date of Birth</label
                                >
                              </div>
                              <date-picker
                                class="dateBirthDay"
                                v-model="user.birthDay"
                                valueType="format"
                                :disabled-date="(date) => date >= new Date()"
                              ></date-picker>
                            </div>
                            <div class="form-group pl-3">
                              <div class="donateItem">
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
                          <button
                            class="btn btn-primary"
                            type="submit"
                            @click="onEditProfile"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      <!-- <template slot="footer">
                      <base-button
                        type="link"
                        class="ml-auto"
                        @click="modals.modalEditProfile = false"
                        >Close
                      </base-button>
                    </template> -->
                    </modal>
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
                    <modal :show.sync="modals.modalFollower">
                      <h6
                        slot="header"
                        class="modal-title"
                        id="modal-title-default"
                      >
                        Followers
                      </h6>
                      <table class="styled-table">
                        <tbody>
                          <tr
                            v-for="follower in followingUsers"
                            :key="follower.username"
                          >
                            <td>{{ follower.username }}</td>

                            <td>{{ follower.description }}</td>
                            <td>
                              <base-button
                                class="btn-1 mini-button button-follow unfl"
                                v-on:click="unFollowUser(follower)"
                                type="neutral"
                                v-show="follower.isDelete == false"
                                style="float: right"
                                >Unfollow</base-button
                              >
                              <base-button
                                class="btn-1 mini-button button-follow unfl"
                                @click="unFollowUser(follower)"
                                type="neutral"
                                v-show="follower.isDelete == true"
                                style="float: right"
                                :disabled="follower.isDelete == true"
                                >Unfollowed</base-button
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <template slot="footer">
                        <base-button
                          type="link"
                          class="ml-auto"
                          @click="modals.modalFollower = false"
                          >Close
                        </base-button>
                      </template>
                    </modal>
                    <div>
                      <span class="heading">{{ images.length }}</span>
                      <span class="description">Photos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center mt-5">
                <h3>
                  {{ user.fullName }}
                </h3>
                <div class="h6 font-weight-300">Email : {{ user.email }}</div>
                <div class="h6 font-weight-300">
                  Phone Number : {{ user.phone }}
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
                      {{ user.description }}
                    </p>
                    <!-- <a href="#">Show more</a> -->
                  </div>
                </div>
              </div>
              <tabs fill class="flex-column flex-md-row">
                <card shadow slot-scope="{ activeTabIndex }">
                  <tab-pane key="tab1">
                    <template slot="title"> Non-Exclusive </template>

                    <div class="container">
                      <div class="ct-example-row">
                        <div class="row">
                          <div
                            class="col-6 col-md-4 cell"
                            v-for="(item, index) in imageNonExlusive"
                            :key="index"
                            style="cursor: pointer"
                          >
                            <img
                              title="Click for more actions"
                              @click.prevent.stop="
                                $refs.menu2.open($event, item),
                                  (selectedNor = index),
                                  (objectSelectedNor = item)
                              "
                              :src="item.wmlink"
                              class="img-fit hov"
                            />

                            <modal :show.sync="modals.modalEditImage">
                              <h6
                                slot="header"
                                class="modal-title mb-0"
                                id="modal-title-default"
                              >
                                Edit Non-Exclusive Image
                              </h6>

                              <div class="text-center">
                                <div class="page">
                                  <h2>Image Information</h2>
                                </div>

                                <div class="row justify-content-center">
                                  <div class="row align-items-center">
                                    <div class="form-group">
                                      <div class="donateItem">
                                        <label class="control-label"
                                          >Photo Name</label
                                        >
                                      </div>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="
                                          imageNonExlusive[selectedNor]
                                            .photoName
                                        "
                                        required
                                      />
                                    </div>
                                    <div class="form-group pl-3">
                                      <label class="control-label">Price</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="
                                          imageNonExlusive[selectedNor].price
                                        "
                                        required
                                      />
                                    </div>
                                    <div class="form-group pl-1 mt-4">
                                      <label class="control-label">$</label>
                                    </div>
                                  </div>
                                </div>

                                <div class="row justify-content-center">
                                  <div class="row align-items-center">
                                    <div class="form-group">
                                      <div class="donateItem">
                                        <label class="control-label"
                                          >Description</label
                                        >
                                      </div>
                                      <textarea
                                        type="text"
                                        class="form-control description"
                                        v-model="
                                          imageNonExlusive[selectedNor]
                                            .description
                                        "
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="row justify-content-center">
                                  <button
                                    class="btn btn-primary"
                                    type="submit"
                                    @click="onEditImage(objectSelectedNor)"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </modal>
                          </div>
                          <modal
                            :show.sync="modals.modalConfirmDelete"
                            gradient="danger"
                            modal-classes="modal-danger modal-dialog-centered"
                          >
                            <div class="py-3 text-center">
                              <i
                                class="fa fa-meh-o"
                                style="font-size: 50px"
                              ></i>
                              <h6 class="heading mt-4">Are you sure?</h6>
                              <p>This image will be deleted.</p>
                            </div>

                            <base-button
                              type="white"
                              @click="
                                deletePhoto(objectSelectedNor),
                                  (modals.modalConfirmDelete = false)
                              "
                              >Ok, Delete It</base-button
                            >
                            <base-button
                              type="link"
                              text-color="white"
                              class="ml-auto"
                              style="float: right"
                              @click="modals.modalConfirmDelete = false"
                            >
                              Close
                            </base-button>
                          </modal>
                          <vue-context ref="menu2">
                            <li
                              class="pd-3"
                              @click="modals.modalEditImage = true"
                            >
                              <a class="modalCursor">
                                Edit
                                <i
                                  class="fa fa-pencil-square-o mt-1"
                                  style="float: right"
                                ></i>
                              </a>
                            </li>
                            <li @click="modals.modalConfirmDelete = true">
                              <a class="modalCursor">
                                Delete
                                <i
                                  class="fa fa-trash mt-1"
                                  style="float: right"
                                ></i>
                              </a>
                            </li>
                          </vue-context>
                        </div>
                      </div>
                    </div>
                  </tab-pane>

                  <tab-pane key="tab2">
                    <template slot="title"> Exclusive </template>

                    <div class="container">
                      <div class="ct-example-row">
                        <div class="row" v-if="imageExlusive != ''">
                          <div
                            class="col-6 col-md-4"
                            v-for="(item, index) in imageExlusive"
                            :key="index"
                            style="cursor: pointer"
                          >
                            <img
                              title="Click for more actions"
                              @click.prevent.stop="
                                $refs.menu1.open($event, item),
                                  (selected = index),
                                  (objectSelected = item)
                              "
                              :src="item.wmlink"
                              class="img-fit hov"
                            />
                            <modal :show.sync="modals.modalEditImage">
                              <h6
                                slot="header"
                                class="modal-title mb-0"
                                id="modal-title-default"
                              >
                                Edit Exclusive Image
                              </h6>

                              <div class="text-center">
                                <div class="page">
                                  <h2>Image Information</h2>
                                </div>

                                <div class="row justify-content-center">
                                  <div class="row align-items-center">
                                    <div class="form-group">
                                      <div class="donateItem">
                                        <label class="control-label"
                                          >Photo Name</label
                                        >
                                      </div>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="
                                          imageExlusive[selected].photoName
                                        "
                                        required
                                      />
                                    </div>
                                    <div class="form-group pl-3">
                                      <label class="control-label">Price</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="imageExlusive[selected].price"
                                        required
                                      />
                                    </div>
                                    <div class="form-group pl-1 mt-4">
                                      <label class="control-label">$</label>
                                    </div>
                                  </div>
                                </div>

                                <div class="row justify-content-center">
                                  <div class="row align-items-center">
                                    <div class="form-group">
                                      <div class="donateItem">
                                        <label class="control-label"
                                          >Description</label
                                        >
                                      </div>
                                      <textarea
                                        type="text"
                                        class="form-control description"
                                        v-model="
                                          imageExlusive[selected].description
                                        "
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="row justify-content-center">
                                  <button
                                    class="btn btn-primary"
                                    type="submit"
                                    @click="onEditImage(objectSelected)"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </modal>
                          </div>
                          <modal
                            :show.sync="modals.modalConfirmDelete1"
                            gradient="danger"
                            modal-classes="modal-danger modal-dialog-centered"
                          >
                            <div class="py-3 text-center">
                              <i
                                class="fa fa-meh-o"
                                style="font-size: 50px"
                              ></i>
                              <h6 class="heading mt-4">Are you sure?</h6>
                              <p>This image will be deleted.</p>
                            </div>

                            <base-button
                              type="white"
                              @click="
                                deletePhoto(objectSelected),
                                  (modals.modalConfirmDelete1 = false)
                              "
                              >Ok, Delete It</base-button
                            >
                            <base-button
                              type="link"
                              text-color="white"
                              class="ml-auto"
                              style="float: right"
                              @click="modals.modalConfirmDelete1 = false"
                            >
                              Close
                            </base-button>
                          </modal>
                          <vue-context ref="menu1">
                            <li
                              class="pd-3"
                              @click="modals.modalEditImage = true"
                            >
                              <a class="modalCursor">
                                Edit
                                <i
                                  class="fa fa-pencil-square-o mt-1"
                                  style="float: right"
                                ></i>
                              </a>
                            </li>
                            <li @click="modals.modalConfirmDelete1 = true">
                              <a class="modalCursor">
                                Delete
                                <i
                                  class="fa fa-trash mt-1"
                                  style="float: right"
                                ></i>
                              </a>
                            </li>
                          </vue-context>
                        </div>
                        <div class="row" v-else style="text-align: center">
                          <p>There is no item to show !</p>
                        </div>
                      </div>
                    </div>
                  </tab-pane>

                  <tab-pane key="tab3">
                    <template slot="title"> Exclusive Property </template>

                    <div class="container">
                      <div class="ct-example-row">
                        <div class="row">
                          <div
                            class="col-6 col-md-4"
                            v-for="(item, index) in imageExlusiveProperty"
                            :key="index"
                            style="cursor: pointer"
                          >
                            <img
                              @click="
                                (modals.modalEnable = true),
                                  (selectedEnable = index),
                                  (objectSelectedEnable = item)
                              "
                              v-lazy="item.wmlink"
                              class="img-fit hov"
                            />
                            <modal
                              :show.sync="modals.modalEnable"
                              gradient="default"
                              modal-classes="modal-default modal-dialog-centered"
                            >
                              <h6
                                slot="header"
                                class="modal-title"
                                id="modal-title-notification"
                              >
                                Enable this photo for resale
                              </h6>

                              <div class="py-3 text-center">
                                <i class="ni ni-bell-55 ni-3x"></i>
                                <h4 class="heading mt-4">
                                  You should read this!
                                </h4>
                                <p>
                                  If you enable click to enable button, this
                                  image will move to homepage for selling to
                                  another customer.
                                </p>
                                <p>
                                  Click Edit button to edit image information,
                                  then this image will wait for the approval of
                                  admin.
                                </p>
                              </div>

                              <div>
                                <base-button
                                  @click="enableExclusive(objectSelectedEnable)"
                                  type="warning"
                                  >Enable</base-button
                                >
                                <base-button
                                  type="success"
                                  class="ml-auto"
                                  @click="
                                    (modals.modalEnable = false),
                                      (modals.modalEditImage = true)
                                  "
                                  style="float: right"
                                >
                                  Edit
                                </base-button>
                              </div>
                            </modal>
                            <modal :show.sync="modals.modalEditImage">
                              <h6
                                slot="header"
                                class="modal-title mb-0"
                                id="modal-title-default"
                              >
                                Edit Exclusive Image
                              </h6>

                              <div class="text-center">
                                <div class="page">
                                  <h2>Image Information</h2>
                                </div>

                                <div class="row justify-content-center">
                                  <div class="row align-items-center">
                                    <div class="form-group">
                                      <div class="donateItem">
                                        <label class="control-label"
                                          >Photo Name</label
                                        >
                                      </div>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="
                                          imageExlusiveProperty[selectedEnable]
                                            .photoName
                                        "
                                        required
                                      />
                                    </div>
                                    <div class="form-group pl-3">
                                      <label class="control-label">Price</label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="
                                          imageExlusiveProperty[selectedEnable]
                                            .price
                                        "
                                        required
                                      />
                                    </div>
                                    <div class="form-group pl-1 mt-4">
                                      <label class="control-label">$</label>
                                    </div>
                                  </div>
                                </div>

                                <div class="row justify-content-center">
                                  <div class="row align-items-center">
                                    <div class="form-group">
                                      <div class="donateItem">
                                        <label class="control-label"
                                          >Description</label
                                        >
                                      </div>
                                      <textarea
                                        type="text"
                                        class="form-control description"
                                        v-model="
                                          imageExlusiveProperty[selectedEnable]
                                            .description
                                        "
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="row justify-content-center">
                                  <button
                                    class="btn btn-primary"
                                    type="submit"
                                    @click="
                                      onEditImage(objectSelectedEnable),
                                        (modals.modalEnable = false)
                                    "
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </modal>
                          </div>
                          <vue-context ref="menu">
                            <li>
                              <a
                                class="modalCursor"
                                @click="modals.modalEnable = true"
                              >
                                Resale
                              </a>
                            </li>
                          </vue-context>
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
import VueContext from "vue-context";
import "vue-context/src/sass/vue-context.scss";
import Unauthorized from "./Unauthorized.vue";
// import { response } from "express";
export default {
  components: { DatePicker, Modal, Tabs, TabPane, VueContext, Unauthorized },
  data() {
    return {
      countFollower: this.$store.getters.followerCount,
      user: JSON.parse(localStorage.getItem("user")),
      disabledAfter: new Date().toLocaleDateString(),
      modals: {
        modalFollower: false,
        modalEditProfile: false,
        modalEnable: false,
        modalEditImage: false,
        modalConfirmDelete: false,
        modalConfirmDelete1: false,
      },
      flag: [],
      isActive: true,
      photoId: 0,
      selected: 0,
      objectSelected: null,
      selectedNor: 0,
      objectSelectedNor: null,
      selectedEnable: 0,
      objectSelectedEnable: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    followingUsers() {
      const users = this.$store.state.followingUsers;
      users.forEach((element) => {
        element.isDelete = false;
      });
      (users);
      return users;
    },
    images() {
      return this.$store.state.approved_images;
    },
    imageNonExlusive() {
      return this.$store.state.user_non_exlusive_images;
    },
    imageExlusive() {
      return this.$store.state.user_exlusive_images;
    },
    imageExlusiveProperty() {
      return this.$store.state.user_exlusive_property;
    },
    followers() {
      return this.$store.state.followingUsers;
    },
  },
  mounted() {
    this.$store.dispatch("getFollowingUsers");
    this.$store.dispatch("getApprovedImageByUser");
    this.$store.dispatch("getUserNonExlusiveImages");
    this.$store.dispatch("getUserExlusiveImages");
    this.$store.dispatch("getUserExlusiveProperty");
  },
  methods: {
    onEditProfile() {
      let userId = this.user.userId;
      axios
        .put(
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/" +
            userId,
          {
            userId: this.user.userId,
            fullName: this.user.fullName,
            description: this.user.description,
            email: this.user.email,
            phone: this.user.phone,
            dayOfBirth: this.user.birthDay,
          }
        )
        .then((response) => {
          if (response.status == 201) {
            this.$alert(
              "Your information is updated",
              "Success",
              "success"
            ).then(() => ("Closed"));
            this.modals.modalEditProfile = false;
            const userUpdated = JSON.parse(window.localStorage.getItem("user"));
            (userUpdated.fullName = response.data.fullName),
              (userUpdated.description = response.data.description),
              (userUpdated.email = response.data.email),
              (userUpdated.phone = response.data.phone),
              (userUpdated.dayOfBirth = response.data.birthDay);
            window.localStorage.setItem("user", JSON.stringify(userUpdated));
          } else {
            this.$toasts.push({
              type: "error",
              message: "Edit error",
            });
          }
        })
        .catch((error) => {
          this.$toasts.push({
            type: "error",
            message: error,
          });
        });
    },
    onEditImage(objectSelected) {
      axios
        .put(
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/" +
            objectSelected.photoId,
          {
            photoId: objectSelected.photoId,
            photoName: objectSelected.photoName,
            price: objectSelected.price,
            description: objectSelected.description,
          }
        )
        .then((response) => {
          if (response.status == 200) {
            this.$alert(
              "Your information is updated",
              "Success",
              "success"
            ).then(() => ("Closed"));

            this.modals.modalEditImage = false;
            this.$router.go();
          } else {
            this.$toasts.push({
              type: "error",
              message: "Edit error",
            });
          }
        })
        .catch((error) => {
          this.$toasts.push({
            type: "error",
            message: error,
          });
        });
    },
    enableExclusive(objectSelected) {
      // (user.userId)
      (objectSelected);
      axios({
        url: "http://35.185.185.238:3000/transactions",
        data: {
          transactionId: "none",
          prevOwner: objectSelected.photoName,
          ownerID: objectSelected.userId,
          photoId: objectSelected.photoId,
          photoHash: objectSelected.phash,
          isTransaction: false,
          amount: objectSelected.price,
          createDate: new Date().toISOString(),
        },
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.status == 200) {
            axios({
              method: "PUT",
              url:
                "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/ChangeWatermarkPhoto/" +
                objectSelected.photoId,
            }).then((response) => {
              ("aaaa");
              (response);
              if (response.status == 200) {
                this.$alert(
                  "Enable Sucessfully",
                  "Success",
                  "success"
                ).then(() => ("Closed"));
                this.modals.modalEnable = false;
              } else {
                this.$alert(
                  "Something went wrong, please try again",
                  "Error",
                  "error"
                ).then(() => ("Closed"));
                this.modals.modalEnable = false;
              }
            });
          }
        })
        .catch((error) => {
          this.$alert(
            "Something went wrong, please try again",
            "Error",
            'error'
          ).then(() => ("Closed"));
        });
    },
    deletePhoto(objectSelected) {
      axios({
        method: "PUT",
        url:
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/DeletOrDisable/" +
          objectSelected.photoId,
      }).then((response) => {
        ("aaaa");
        (response);
        if (response.status == 200) {
          this.$alert("Delete Sucessfully", "Success", "success").then(() =>
            ("Closed")
          );
          this.modals.modalEnable = false;
          window.location.reload();
        } else {
          this.$alert(
            "Something went wrong, please try again",
            "Error",
            "error"
          ).then(() => ("Closed"));
          this.modals.modalEnable = false;
         
        }
      });
    },
    unFollowUser(follower) {
      const user = this.$store.state.user;
      axios({
        method: "POST",
        url:
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/UnFollow",
        data: {
          userId: JSON.parse(user).userId,
          followUserId: follower.userId,
        },
      }).then((response) => {
        if (response.data == true) {
          follower.isDelete = true;
          this.$forceUpdate();
        } else {
          this.$toasts.push({
            type: "error",
            message: "Something went wrong",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
#app .dateBirthDay .mx-input {
  display: block;
  width: 100%;
  height: calc(2.75rem + 2px);
  padding: 0.625rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #8898aa;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #cad1d7;
  border-radius: 0.25rem;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>
<style lang="scss" scoped>
.description {
  width: 27rem;
}
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
.img-fit:hover {
  -webkit-filter: brightness(70%);
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all ease;
}
.hov:hover {
  box-shadow: 0 0 0 1px rgb(0, 0, 0 / 20%);
}

.unfl:active:disabled {
  background: grey;
}
</style>
