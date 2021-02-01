<template>
  <div class="container container-lg"> 
    <div class="row">
      <div class="col-md-6 mb-5 mb-md-0 mt-3">
        <img width="70%" height="80%" :src="image.wmlink" />
      </div>
      <div class="col-md-6 mb-5 mb-md-0 mt-3">
        <h5 class="text-uppercase font-weight-bold"
          >How can I buy this?</h5
        >
        <base-radio name="radio0" class="mb-3">
          Large
        </base-radio>
        <base-radio name="radio1" class="mb-3">
          Medium
        </base-radio>
        <base-radio name="radio1" class="mb-3">
          Small
        </base-radio>
        <h3 class="text-uppercase font-weight-bold">${{ image.price }}</h3>
        <div class="mb-3 mt-5">
          <base-button class="btn-1" type="primary" @click="addToCart()">Add to cart</base-button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div> image {{ photoId }}</div> -->
</template>

<script>
export default {


  data(){
    return {
      photoId : 0
    }
  },
  methods:{
    addToCart(){
      this.$store.dispatch('addPhotoToCart', {
        image: this.image,
      });
    }
  },

  computed: {
    image() {
      return this.$store.state.image;
    },
  },

  mounted() {
    console.log(this.photoId)
    this.$store.dispatch('getImage', this.photoId); 
  },

  created(){
    this.photoId = this.$route.params.photoId;
  }
};
</script>

<style></style>
