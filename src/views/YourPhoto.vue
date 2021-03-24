<template>
  <div>
    <div class="justify-content-center button-links" style="background-color:#FAE9CD;">
      <router-link
            :to="{ name: 'yourphoto', params: { userId: user.userId } }"
          >
         <a href="#"  class="btn btn-link text-success">Approved</a>
         </router-link>  
      <router-link
            :to="{ name: 'yourphotodenied', params: { userId: user.userId } }"
          >
         <a href="#" class="btn btn-link text-warning">Denied</a>
         </router-link>  
      
      <a href="#" class="btn btn-link text-primary">Pending</a>
    </div>
  <div class="container table-responsive ">
      <table class="table table-hover table-sm mx-auto">
        <div>
          <tr v-for="image in images" :key="image.photoId">
            <td class="col-sm-3  gallery-panel">
              <img :src="image.wmlink" class="img-fluid" />
            </td>
            <td>
              <div class="detail">
                <tr>
                  <td class="col1"><h6 class="description">Photo:</h6></td>
                  <td class="col2">
                    <p >{{ image.photoName }}</p>
                  </td>
                </tr>
                <tr>
                  <td class="col1"><h6 class="description">Status:</h6></td>
                  <td class="col2">
                    <p>{{ image.approveStatus }}</p>
                  </td>
                </tr>
                <tr>
                  <td class="col1"><h6 class="description">Description:</h6></td>
                  <td class="col2">
                    <p>{{ image.description }}</p>
                  </td>
                </tr>
              </div>
            </td>
          </tr>
        </div>
      </table>
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
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@300&family=Oxygen:wght@300&display=swap");
.description{
  font-family: "Heebo", sans-serif;
}
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
