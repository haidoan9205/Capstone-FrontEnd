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
    <div class="wrapper">
      <ul class="image-card-grid">
        <image-card
          v-for="image in images"
          :key="image.id"
          :image="image" />
      </ul>
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
import ImageCard from './ImageCard';


export default {
  
  components:{
    ImageCard
  },
  computed: {
    images() {
      return this.$store.state.approved_images;
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
    this.$store.dispatch("getApprovedImageByUser");
  },
};
</script>

<style lang="scss" scoped >
.wrapper {
  margin: 0 auto;
  max-width: 800px;
  @media only screen and (max-width: 799px) {
    max-width: 100%;
    margin: 0 1.5rem;
  }
}
.image-card-grid {
  list-style: none;
  margin: .5rem 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.button-links{
  display: flex;
align-items: center;
}
.gallery-panel {
  width: 20vw;
}
.table td {
  border-top: 0;
}
div.detail {
  max-width: 500px;
}
td.col1 {
  max-width: 150px;
}
td.col2 {
  max-width: 350px;
}
h2 {
  margin-top: 5%
}
h5 {
  margin-top: 45%;
}
table {
  margin-top: 5%;
}
p {
  margin: 0px;
}
.gallery-panel img {
    width: 20vw;
    height: 10vw;
    object-fit: cover;
    border-radius: 0.75rem;
  }
</style>
