<template>
  <div
    class="container mb-2"
    style="background-color:#FAE9CD"
  >
    <div class="form bg-text">
      <div class="lds-ring" v-if="loading"><div></div><div></div><div></div><div></div></div>
      <h4>Upload a new photo</h4>
      <form @submit.prevent="onUploadPhoto" method="post">
        <div class="form-group">
          <label class="control-label">Title</label>
          <input
            type="text"
            class="form-control"
            v-model="photoName"
            required
          />
        </div>
        <div class="form-group">
          <label class="control-label">Select Picture</label>
          <input
            type="file"
            class="form-control"
            @change="onFileSeleted"
            accept="image/*"
            required
          />
        </div>
        <div class="multiselect-div">
          <label class="typo__label" for="ajax">Select 2 Category</label>
          <multiselect
            v-model="value"
            id="ajax"
            label="categoryName"
            track-by="categoryId"
            placeholder="Type to search"
            open-direction="bottom"
            :options="options"
            :multiple="true"
            :searchable="flag"
            :internal-search="flag"
            :clear-on-select="false"
            :close-on-select="false"
            :options-limit="100"
            :limit="2"
            :max-height="150"
            :hide-selected="true"
            :max="2"
          >
          </multiselect>
        </div>
        <div class="multiselect-div">
          <label class="typo__label">Single Type</label>
          <multiselect
            v-model="type"
            deselect-label="Can't remove this value"
            open-direction="bottom"
            track-by="typeId"
            label="typeName"
            placeholder="Select one"
            :options="typeList"
            :searchable="false"
            :allow-empty="false"
          >
          </multiselect>
        </div>
        <div class="form-group">
          <label class="control-label">Description</label>
          <input
            type="text"
            class="form-control"
            v-model="description"
            required
          />
        </div>
        <div class="form-group">
          <label class="control-label">Price</label>
          <input type="text" class="form-control" v-model="price" required />
        </div>
        <div class="buttonHolder">
          <button class="btn btn-primary" type="submit">Upload</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Spinner from './Spinner.vue';

export default {
  components: {
    Multiselect,
    Spinner,
    Spinner
  },
  data() {
    return {
      loading: false,
      photoName: "",
      file: null,
      price: "",
      description: "",
      value: [],
      options: [],
      type: null,
      typeList: [],
    };
  },
  mounted: function() {
    axios
      .get("https://imago.azurewebsites.net/api/v1/Category")
      .then((response) => {
        this.options = response.data;
        this.clone_options = response.data;
      });
    axios
      .get("https://imago.azurewebsites.net/api/v1/Type/GetAllType")
      .then((response) => {
        this.typeList = response.data;
      });
  },
  methods: {
    onFileSeleted(event) {
      this.file = event.target.files[0];
    },
    onUploadPhoto() {
      this.loading=true;
      if (this.value.length === 0) {
        alert("Please select category");
        return;
      }
      const fd = new FormData();
      fd.append("photoName", this.photoName);
      fd.append("file", this.file, this.file.name);
      fd.append("price", this.price);
      fd.append("typeId", this.type.typeId);
      fd.append("userId", this.$store.state.user.userId);
      fd.append("listCategory", this.value[0].categoryId);
      if (this.value.length === 2) {
        fd.append("listCategory", this.value[1].categoryId);
      }

      fd.append("description", this.description);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(
          "https://imago.azurewebsites.net/api/v1/Photo/CreatePhoto",
          fd,
          config
        )
        .then((respone) => {
          if (respone.status == 201) {
            this.loading = false;
            alert("Upload successfully");
          } else {
            alert("Upload error");
          }
          console.log(respone.status);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

.container{
    border: 1px solid;
    border-radius: 12px;
    max-width: 60%;
    
}
div.form {
  display: block;
  text-align: center;
  
}
form {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  max-width: 300px;
}
.buttonHolder {
  text-align: center;
}
h4 {
  padding-top: 5%;
}
.multiselect-div {
  margin-bottom: 28px;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
