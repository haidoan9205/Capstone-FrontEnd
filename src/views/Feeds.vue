<template>
  <div class="mb-3 mt-3" style="background-color:#F2F2F2">
    <div
      class="container col-md-8 col-sm-8 col-xs-12"
      v-for="item in images"
      :key="item.photoId"
    >
      <!-- <div class="imageInfo"> -->
      <div class="col-md-8 col-sm-8 col-xs-12 positionImage border">
        <div class="row news-header border" style="background-color:white">
          <img v-lazy="'img/theme/user.png'" class="rounded-circle avatar" />
          <router-link
            class="header-name"
            :to="{ name: 'Profile', params: { userId: item.userId } }"
          >
            <p class="header-name">{{ item.userName }}</p>
          </router-link>
        </div>
        <div class="row">
          <router-link
            :to="{ name: 'photo', params: { photoId: item.photoId } }"
          >
            <img
              class="img-fit border"
              style="background-color:white"
              :src="item.wmlink"
            />
          </router-link>
        </div>

        <div
          class="row news-footer mb-3 border"
          style="background-color:white"
          v-if="item.description != null"
        >
          <router-link
            class="footer-name"
            :to="{ name: 'Profile', params: { userId: item.userId } }"
          >
            <p class="footer-name">{{ item.userName }}:</p>
          </router-link>
          <p class="news-description">
            {{ item.description }}
          </p>
        </div>
      </div>
       
    </div>
    <!-- <div class="col-md-3 col-sm-3 follow-bar" >
      <div class="row" v-for="item in unknownPeople" :key="item.userId"> 
        <img v-lazy="'img/theme/user.png'" class="rounded-circle avatar" />
         <router-link
            class="footer-name"
            :to="{ name: 'Profile', params: { userId: item.userId } }"
          >
            <p>{{ item.username }}</p>
          </router-link>
      </div>
    </div> -->
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";
import { merge, of } from "rxjs";

// const { map, pluck, startWith, scan } = rxjs.operators;
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
      fullPage: true,

    };
  },
  computed: {
    images() {
      return this.$store.state.imagesOfFollowing;
    },
    unknownPeople(){
      return this.$store.state.unknownPeople;
    }
  },
  mounted() {
    this.$store.dispatch("getImagesOfFollowing");
    this.$store.dispatch("getUnknownPeople");
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap");
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
.ct-example-row {
  position: relative;
  top: 3rem;
  padding: 1.5rem;
}
.badgeTagModal {
  margin-bottom: 0.5rem;
  font-size: 16px !important;
}
.container {
  margin-top: 10px;
}
.img-fit {
  max-width: 100%;
  max-height: 100%;
  display: block;
}
.closeModal {
  font-size: 23px;
  float: right;
  position: relative;
  right: 1.5rem;
  top: 0.5rem;
  cursor: pointer;
}
.news-header {
  padding: 16px;
}
.news-footer {
  padding: 10px;
}
.border {
  border: 2px solid;
}

.box {
  width: 250px;
  border: 5px solid black;
}
.header-name {
  font-family: "Noto Sans JP", sans-serif;
  font-weight: bold;
  margin-left: 5px;
  margin-top: auto;
  margin-bottom: auto;
  bottom: 7px;
  color: black;
}
.footer-name {
  font-family: "Noto Sans JP", sans-serif;
  font-weight: bold;
  color: black;
}
.news-description {
  font-family: "Noto Sans JP", sans-serif;
  margin-left: 3px;
}
.avatar {
  width: 42px !important;
}
.follow-bar{
  position: fixed;
  top: 120px;
  right: 120px;
  width: 300px;
  border: 3px solid #73AD21;

}
.container{
    position: relative;
}
::v-deep {
  .modal-body {
    max-height: 35rem;
    overflow-y: scroll;
    padding: 0;
  }
}
</style>
