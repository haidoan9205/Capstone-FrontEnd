<template>
  <div
    class="container container-lg gallery"
    style="background-color: #FFFFFF
"
  >
    <div class="row mt-4 ">
      <div
        class="col-md-4 mb-5 mb-md-0 gallery-panel"
        v-for="image in images"
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
  <!-- <div class="row gallery ">
    <div class="gallery-panel"
         v-for="image in images"
         :key="image.photoId">
      <img :src="image.link">
    </div>
   </div>  -->
</template>

<script>
import VirtualGrid from "vue-virtual-grid";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    VirtualGrid,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
    };
  },
  computed: {
    images() {
      return this.$store.state.images;
    },
  },

  mounted() {
    this.$store.dispatch("getImages");
  },
};
</script>

<style scoped>
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
  padding: 0 2rem !important;
}
.gallery-panel img {
  width: 100%;
  height: 22vw;
  object-fit: cover;
  border-radius: 0;
}
.gallery-panel {
  padding-bottom: 15px;
}
</style>
