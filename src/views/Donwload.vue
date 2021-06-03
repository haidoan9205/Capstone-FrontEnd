<template>
  <div class="row align-items-center justify-content-center text-center" style="padding-top: 40px; height: 400px;">
    <div class="col">
      <h3>Token will expire after 15 minutes</h3>
      <button class="btn btn-primary"  @click="download()" >Download</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function() {
    (this.$route.query.tokenId);
    (this.$route.query.photoId);
  },
  methods: {
    download() {
     
      this.$store.dispatch("downloadImage", {
        tokenId: this.$route.query.tokenId,
        photoId: this.$route.query.photoId
      });
    },
  },  
};
</script>

<style></style>
