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
  <div class="container table-responsive">
    <table  class="table table-hover table-sm" >
      <div>
        <tr v-for="image in images" :key="image.photoId">
          <td class="col-sm-3  gallery-panel">
            <img :src="image.wmlink" class="img-fluid" />
          </td>
          <td>
            <div class="detail">
              <tr>  
                <td class="col1"><p style="color:black;">Photo:</p></td>
                <td class="col2">
                  <p style="color:black;">{{ image.photoName }} 
        
                  </p>
                </td>
              </tr>
              <tr>
                <td class="col1"><p style="color:blue;">Status:</p></td>
                <td class="col2">
                  <p style="color:red;">{{image.approveStatus}}</p>
                 
                </td>
              </tr>
               <tr>
                <td class="col1"><p style="color:blue;">Note:</p></td>
                <td class="col2">
                  <p style="color:red;">{{image.note}}</p>
                 
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
