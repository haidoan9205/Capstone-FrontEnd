<template>
  <div > 
    <div class="position-relative">
      <!-- shape Hero -->

      <section class="section section-lg pt-0 pb-0 mt-4">
        <div class="container search-bar">
          <div class="row row-grid justify-content-center">
            <h3>Moving the world with images</h3>
          </div>
          <div class="row row-grid justify-content-center">
            <i class="fa fa-search my-auto"></i>
            <div class="col-md-6">
              <base-input
                alternative
                placeholder="Search creative images...  "
              ></base-input>
            </div>
            <base-dropdown>
              <base-button
                slot="title"
                type="secondary"
                class="dropdown-toggle"
              >
                Regular
              </base-button>
            </base-dropdown>
            <!-- <div class="col-md-2">
              <div class="row row-grid justify-content-center">
                <i class="fa fa-camera"></i>
              </div>
              <div class="row justify-content-center">
                <p>search by image</p>
              </div>
            </div> -->
          </div>
          <br />
        </div>
        <!-- <div class="col-md-6 m-auto justify-content-center cat-bar">
          <a href="#" class="btn btn-link text-primary">Creative</a>
          <a href="#" class="btn btn-link text-primary">Editorial</a>
          <a href="#" class="btn btn-link text-primary">Video</a>
          <a href="#" class="btn btn-link text-primary">Music</a>
          <a href="#" class="btn btn-link text-primary">Blog</a>
          <a href="#" class="btn btn-link text-primary">Collections</a>
        </div> -->
      </section>
      <div class="container container-lg mb-0">
         <!-- <div class="row mt-4">
          <div class="col-md-4 mb-5 mb-md-0">
            <div class="card card-lift--hover shadow border-0">
              <img
                v-lazy="
                  'https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                "
                class="card-img"
              />
            </div>
          </div>
          <div class="col-md-4 mb-5 mb-lg-0">
            <div class="card card-lift--hover shadow border-0">
              <img
                v-lazy="
                  'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                "
                class="card-img"
              />
            </div>
          </div>
          <div class="col-md-4 mb-5 mb-lg-0">
            <div class="card card-lift--hover shadow border-0">
              <img
                v-lazy="
                  'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                "
                class="card-img"
              />
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-4 mb-5 mb-md-0">
            <div class="card card-lift--hover shadow border-0">
              <img
                v-lazy="
                  'https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                "
                class="card-img"
              />
            </div>
          </div>
          <div class="col-md-4 mb-5 mb-lg-0">
            <div class="card card-lift--hover shadow border-0">
              <img
                v-lazy="
                  'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                "
                class="card-img"
              />
            </div>
          </div>
          <div class="col-md-4 mb-5 mb-lg-0">
            <div class="card card-lift--hover shadow border-0">
              <img
                v-lazy="
                  'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                "
                class="card-img"
              />
            </div>
          </div>
        </div>  -->
        <list-image></list-image>
      </div>
    </div>
  </div>
</template>

<script>
import ListImage from "../components/ListImage.vue";

export default {
  name: "home",
  components: {
    listImage: ListImage,
  },
};
</script>
<style scoped>
  .search-bar{
    
    max-width: 100%;
  }
</style>
