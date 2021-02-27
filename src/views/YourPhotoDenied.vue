<template>
  <div>
    <div class="justify-content-center button-links">
       <router-link
            :to="{ name: 'yourphoto', params: { userId: user.userId } }"
          >
         <a href="#" class="btn btn-link text-primary">Approved</a>
         </router-link>  
      
     <router-link
            :to="{ name: 'yourphotodenied', params: { userId: user.userId } }"
          >
         <a href="#" class="btn btn-link text-primary">Denied</a>
         </router-link>  
      <a href="#" class="btn btn-link text-primary">Pending</a>
    </div>
    <div class="container container-lg gallery">
      <div class="row mt-4 ">
        <div
          class="col-md-4 mb-5 mb-md-0 gallery-panel"
          v-for="image in images"
          :key="image.photoId"
          :image="image"
        >
          <div class="card card-lift--hover shadow border-0">
            <img v-lazy="image.wmlink" class="img-fit" />
          </div>
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
export default {
  computed: {
    images() {
      return this.$store.state.denied_images;
    },
     isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user(){
      const abc = window.localStorage.getItem('user');
      // console.log(abc);
      const appove = this.$store.state.approved_images;
      console.log(appove)
      return JSON.parse(abc);
    },
  },

  mounted() {
    this.$store.dispatch("getDeniedImageByUser");
  },
};
</script>

<style scoped>
.button-links{
  display: flex;
align-items: center;
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
