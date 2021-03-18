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
            <cite title="Source Title">{{ image.userName }}</cite>
          </footer>
        </blockquote>
        <div class="mb-3 mt-2">
          <base-button class="btn-1" type="primary" @click="addToCart()"
            >Add to cart</base-button
          >
          <base-button class="btn-2" outline type="primary"  @click="followUser" icon="fa fa-heart-o"
            >Follow</base-button
          >
        </div>
      </div>
    </div>
  </div>
  <!-- <div> image {{ photoId }}</div> -->
</template>

<script>
import axios from 'axios';
export default {
  props: ["follows"],

  data() {
    return {
      photoId: 0,
      status: this.follows,
      userId: '',
      followUserId: '',
      user : JSON.stringify(window.localStorage.getItem('user')),
    };
  },
  
  methods: {
    addToCart() {
      this.$store.dispatch("addPhotoToCart", {
        image: this.image,
      });
    },
    followUser() {
      // console.log(user.userId)
      console.log(this.$store.state.image.userId)
       axios({

                method : 'POST',
                url : 'https://imago.azurewebsites.net/api/v1/Follow/Follow',
                data: {
                    userId :  JSON.parse(this.$store.state.user).userId,
                    followUserId : this.$store.state.image.userId,
                },

            })
        .then((response) => {
          console.log(response.data);
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
.photo-aria {
  width: 100%;
}
</style>
