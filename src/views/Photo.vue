<template>
  <div class="mb-3" style="background-color: #f2f2f2">
    <div class="row ml-2 imageInfo">
      <!-- <div class="imageInfo"> -->
      <div class="col-md-5 col-sm-5 col-xs-12 positionImage">
        <!-- <img style="border-radius: 20px; margin: 2rem 0" :src="image.wmlink" /> -->
        <img
            :src="image.wmlink"
            @click="openGallery(0)"
            style="border-radius: 20px; margin: 2rem 0; cursor: pointer"
          />
          <LightBox
            ref="lightbox"
            :showLightBox="false"
            :showThumbs="false"
            :media="[
              {
                thumb: this.image.wmlink,
                src: this.image.wmlink,
                srcset: this.image.wmlink,
              },
            ]"
          >
            <inner-image-zoom
              :src="this.image.wmlink"
              :zoomSrc="this.image.wmlink"
            />
          </LightBox>
      </div>
      <div class="col-md-6 mb-5 mb-md-0 mt-5 positionImage">
        <h3>
          <strong>{{ image.photoName }} </strong>
        </h3>

        <h5 class="h5">
          <strong>Price</strong> : $ {{ image.price }} - <strong>Type</strong> :
          <span v-if="image.typeId == 1">Non-Exclusive</span
          ><span v-if="image.typeId == 2">Exclusive</span>
        </h5>

        <p class="lead">
          {{ image.description }}
        </p>
        <span><strong>Tags</strong> : </span>
        <badge
          type="info"
          class="text-uppercase"
          style="cursor: pointer"
          v-for="(badge, index) in image.category"
          :key="index"
        >
          <span
            @click="
              openTagModal();
              openingBadgeModal = badge.categoryName;
              getPhotosByCategory(badge);
            "
          >
            {{ badge.categoryName }}
          </span>
        </badge>
        <br />

        <Modal
          v-model="tagModal"
          title="Photo(s) with same tag"
          :modal-style="{ 'max-width': '50%' }"
        >
          <div class="container">
            <div
              style="
                border: 0px solid #000;
                padding-top: 10px;
                margin-left: 3.5%;
              "
            >
              <badge type="info" class="text-uppercase badgeTagModal">
                {{ openingBadgeModal }}
              </badge>
            </div>
            <div
              class="ct-example-row"
              style="
                border: 0px solid #000;
                margin-top: -40px;
                padding-bottom: 8%;
              "
            >
              <div class="row">
                <div
                  class="col-6 col-md-4"
                  v-for="item in testPicture"
                  :key="item.photoId"
                >
                  <router-link
                    @click.native="reloadPage"
                    :to="{
                      name: 'photo',
                      params: { photoId: item.photoId },
                    }"
                  >
                    <img v-lazy="item.wmlink" class="img-fit" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <blockquote class="blockquote mt-2">
          <p><strong> Upload By:</strong></p>
          <router-link
            v-if="checkIsYour == true"
            :to="{ name: 'profileMaster', params: { userId: image.userId } }"
          >
            <footer class="blockquote-footer">
              <cite title="Source Title">{{ image.userName }}</cite>
            </footer>
          </router-link>
          <router-link
            v-else-if="checkIsYour == false"
            :to="{ name: 'Profile', params: { userId: image.userId } }"
          >
            <footer class="blockquote-footer">
              <cite title="Source Title">{{ image.userName }}</cite>
            </footer>
          </router-link>
        </blockquote>
        <div class="flex-container" style="display: flex">
          <div class="mb-3 mt-2" style="margin-right: 4%">
            <base-button
              class="btn-1"
              type="primary"
              @click="addToCart()"
              v-if="checkIsYour == false && checkIsBought == false"
              >Add to cart</base-button
            >
          </div>
          <div class="mb-3 mt-2">
            <base-button
              class="btn-1"
              type="primary"
              v-if="image.typeId == 2"
              @click="openTrackingModal()"
              >Tracking</base-button
            >
          </div>
        </div>

        <Modal
          v-model="trackingModal"
          title="Tracking Details"
          :modal-style="{ 'max-width': '60%' }"
        >
          <div class="container" style="height: 40%; overflow: auto">
            <img
            :src="this.image.wmlink"
            @click="openGallery(0)"
            style="
              height: 400px;
              width: 470px;
              cursor: pointer;
              margin-left: auto;
              margin-right: auto;
              display: block;
            "
          />
          <LightBox
            ref="lightbox"
            :showLightBox="false"
            :showThumbs="false"
            :media="[
              {
                thumb: this.image.wmlink,
                src: this.image.wmlink,
                srcset: this.image.wmlink,
              },
            ]"
          >
            <inner-image-zoom
              :src="this.image.wmlink"
              :zoomSrc="this.image.wmlink"
            />
          </LightBox>

            <light-timeline :items="trackingItems"></light-timeline>
          </div>
        </Modal>
      </div>
      <!-- </div> -->
    </div>
  </div>
  <!-- <div> image {{ photoId }}</div> -->
</template>

<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";
import { merge, of } from "rxjs";
import VueModal from "@kouts/vue-modal";
import "@kouts/vue-modal/dist/vue-modal.css";
import LightBox from "vue-it-bigger";
import("vue-it-bigger/dist/vue-it-bigger.min.css");
// import { response } from "express";

// const { map, pluck, startWith, scan } = rxjs.operators;
export default {
  components: {
    Modal,
    Modal: VueModal,
    VueModal,
    LightBox,
  },
  props: ["follows"],

  data() {
    return {
      photoId: 0,
      isYour: false,
      status: this.follows,
      alreadyBought: false,
      userId: "",
      followUserId: "",
      user: JSON.stringify(window.localStorage.getItem("user")),
      modals: {
        modalTag: false,
      },
      openingBadgeModal: "",
      testPicture: [],
      fullPage: true,
      tagModal: false,
      trackingModal: false,
      trackingItems: [
        // {
        //   tag: "2018-01-12",
        //   content: "hallo",
        // },
        // {
        //   tag: "2018-01-13",
        //   color: "#dcdcdc",
        //   type: "circle",
        //   content: "world",
        // },
        // {
        //   tag: "2018-01-14",
        //   type: "star",
        //   htmlMode: true,
        //   content: "demo",
        // },
      ],
      prevOwnerInfo: [],
      ownerInfo: [],
    };
  },

  methods: {
    openGallery(index) {
      this.$refs.lightbox.showImage(index);
    },
    addToCart() {
      if (this.image.typeId == 2) {
        axios.put(
          "http://35.185.185.238:3000/transactions/checkCart/" + this.photoId
        );
        axios
          .get(
            "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/AddToCart?photoId=" +
              this.photoId
          )
          .then((response) => {
            if (response.data == true) {
              Event.$emit("clicked");
              this.$store.dispatch("addPhotoToCart", {
                image: this.image,
              });
            } else
              this.$toast.warning(
                "Sorry, this photo is being bought by someone else",
                {
                  // override the global option
                  position: "bottom-right",
                }
              );
          });
      } else {
        this.$store.dispatch("addPhotoToCart", {
          image: this.image,
        });
      }
    },
    followUser() {
      // console.log(user.userId)
      console.log(this.$store.state.image.userId);
      axios({
        method: "POST",
        url:
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/Follow",
        data: {
          userId: JSON.parse(this.$store.state.user).userId,
          followUserId: this.$store.state.image.userId,
        },
      }).then((response) => {
        console.log(response.data);
      });
    },
    getPhotosByCategory(badge) {
      axios({
        method: "GET",
        url:
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/GetByCategory/?catName=" +
          badge.categoryName +
          "&photoId=" +
          this.photoId +
          "",
      }).then((response) => {
        this.testPicture = response.data;
      });
    },
    reloadPage() {
      this.$router.go();
    },
    openTrackingModal() {
      this.trackingModal = true;
      this.getTrackingInfo();
    },
    openTagModal() {
      this.tagModal = true;
    },
   getTrackingInfo() {
      let loader = this.$loading.show({
        loader: "dots",
        height: 50,
        width: 50,
      });
      axios
        .get(
          "http://localhost:3000/transactions/getPhotoHistory/" +
            this.image.phash
        )
        .then((response) => {
          if (response.status == 200) {
            console.log(response.data);
            var list = response.data;
            var tmp = "";
            this.trackingItems = [];
            for (let index = 0; index < list.length; index++) {
              // console.log("index no." + index + " " + JSON.stringify(list[index].versions[0].document));
              tmp = list[index].versions[0].document.ownerID;
              if (list[index].versions[0].document.isTransaction == false) {
                this.trackingItems.push({
                  tag: new Date(
                    list[index].versions[0].document.createDate
                  ).toLocaleDateString(),
                  content: "Photo Approval for sale on IMAGO",
                });
                this.trackingItems.push({
                  content: "Current owner of this photo is " + list[index].versions[0].document.ownerID,
                  type: 'star',
                  color: '#90EE90'
                })
              } else if (
                list[index].versions[0].document.isTransaction == true
              ) {
                
                //this ass
                this.getOwnerDetails(list[index].versions[0].document.ownerID);
                this.getPrevOwnerDetails(list[index].versions[0].document.prevOwner);
                //
                console.log(this.ownerInfo + " - " + this.prevOwnerInfo);
                this.trackingItems.push({
                  tag: new Date(
                    list[index].versions[0].document.createDate
                  ).toLocaleDateString(),
                  content:
                    "Transaction from " +
                    this.prevOwnerInfo.username +
                    " to " +
                    this.ownerInfo.username,
                });
                this.trackingItems.push({
                  content: "Current owner of this photo is " + list[index].versions[0].document.ownerID,
                  type: 'star',
                  color: '#EE82EE'
                })
              }
            }
            loader.hide();
          } else {
            loader.hide();
            alert("Network error, please try again!");
          }
        })
        .catch((error) => {
          loader.hide();
          alert("System error, please contact admin!");
          console.log(error);
        });
    },
    async getPrevOwnerDetails(id) {
      await axios
        .get(
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetById/" +
            id
        )
        .then((response) => {
          if (response.status == 200) {
            this.prevOwnerInfo = response.data;
          }
        })
        .catch((error) => {
          // alert("System error, please contact admin!");
          console.log(error);
        });
    },
    async getOwnerDetails(id) {
      await axios
        .get(
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetById/" +
            id
        )
        .then((response) => {
          if (response.status == 200) {
            this.ownerInfo = response.data;
          }
        })
        .catch((error) => {
          // alert("System error, please contact admin!");
          console.log(error);
        });
    },
  },

  computed: {
    image() {
      return this.$store.state.image;
    },
    checkIsYour() {
      return this.$store.state.checkIsYour;
    },
    checkIsBought() {
      return this.$store.state.checkIsBought;
    },
  },

  mounted() {
    console.log(this.photoId);
    this.$store.dispatch("getImage", this.photoId);
    this.$store.dispatch("checkIsYour", this.photoId);
    this.$store.dispatch("checkIsBought", this.photoId);
  },

  created() {
    this.photoId = this.$route.params.photoId;
  },
};
</script>

<style lang="scss" scoped>
.positionImage {
  position: relative;
  left: 10rem;
}
.imageInfo {
  display: flex;
  justify-content: center;
}
.photo-aria {
  width: 100%;
}
.modalStyle {
  width: 95%;
  position: fixed;
  z-index: 100;
  background-color: white;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
}
.ct-example-row {
  position: relative;
  top: 3rem;
  padding: 1.5rem;
}
.badgeTagModal {
  margin-bottom: 0.5rem;
  font-size: 16px !important;
}
.img-fit {
  width: 100%;
  height: 15vw;
  object-fit: cover;
  margin-bottom: 15px;
  border-radius: 20px;
}
.closeModal {
  font-size: 23px;
  float: right;
  position: relative;
  right: 1.5rem;
  top: 0.5rem;
  cursor: pointer;
}
::v-deep {
  .modal-body {
    max-height: 35rem;
    overflow-y: scroll;
    padding: 0;
  }
}
</style>
