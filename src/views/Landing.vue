<template>
  <div style="background-color: #c6d1e4;">
    <div class="position-relative">
      <!-- shape Hero -->

      <section class="section section-lg pt-0 pb-0 ">
        <div class="container search-bar">
          <div class="row row-grid justify-content-center">
            <h3 class="mt-3 searchbar-title">Moving the world with images</h3>
          </div>
          <div class="row row-grid justify-content-center ">
            <!-- <i class="fa fa-search my-auto"></i>-->
            <div class="col-md-7">
              <base-input
                class="search-aria"
                alternative
                inputClasses="styleInput"
                placeholder="Search creative images"
                type="text"
                addonRightIcon="fa fa-search"
                v-model="searchValue"
                v-on:keyup.enter="onSearch"
              ></base-input>
            </div>
            <!-- <div>
              <base-button  type="secondary" @click="onSearch">
                Search
              </base-button>
            </div> -->
          </div>
          <br />
        </div>

        <div class="overlay"></div>
      </section>
      <div>
        <list-image v-if="flag === true"></list-image>
        <div v-if="flag === false" class="container container-lg gallery">
          <div class="row mt-4 ">
            <div
              class="col-md-4 mb-5 mb-md-0 gallery-panel"
              v-for="image in imagesearch"
              :key="image.photoId"
              :image="image"
            >
              <div class="card card-lift--hover shadow border-0">
                <router-link
                  :to="{name: 'photo', params: {photoId: image.photoId}}"
                >
                  <img v-lazy="image.wmlink" class="img-fit" />
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="overlay2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ListImage from '../components/ListImage.vue';
import axios from 'axios';

export default {
  name: 'home',
  components: {
    listImage: ListImage,
  },
  data() {
    return {
      flag: true,
      searchValue: '',
      pageSize: 21,
      currentPage: 1,
      imagesearch: [],
      x_pagination: [],
    };
  },
  methods: {
    onSearch() {
      let searchValue = this.searchValue;
      if (searchValue.length == 0) {
        return;
      }
      return this.$router.push({
        name: 'search',
        query: {searchValue: this.searchValue},
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;1,300&display=swap');
.searchbar-title {
  font-family: monospace;
  position: relative;
  top: 2rem;
}
.search-bar {
  max-width: 100%;
}
.search-aria {
  box-shadow: none;
}
.img-fit {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.gallery {
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); */
  grid-gap: 1rem;
  max-width: 100rem;
  margin: 3rem auto;
  padding: 0 5rem;
}
.gallery-panel img {
  width: 100%;
  height: 22vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
.gallery-panel {
  padding-bottom: 15px;
}
.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 14.9rem;
  right: unset;
  width: 100%;
  height: 100px;
  background: linear-gradient(0deg, hsla(0, 0%, 100%, 0) 0, #c6d1e4);
}
.overlay2 {
  position: absolute;
  bottom: -3rem;
  left: 0;
  top: unset;
  right: unset;
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, #c6d1e4);
}
.styleSearch {
  position: relative;
  bottom: 0;
  left: 0;
  top: unset;
  right: unset;
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, #c6d1e4);
}
</style>
