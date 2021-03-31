<template>
  <div class="mb-3" style="background-color:#F2F2F2">
    <div class="row ml-2 imageInfo">
      <!-- <div class="imageInfo"> -->
      <div class="col-md-5 col-sm-5 col-xs-12">
        <img :src="image.wmlink" />
      </div>
      <div class="col-md-6 mb-5 mb-md-0 mt-3">
        <h3>{{ image.photoName }}</h3>

        <h5 class="heading">${{ image.price }}</h5>
        <p class="lead">
          {{ image.description }}
        </p>
        <badge
          type="info"
          class="text-uppercase"
          v-for="(badge, index) in image.category"
          :key="index"
        >
          <span
            @click="
              modals.modalTag = true;
              openingBadgeModal = badge.categoryName;
              getPhotosByCategory(badge);
            "
          >
            {{ badge.categoryName }}
          </span>
        </badge>
        <modal :show.sync="modals.modalTag">
          <div class="container">
            <div class="modalStyle">
              <badge type="info" class="text-uppercase badgeTagModal">
                {{ openingBadgeModal }}
              </badge>
              <i
                class="fa fa-times closeModal"
                @click="
                  modals.modalTag = false;
                  openingBadgeModal = '';
                "
                aria-hidden="true"
              ></i>
            </div>
            <div class="ct-example-row">
              <div class="row">
                <div
                  class="col-6 col-md-4"
                  v-for="item in testPicture"
                  :key="item.photoId"
                >
                  <router-link
                    :to="{ name: 'photo', params: { photoId: item.photoId } }"
                  >
                    <img v-lazy="item.wmlink" class="img-fit" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </modal>

        <blockquote class="blockquote mt-2">
          <p class="mb-0">
            Upload By:
          </p>
          <router-link
            :to="{ name: 'Profile', params: { userId: image.userId } }"
          >
            <footer class="blockquote-footer">
              <cite title="Source Title">{{ image.userName }}</cite>
            </footer>
          </router-link>
        </blockquote>
        <div class="mb-3 mt-2">
          <base-button
            class="btn-1"
            type="primary"
            @click="addToCart()"
           
            v-if="this.isYour == false && alreadyBought == false"
            >Add to cart</base-button
          >
        
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
  <!-- <div> image {{ photoId }}</div> -->
</template>

<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";
export default {
  components: { Modal },
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
    };
  },

  methods: {
    addToCart() {
      this.$store.dispatch("addPhotoToCart", {
        image: this.image,
      });
    },
    followUser() {
      // console.log(user.userId)
      console.log(this.$store.state.image.userId);
      axios({
        method: "POST",
        url: "https://imago.azurewebsites.net/api/v1/Follow/Follow",
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
          "https://imago.azurewebsites.net/api/v1/Photo/GetByCategory/?catName=" +
          badge.categoryName +
          "&photoId=" +
          this.photoId +
          "",
      }).then((response) => {
        this.testPicture = response.data;
      });
    },
  },

  computed: {
    image() {
      return this.$store.state.image;
    },
  },

  mounted() {
    console.log(this.photoId);
    this.$store.dispatch("getImage", this.photoId);

    axios({
      method: "GET",
      url:
        "https://imago.azurewebsites.net/api/v1/Photo/CheckBoughtPhoto?id=" +
        this.photoId +
        "&userId=" +
        JSON.parse(this.$store.state.user).userId,
    }).then((response) => {
      this.alreadyBought = response.data;
    });

     this.isYour = this.$store.state.approved_images.includes(this.photoId);
     console.log('con cac')
     console.log(this.isYour)
  },

  created() {
    this.photoId = this.$route.params.photoId;
  },
};
</script>

<style lang="scss" scoped>
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
