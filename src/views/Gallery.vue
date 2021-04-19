<template>
  <VirtualGrid :items="images" :images="images" />
</template>

<script>
import VirtualGrid from 'vue-virtual-grid';
import Gallery from "vue-cover-gallery"
export default {
  components:{
    VirtualGrid,
    Gallery
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
