<template>
  <div class="container table-responsive">
    <h2>Denied</h2>
    <table class="table table-hover table-sm">
      <div class="itemCart" v-for="image in images" :key="image.photoId">
        <tr>
          <td class="col-sm-3  gallery-panel">
            <img :src="image.wmlink" class="img-fluid" />
          </td>
          <td>
            <div class="detail">
              <tr>
                <td class="col1"><strong class="rejection">Photo:</strong></td>
                <td class="col2">
                  <p style="color:black;">{{ image.photoName }}</p>
                </td>
              </tr>
              <tr>
                <td class="col1"><strong class="rejection">Status:</strong></td>
                <td class="col2">
                  <p class="status">{{ image.approveStatus }}</p>
                </td>
              </tr>
              <tr>
                <td class="col1">
                  <strong class="rejection">Rejection reasons:</strong>
                </td>
                <td class="col2">
                  <p style="color:red;">{{ image.note }}</p>
                </td>
              </tr>
            </div>
          </td>
        </tr>
      </div>
    </table>
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
import axios from 'axios';
export default {
  data() {
    return {
      photoId: 0,
    };
  },
  computed: {
    images() {
      return this.$store.state.denied_images;
    },
    image() {
      return this.$store.state.image;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      const abc = window.localStorage.getItem('user');
      // (abc);
      const appove = this.$store.state.approved_images;
      
      return JSON.parse(abc);
    },
  },

  mounted() {
    this.$store.dispatch('getDeniedImageByUser');
   
  },
  methods: {
    select: function(event) {
      targetId = event.images.photoId;
      (targetId); // returns 'foo'
    },
  
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300&family=Oxygen:wght@300&display=swap');

.button-links {
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
  margin-top: 5%;
}
h5 {
  margin-top: 45%;
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
.rejection {
  font-family: 'Heebo', sans-serif;
}
.reason {
  font-family: 'Oxygen', sans-serif;
}

.itemCart {
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: lightgray;
}
.status {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  width: 100px;
  background-image: linear-gradient(to right, #f4a0a0, #f2898a, #ef7275, #ea5860, #e4394c);
  padding-left: 6px;
  border-radius: 10px;
}
strong {
  font-size: 15px;
  position: relative;
  top: 4px;
}
</style>
