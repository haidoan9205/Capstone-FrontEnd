<template>
  <div class="container container-lg">
    <tabs fill class="flex-column flex-md-row">
      <card shadow>
        <tab-pane title="Transaction History">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Photo Name</th>
                <th>Type</th>
                <th>Amount</th>
                <!-- <th  width="15%">Transaction ID</th> -->
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in transactions"
                :key="transaction.photoId"
              >
                <td>{{ frontEndDateFormat(transaction.boughtTime) }}</td>
                <td>{{ transaction.photoName }}</td>
                <td>Normal</td>
                <td>${{ transaction.boughtPrice }}</td>
                <!-- <td>{{transaction.transactionId}}</td>  -->
                <td>
                  <base-button
                    outline
                    type="primary"
                    @click="download(transaction)"
                    >Download</base-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </tab-pane>

        <tab-pane title="Exclusive Transaction">
          <div class="row justify-content-center">
            <div class="row align-items-center">
              <div class="form-group">
                <div class="row align-items-center">
                  <label
                    class="control-label"
                    style="
                      padding-left: 2.5%;
                      font-size: 20px;
                      font-weight: bold;
                    "
                    >Proof ID:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="proofId"
                    placeholder="Input proofID to get receipt from the Blockchain..."
                    required
                    style="width: 500px; margin: auto; display: flex"
                  />
                  <button
                    class="btn btn-success"
                    style="margin: auto; display: flex"
                    type="submit"
                    @click="getProofConfimation(proofId)"
                  >
                    <span class="text-nowrap">Submit</span>
                  </button>
                </div>

                <div
                  class="flex-container"
                  style="
                    
                    margin-top: 18px;
                  "
                >
                  <div
                    style="width: 780px; height: 750px"
                    v-bind="proofResponse"
                  >
                    <p v-if="proofResponse == ''"></p>

                    <p
                      v-else
                      style="
                        padding-top: 5px;
                        padding-left: 10px;
                        font-size: 16px;
                        text-align: center;
                      "
                    >
                      <span>
                        <img
                          :src="photo.wmlink"
                          @click="openGallery(0)"
                          style="
                            height: 350px;
                            width: 400px;
                            cursor: pointer;
                            padding-top: 5px;
                          " />
                        <p style="padding: 3px">Click on image for full size</p>

                        <LightBox
                          ref="lightbox"
                          :showLightBox="false"
                          :showThumbs="false"
                          :media="[
                            {
                              thumb: photo.wmlink,
                              src: photo.wmlink,
                              srcset: photo.wmlink,
                            },
                          ]"
                        >
                          <inner-image-zoom
                            :src="photo.wmlink"
                            :zoomSrc="photo.wmlink"
                          /> </LightBox
                      ></span>

                      <span
                        >The transaction of this photo has been added to the
                        Blockchain at:<br />
                        <span style="color: #6a5acd">{{
                          new Date(proofResponse[0].submitted)
                        }}</span></span
                      >
                      <br /><br />
                      <span
                        >Hash:<br />
                        <span style="color: #6a5acd">{{
                          proofResponse[0].hash
                        }}</span></span
                      >
                      <br /><br />
                      <span
                        >Transaction ID:<br />
                        <span style="color: #6a5acd">{{
                          proofResponse[0].anchorData.txnId
                        }}</span></span
                      >
                      <br /><br />
                      <span
                        >Verify the Blockchain info at:<br />
                        <a
                          :href="`${proofResponse[0].anchorData.txnUri}`"
                          target="_blank"
                          style="color: #6a5acd"
                          >{{ proofResponse[0].anchorData.txnUri }}</a
                        ></span
                      >
                      <br /><br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tab-pane>
      </card>
    </tabs>
  </div>
</template>

<script>
import axios from "axios";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
import moment from "moment";
import LightBox from "vue-it-bigger";
import("vue-it-bigger/dist/vue-it-bigger.min.css");
export default {
  components: {
    Tabs,
    TabPane,
    LightBox,
  },
  data() {
    return {
      photoId: 0,
      proofId: [],
      proofResponse: "",
      history: [],
      fullHistory: [],
      photo: [],
      user: JSON.parse(localStorage.getItem("user")),
      version: "",
    };
  },
  computed: {
    transactions() {
      return this.$store.state.transactions;
    },
  },
  mounted() {
    this.$store.dispatch("getTransactions");
    // this.getExclusiveHistory();
  },
  methods: {
    download(transaction) {
      this.$store.dispatch("downloadImage", transaction.photoId);
    },

    openLink(link) {
      window.open(link, "_blank");
    },

    openGallery(index) {
      this.$refs.lightbox.showImage(index);
    },

    getProofConfimation(proofId) {
      this.getExclusiveHistory();
      axios
        .get("http://localhost:3000/transactions/getProof/" + proofId)
        .then((response) => {
          if (response.status == 200) {
            this.proofResponse = response.data;
            this.version = this.proofResponse[0].version;
            for (let index = 0; index < this.fullHistory.length; index++) {
              if (
                this.fullHistory[index].versions[0].minVersion == this.version
              ) {
                this.history = this.fullHistory[index];
                this.getPhotoDetails(this.history.versions[0].document.photoId);
              }
            }
          } else {
            alert("Network error, please try again!");
          }
        })
        .catch((error) => {
          alert("System error, please contact admin!");
          console.log(error);
        });
    },

    getExclusiveHistory() {
      axios
        .get(
          "http://localhost:3000/transactions/getDocumentHistory/" +
            this.user.userId
        )
        .then((response) => {
          if (response.status == 200) {
            this.fullHistory = response.data;
            // let length = this.fullHistory.length;
            // this.history = this.fullHistory[length - 1];
          } else {
            alert("Network error, please try again!");
          }
        })
        .catch((error) => {
          alert("System error, please contact admin!");
          console.log(error);
        });
    },

    getPhotoDetails(id) {
      axios
        .get("https://imago.azurewebsites.net/api/v1/Photo/" + id)
        .then((response) => {
          if (response.status == 200) {
            this.photo = response.data;
          }
        })
        .catch((error) => {
          // alert("System error, please contact admin!");
          console.log(error);
        });
    },

    frontEndDateFormat(date) {
      return moment(date, "YYYY-MM-DD HHmm").format("DD/MM/YYYY HH:mm");
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
@media (max-width: 970px) {
  .flex-container {
    flex-direction: column;
  }
}
.container {
  display: flex;
  flex-direction: column;
}
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 100%;
  min-width: 500px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
</style>
