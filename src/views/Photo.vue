<template>
  <div class="mb-3" style="background-color:#F2F2F2">
    <div class="row ml-2">
      <div class="col-md-5 col-sm-5 col-xs-12">
        <img :src="image.wmlink" />
      </div>
      <div class="col-md-6 mb-5 mb-md-0 mt-3">
        <h3>{{ image.photoName }}</h3>

        <h5 class="heading">${{ image.price }}</h5>
        <p class="lead">{{ image.description }}</p>
        <badge type="info" class="text-uppercase">{{
          image.category[0].categoryName
        }}</badge>
        <badge type="info" class="text-uppercase">{{
          image.category[1].categoryName
        }}</badge>
        <blockquote class="blockquote mt-2">
          <p class="mb-0">
           Upload By:
          </p>
          <footer class="blockquote-footer">
            <cite title="Source Title">{{image.userName}}</cite>
          </footer>
        </blockquote>
        <div class="mb-3 mt-2">
          <base-button class="btn-1" type="primary" @click="addToCart()"
            >Add to cart</base-button
          >
        </div>
      </div>
    </div>
  </div>
  <!-- <div> image {{ photoId }}</div> -->
</template>

<script>
export default {
  data() {
    return {
      photoId: 0,
    };
  },
  methods: {
    addToCart() {
      this.$store.dispatch("addPhotoToCart", {
        image: this.image,
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
  },

  created() {
    this.photoId = this.$route.params.photoId;
  },
};
</script>

<style>
.photo-aria{
  width: 100%;
}
</style>
