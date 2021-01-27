<template>
  <div class="container container-lg">
    <div class="row mt-4">
      <div
        class="col-md-4 mb-5 mb-md-0"
        v-for="image in images"
        :key="image.photoId"
        :image="image"
      >
        <div class="card card-lift--hover shadow border-0">
          <router-link
            :to="{ name: 'photo', params: { photoId: image.photoId } }"
          >
            <img v-lazy="image.link" class="img-fit" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
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
  object-fit: cover;
}
</style>
