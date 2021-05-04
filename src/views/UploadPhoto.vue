<template>
  <div
    class="row align-items-center justify-content-center text-center"
    
  >
    <div class="col-md-7 mt-3 content" style="background-image: linear-gradient(to right top, #e8d891, #eddc93, #f2df95, #f8e398, #fde69a);">
      <h4 class="mb-3 mt-0">Upload a new photo</h4>
      <form @submit.prevent="onUploadPhoto" method="post">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group ">
              <label class="control-label" style="font-weight:bold"
                >Title</label
              >
              <input
                type="text"
                class="form-control"
                v-model="photoName"
                required
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label" style="font-weight:bold"
                >Price $</label
              >
              <input
                type="text"
                style="text-align: right;"
                class="form-control"
                v-model="price"
                required
              />
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group first">
              <label class="control-label" style="font-weight:bold"
                >Select Picture</label
              >
              <input
                type="file"
                class="form-control"
                @change="onFileSeleted"
                accept="image/*"
                required
              />
              <span style="color:red" v-if="msg.file">{{ msg.file }}</span>
            </div>
          </div>

          <div class="col-md-12">
            <div class="multiselect-div first">
              <label class="typo__label" for="ajax" style="font-weight:bold"
                >Select 2 Category</label
              >
              <multiselect
                v-model="value"
                id="ajax"
                label="categoryName"
                track-by="categoryId"
                placeholder="Type to search"
                open-direction="bottom"
                :options="options"
                :multiple="true"
                :searchable="true"
                :internal-search="true"
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
          </div>

          <br />
          <div class="row">
            <div class="col-md-12">
              <div class="multiselect-div pl-3">
                <label class="typo__label" style="font-weight:bold"
                  >License Type</label
                >
                <multiselect
                  class="license"
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
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group pl-3">
                <label class="control-label" style="font-weight:bold"
                  >Description</label
                >
                <input
                  type="text"
                  class="form-control description"
                  v-model="description"
                  required
                />
              </div>
            </div>
          </div>

          <div class="buttonHolder">
            <button class="btn btn-primary submit-button" type="submit">
              <div class="lds-ring" v-if="loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Spinner from "./Spinner.vue";
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Multiselect,
    Spinner,
    Modal,
  },
  data() {
    return {
      modals: {
        modal1: false,
        modal2: false,
        modal3: false,
      },
      isImage: false,
      upload: false,
      loading: false,
      photoName: "",
      file: null,
      price: "",
      description: "",
      value: [],
      options: [],
      type: null,
      typeList: [],
      msg: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  mounted: function() {
    axios
      .get(
        "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Category"
      )
      .then((response) => {
        this.options = response.data;
        this.clone_options = response.data;
      });
    axios
      .get(
        "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Type/GetAllType"
      )
      .then((response) => {
        this.typeList = response.data;
      });
  },
  methods: {
    onFileSeleted(event) {
      this.file = event.target.files[0];
      if (!this.file.type.match("image.*")) {
        this.$toast.warning(
          "Sorry but the file use choosed is not an image, please try again"
        );
        this.isImage = false;
        this.file = null;
      }
      if (this.file.size > 4194304) {
        this.$toast.warning(
          "File is too big! Please choose image size smaller than 4MB"
        );
      }
      if (this.file.type.match("image.*")) {
        this.isImage = true;
      }
      console.log(this.file.size);
    },
    onUploadPhoto() {
      this.upload = true;
      this.loading = true;
      if (this.isImage === false) {
        this.$toast.warning("Please choose image");
        this.loading = false;
        return;
      }
      if (this.file.size > 4194304) {
        this.$toast.warning(
          "File is too big! Please choose image size smaller than 4MB"
        );
        this.loading = false;
        return;
      }
      if (this.value.length === 0) {
        this.$toast.warning("Please select category");
        this.loading = false;
        return;
      }
      if (isNaN(this.price)) {
        this.$toast.warning("Price must be an number!");
        this.loading = false;
        return;
      }
      const fd = new FormData();
      fd.append("photoName", this.photoName);
      fd.append("file", this.file, this.file.name);
      fd.append("price", this.price);
      fd.append("typeId", this.type.typeId);
      fd.append("userId", this.user.userId);
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
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/CreatePhoto",
          fd,
          config
        )
        .then((respone) => {
          if (respone.status == 201) {
            this.loading = false;
            this.$alert("Upload Successfully", "Success", "success").then(
              () => console.log("Closed"),
              setTimeout(this.$router.push({ name: "yourphotopending" })),
              1000
            );
          } else {
            Vue.$toast.error("Upload error, please try again");
            this.loading = false;
          }
        })
        .catch((error) => {
          this.$toast.error("Something went wrong, please try again");
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  // border: 1px solid;
  border-radius: 12px;
  max-width: 60%;
}
.license {
  width: 19rem;
}
.description {
  width: 19rem;
  height: 5rem;
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
  margin-inline: auto;
}
h4 {
  padding-top: 5%;
}
.multiselect-div {
  margin-bottom: 28px;
}
.content {
  padding-bottom: 20px;
  border: 0.5px solid;
  border-radius: 15px;
}
.bg {
  filter: blur(8px);
  -webkit-filter: blur(8px);

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.submit-button {
  width: 170px;
  margin-bottom: 5px;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 18px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  margin-bottom: 0;
  margin-top: 0;
  margin-inline: 0;
  border: 3px solid #fff;
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

.modal-confirm {
  color: #636363;
  width: 325px;
  font-size: 14px;
}
.modal-confirm .modal-content {
  padding: 20px;
  border-radius: 5px;
  border: none;
}
.modal-confirm .modal-header {
  border-bottom: none;
  position: relative;
}
.modal-confirm h4 {
  text-align: center;
  font-size: 26px;
  margin: 30px 0 -15px;
}
.modal-confirm .form-control,
.modal-confirm .btn {
  min-height: 40px;
  border-radius: 3px;
}
.modal-confirm .close {
  position: absolute;
  top: -5px;
  right: -5px;
}
.modal-confirm .modal-footer {
  border: none;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
}
.modal-confirm .icon-box {
  color: #fff;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -70px;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  z-index: 9;
  background: #82ce34;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
}
.modal-confirm .icon-box i {
  font-size: 58px;
  position: relative;
  top: 3px;
}
.modal-confirm.modal-dialog {
  margin-top: 80px;
}
.modal-confirm .btn {
  color: #fff;
  border-radius: 4px;
  background: #82ce34;
  text-decoration: none;
  transition: all 0.4s;
  line-height: normal;
  border: none;
}
.modal-confirm .btn:hover,
.modal-confirm .btn:focus {
  background: #6fb32b;
  outline: none;
}
.trigger-btn {
  display: inline-block;
  margin: 100px auto;
}
</style>
