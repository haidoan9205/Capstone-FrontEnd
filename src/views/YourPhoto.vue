<template>
  <div class="container table-responsive ">
    <table class="table table-hover table-sm mx-auto">
      <h2>Approved</h2>
      <div class="itemCart" v-for="image in images" :key="image.photoId">
        <tr>
          <td class="col-sm-3  gallery-panel">
            <img :src="image.wmlink" class="img-fluid" />
          </td>
          <td>
            <div class="detail">
              <tr>
                <td class="col1">
                  <strong class="description">Photo:</strong>
                </td>
                <td class="col2">
                  <p>{{ image.photoName }}</p>
                </td>
              </tr>
              <tr>
                <td class="col1">
                  <strong class="description">Status:</strong>
                </td>
                <td class="col2">
                  <p class="status">{{ image.approveStatus }}</p>
                </td>
              </tr>
              <tr>
                <td class="col1">
                  <strong class="description">Description:</strong>
                </td>
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
</template>

<script>
import ImageCard from './ImageCard';

export default {
  components: {
    ImageCard,
  },
  computed: {
    images() {
      return this.$store.state.approved_images;
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
    this.$store.dispatch('getApprovedImageByUser');
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300&family=Oxygen:wght@300&display=swap');
.description {
  font-family: 'Heebo', sans-serif;
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
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
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
.itemCart {
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: lightgray;
}

strong {
  font-size: 15px;
  position: relative;
  top: 4px;
}
.status {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  background-image: linear-gradient(to right, #bef0bd, #a2ed9f, #84e87f, #61e35c, #31de30);
  padding-left: 6px;
  width: 100px;
  border-radius: 10px;
}
</style>
