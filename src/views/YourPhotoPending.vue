<template>
  <div class="container table-responsive">
    <h2>Pending</h2>
    <table class="table table-hover table-sm">
      <div class="itemCart" v-for="(item,index) in images" :key="index">
        <tr>
          <td class="col-sm-3  gallery-panel">
            <img :src="item.wmlink" class="img-fluid" />
          </td>
          <td>
            <div class="detail">
              <tr>
                <td class="col1"><strong class="rejection">Photo:</strong></td>
                <td class="col2">
                  <p style="color:black;">{{ item.photoName }}</p>
                </td>
                <td class="button-remove">
                  <button
                    type="button"
                    class="close"
                    aria-label="Close"
                    @click="
                      (modals.modalConfirmDelete = true),
                        (objectSelected = item),
                        (selected = index)
                    "
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="col1"><strong class="rejection">Status:</strong></td>
                <td class="col2">
                  <p class="status">{{ item.approveStatus }}</p>
                </td>
              </tr>
            </div>
          </td>
        </tr>
      </div>

      <modal
        :show.sync="modals.modalConfirmDelete"
        gradient="danger"
        modal-classes="modal-danger modal-dialog-centered"
      >
        <div class="py-3 text-center">
          <i class="fa fa-meh-o" style="font-size:50px"></i>
          <h6 class="heading mt-4">
            Are you sure?
          </h6>
          <p>
            This image will be deleted.
          </p>
        </div>

        <base-button
          type="white"
          @click="
            deletePhoto(objectSelected), (modals.modalConfirmDelete = false)
          "
          >Ok, Delete It</base-button
        >
        <base-button
          type="link"
          text-color="white"
          class="ml-auto"
          style="float:right"
          @click="modals.modalConfirmDelete = false"
        >
          Close
        </base-button>
      </modal>
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
import axios from "axios";
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      photoId: 0,
      objectSelected: null,
      selected: 0,
      modals: {
        modalConfirmDelete: false,
      },
    };
  },
  computed: {
    images() {
      return this.$store.state.pending_images;
    },
    image() {
      return this.$store.state.image;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      const abc = window.localStorage.getItem("user");
      // console.log(abc);
      const appove = this.$store.state.approved_images;
      console.log(appove);
      return JSON.parse(abc);
    },
  },

  mounted() {
    this.$store.dispatch("getPendingImageByUser");
  },
  methods: {
    deletePhoto(objectSelected) {
      axios({
        method: "PUT",
        url:
          "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/DeletOrDisable/" +
          objectSelected.photoId,
      }).then((response) => {
        console.log("aaaa");
        console.log(response);
        if (response.status == 200) {
          this.$alert("Delete Sucessfully", "Success", "success").then(() =>
            console.log("Closed")
          );
          this.modals.modalEnable = false;
        } else {
          this.$alert(
            "Something went wrong, please try again",
            "Error",
            "error"
          ).then(() => console.log("Closed"));
          this.modals.modalEnable = false;
        }
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@300&family=Oxygen:wght@300&display=swap");

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
.button-remove {
  width: 56rem !important;
}
.gallery-panel img {
  width: 20vw;
  height: 10vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
.rejection {
  font-family: "Heebo", sans-serif;
}
.reason {
  font-family: "Oxygen", sans-serif;
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
  background-image: linear-gradient(
    to right,
    #f0ebbb,
    #eee599,
    #eddf76,
    #ecd84e,
    #ebd112
  );
  padding-left: 6px;
  border-radius: 10px;
}
strong {
  font-size: 15px;
  position: relative;
  top: 4px;
}
</style>
