<template>
  <div>
    <div class="position-relative">
      <section class="section section-lg pt-0 pb-0">
        <div
          class="container search-bar"
          style="background-image: linear-gradient(to right, #a3bded, #95b2e3, #86a7da, #789cd0, #6991c7);"
        >
          <div class="row row-grid justify-content-center">
            <h3 class="searchbar-title mt-3">Moving the world with images</h3>
          </div>
          <div class="row row-grid justify-content-center">
            <!-- <i class="fa fa-search my-auto"></i>-->
            <div class="col-md-7 mb-5">
              <base-input
                class="search-aria"
                alternative
                inputClasses="styleInput"
                placeholder="Search creative images..."
                addonRightIcon="fa fa-search"
                type="text"
                v-model="searchValue"
                v-on:keyup.enter="onSearch"
              ></base-input>
            </div>
            <!-- <div>
              <base-button type="secondary" @click="onSearch">
                Search
              </base-button>
            </div> -->
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
      </section>
      <div class="container container-lg gallery">
        <div class="row mt-4 ">
          <div
            class="col-md-4 mb-5 mb-md-0 gallery-panel"
            v-for="image in imagesearch"
            :key="image.photoId"
            :image="image"
          >
            <div class="card card-lift--hover shadow border-0">
              <router-link
                :to="{name: 'photo', params: {photoId: image.photoId}}"
              >
                <img v-lazy="image.wmlink" class="img-fit" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <section class="search-pagination">
        <button
          v-if="HasPrevious === 'true'"
          class="btn btn-outline-dark"
          v-on:click="onPreviouse"
        >
          Previous
        </button>
        <input
          type="text"
          class="form-control paging border-dark"
          v-model="CurrentPage"
        />
        <span class="paging-text">of {{ TotalPages }} </span>
        <button
          v-if="HasNext === 'true'"
          class="btn btn-outline-dark"
          v-on:click="onNext"
        >
          Next
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchValue: '',
      pageSize: 21,
      currentPage: 1,
      imagesearch: [],
      HasNext: '',
      HasPrevious: '',
      TotalPages: '',
      CurrentPage: 0,
      xpagination: null
    }
  },
  watch: {
    $route(to, from) {
        this.searchValue = to.query.searchValue;
        let searchValue = this.searchValue;
        axios.get("https://imago.azurewebsites.net/api/v1/Photo/SearchPhoto/" + searchValue + "?PageSize=21&CurrentPage=1")
            .then((response) => {
                this.imagesearch = response.data;
                this.xpagination = response.headers["x-pagination"];
                this.xpagination = this.xpagination.replaceAll('"', "");
                this.xpagination = this.xpagination.replace('{', "");
                this.xpagination = this.xpagination.replace('}', "");
                this.xpagination = this.xpagination.split(",");
                for(let i = 0; i < this.xpagination.length; i++) {
                    this.xpagination[i] = this.xpagination[i].split(":");
                    if (this.xpagination[i].[0].includes("HasNext")) {
                        this.HasNext = this.xpagination[i].[1];
                    }
                    if (this.xpagination[i].[0].includes("HasPrevious")) {
                        this.HasPrevious = this.xpagination[i].[1];
                    }
                    if (this.xpagination[i].[0].includes("TotalPages")) {
                        this.TotalPages = this.xpagination[i].[1];
                    }
                    if (this.xpagination[i].[0].includes("CurrentPage")) {
                        this.CurrentPage = this.xpagination[i].[1];
                    }
                }
            })
            .catch((error) => {
            console.log(error);
            });
    }
  },
  created(){
      this.searchValue = this.$route.query.searchValue;
  },
  mounted() {
    let searchValue = this.searchValue;
    axios.get("https://imago.azurewebsites.net/api/v1/Photo/SearchPhoto/" + searchValue + "?PageSize=21&CurrentPage=1")
        .then((response) => {
            this.imagesearch = response.data;
            this.xpagination = response.headers["x-pagination"];
            this.xpagination = this.xpagination.replaceAll('"', "");
            this.xpagination = this.xpagination.replace('{', "");
            this.xpagination = this.xpagination.replace('}', "");
            this.xpagination = this.xpagination.split(",");
            for(let i = 0; i < this.xpagination.length; i++) {
                this.xpagination[i] = this.xpagination[i].split(":");
                if (this.xpagination[i].[0].includes("HasNext")) {
                    this.HasNext = this.xpagination[i].[1];
                }
                if (this.xpagination[i].[0].includes("HasPrevious")) {
                    this.HasPrevious = this.xpagination[i].[1];
                }
                if (this.xpagination[i].[0].includes("TotalPages")) {
                    this.TotalPages = this.xpagination[i].[1];
                }
                if (this.xpagination[i].[0].includes("CurrentPage")) {
                    this.CurrentPage = this.xpagination[i].[1];
                }
            }
        })
        .catch((error) => {
        console.log(error);
        });
  },
  methods: {
    onSearch() {
        let searchValue = this.searchValue;
        if (this.$route.query.searchValue !== searchValue) {
            this.$router.push({ name: 'search', query: { searchValue: this.searchValue } });
        }
    },
    onPreviouse() {
        let searchValue = this.searchValue;
        let currentPage = parseInt(this.CurrentPage) - 1;
        axios.get("https://imago.azurewebsites.net/api/v1/Photo/SearchPhoto/" + searchValue + "?PageSize=21&CurrentPage=" + currentPage)
            .then((response) => {
                this.imagesearch = response.data;
                this.xpagination = response.headers["x-pagination"];
                this.xpagination = this.xpagination.replaceAll('"', "");
                this.xpagination = this.xpagination.replace('{', "");
                this.xpagination = this.xpagination.replace('}', "");
                this.xpagination = this.xpagination.split(",");
                for(let i = 0; i < this.xpagination.length; i++) {
                    this.xpagination[i] = this.xpagination[i].split(":");
                    if (this.xpagination[i].[0].includes("HasNext")) {
                        this.HasNext = this.xpagination[i].[1];
                    }
                    if (this.xpagination[i].[0].includes("HasPrevious")) {
                        this.HasPrevious = this.xpagination[i].[1];
                    }
                    if (this.xpagination[i].[0].includes("TotalPages")) {
                        this.TotalPages = this.xpagination[i].[1];
                    }
                    if (this.xpagination[i].[0].includes("CurrentPage")) {
                        this.CurrentPage = this.xpagination[i].[1];
                    }
                }
                window.scrollTo(0,0);
            })
            .catch((error) => {
            console.log(error);
            });
    },
    onNext() {
        let searchValue = this.searchValue;
        let currentPage = parseInt(this.CurrentPage) + 1;
        axios.get("https://imago.azurewebsites.net/api/v1/Photo/SearchPhoto/" + searchValue + "?PageSize=21&CurrentPage=" + currentPage)
            .then((response) => {
                this.imagesearch = response.data;
                this.xpagination = response.headers["x-pagination"];
                this.xpagination = this.xpagination.replaceAll('"', "");
                this.xpagination = this.xpagination.replace('{', "");
                this.xpagination = this.xpagination.replace('}', "");
                this.xpagination = this.xpagination.split(",");
                for(let i = 0; i < this.xpagination.length; i++) {
                    this.xpagination[i] = this.xpagination[i].split(":");
                    if (this.xpagination[i].[0].includes("HasNext")) {
                        this.HasNext = this.xpagination[i].[1];
                    }
                    if (this.xpagination[i].[0].includes("HasPrevious")) {
                        this.HasPrevious = this.xpagination[i].[1];
                    }
                    if (this.xpagination[i].[0].includes("TotalPages")) {
                        this.TotalPages = this.xpagination[i].[1];
                    }
                    if (this.xpagination[i].[0].includes("CurrentPage")) {
                        this.CurrentPage = this.xpagination[i].[1];
                    }
                }
                window.scrollTo(0,0);
            })
            .catch((error) => {
            console.log(error);
            });
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;1,300&display=swap');
.searchbar-title {
  font-family: monospace;
  position: relative;
  top: 2rem;
}
.search-bar {
  max-width: 100%;
}
.search-aria {
  
  box-shadow: none;
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
button {
  width: 155px;
  height: 48px;
}
.search-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 2rem;
}
.paging {
  max-width: 46px;
  text-align: center;
  margin-left: 5%;
  margin-right: 10px;
  font-size: 18px;
  color: black;
}
.paging-text {
  text-align: center;
  margin-right: 5%;
  font-size: 18px;
  color: black;
}
</style>
