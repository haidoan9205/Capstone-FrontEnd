<template>
  <div > 
    <div class="position-relative">
      <!-- shape Hero -->

      <section class="section section-lg pt-0 pb-0 mt-4">
        <div class="container search-bar">
          <div class="row row-grid justify-content-center">
            <h3>Moving the world with images</h3>
          </div>
          <div class="row row-grid justify-content-center">
             <!-- <i class="fa fa-search my-auto"></i>-->
            <div class="col-md-7">
              <base-input
                alternative
                placeholder="Search creative images..." type="text" v-model="searchValue"
              ></base-input>
            </div>
            <div>
              <base-button
                type="secondary"
                @click="onSearch"
              >
                Search
              </base-button>
            </div>
            <!-- <div class="col-md-2">
              <div class="row row-grid justify-content-center">
                <i class="fa fa-camera"></i>
              </div>
              <div class="row justify-content-center">
                <p>search by image</p>
              </div>
            </div> -->
          </div>
          <br />
        </div>
        <!-- <div class="col-md-6 m-auto justify-content-center cat-bar">
          <a href="#" class="btn btn-link text-primary">Creative</a>
          <a href="#" class="btn btn-link text-primary">Editorial</a>
          <a href="#" class="btn btn-link text-primary">Video</a>
          <a href="#" class="btn btn-link text-primary">Music</a>
          <a href="#" class="btn btn-link text-primary">Blog</a>
          <a href="#" class="btn btn-link text-primary">Collections</a>
        </div> -->
      </section>
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
                :to="{ name: 'photo', params: { photoId: image.photoId } }"
              >
                <img v-lazy="image.wmlink" class="img-fit" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListImage from "../components/ListImage.vue";
import axios from 'axios';

export default {
  name: "home",
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
      x_pagination: []
    }
  },
  methods: {
    onSearch() {
      return this.$router.push({ name: 'search', query: { searchValue: this.searchValue } });
    }
  }
};
</script>
<style scoped>
.search-bar{
  
  max-width: 100%;
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
</style>
