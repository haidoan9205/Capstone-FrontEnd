<template>
  <div> hai ne</div>
</template>

<script>
export default {
  methods: {
    download() {
      this.$store.dispatch("downloadImage", this.$route.params.tokenId, this.$route.params.photoId);
    },
  },
  
};
</script>

<style></style>
