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
                <td>{{ transaction.insDateTime }}</td>
                <td>{{ transaction.photoName }}</td>
                <td>{{ transaction.typeId }}</td>
                <td>${{ transaction.price }}</td>
                <!-- <td>{{transaction.transactionId}}</td>  -->
                <td>
                  <button @click="download(transaction)">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </tab-pane>

        <tab-pane title="Exclusive Transaction">
          <div class="row justify-content-center">
            <div class="row align-items-center">
              <div class="form-group">
                <label class="control-label">Proof ID:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="proofId"
                  required
                />
                <div class="flex-container">
                  <div
                    disabled="true"
                    style="
                      width: 380px;
                      height: 400px;
                      border-style: solid;
                      border-width: thin;
                      border-radius: 15px 0px 0px 15px;
                    "
                    resize="none"
                    v-bind="proofResponse"
                  >
                    <p v-if="proofResponse == ''"></p>

                    <p
                      v-else
                      style="
                        padding-top: 5px;
                        padding-left: 10px;
                        font-size: 16px;
                      "
                    >
                      <span style="color: #6a5acd">Proof: </span>
                      {{ proofResponse[0].proofId }}<br />
                      <span style="color: #6a5acd">Submitted Date: </span>
                      {{ new Date(proofResponse[0].submitted) }} <br />
                      <span style="color: #6a5acd"> Submitted Version: </span>
                      {{ proofResponse[0].version }}<br />
                      <span style="color: #6a5acd">Status: </span>
                      {{ proofResponse[0].status }}
                    </p>
                  </div>

                  <div
                    disabled="true"
                    style="
                      width: 500px;
                      height: 400px;
                      border-style: solid;
                      border-width: thin;
                      border-radius: 0px 15px 15px 0px;
                    "
                    resize="none"
                    v-bind="history"
                  >
                    <!-- <p v-if="history[item].versions[0].minVersion == version">{{ history[item].version[0].minVersion }}</p>
                    <p v-else>{{ history[0].versions[0] }}</p> -->
                    <!-- {{ history.versions[0] }} -->

                    <p
                      style="
                        padding-top: 5px;
                        padding-left: 10px;
                        font-size: 16px;
                      "
                    >
                      <span style="color: #6a5acd">Current Version: </span>
                      {{ history.versions[0].minVersion }}<br />
                      <span style="color: #6a5acd">Transaction Date: </span>
                      {{ new Date(history.versions[0].started) }} <br />
                      <span style="color: #6a5acd">Status: </span>
                      {{ history.versions[0].status }} <br />
                      <span style="color: #6a5acd">Details: </span> <br />
                      Transaction ID:
                      {{ history.versions[0].document.transactionId }} <br />
                      User ID: {{ history.versions[0].document.userId }} <br />
                      Name: {{ history.versions[0].document.name }} <br />
                      Photo ID: {{ history.versions[0].document.photoId }}
                      <br />
                      Amount: {{ history.versions[0].document.amount }} <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            class="btn btn-success"
            style="margin: auto; display: flex"
            type="submit"
            @click="getProofConfimation(proofId)"
          >
            <span class="text-nowrap">Submit</span>
          </button>
        </tab-pane>
      </card>
    </tabs>
  </div>
</template>

<script>
import axios from "axios";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
export default {
  components: {
    Tabs,
    TabPane,
  },
  data() {
    return {
      photoId: 0,
      proofId: [],
      proofResponse: "",
      history: [],
      fullHistory: [],
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
    this.getExclusiveHistory();
  },
  methods: {
    download(transaction) {
      this.$store.dispatch("downloadImage", transaction.photoId);
    },

    getProofConfimation(proofId) {
      axios
        .get("http://localhost:3000/transactions/getProof/" + proofId)
        .then((response) => {
          if (response.status == 200) {
            this.proofResponse = response.data;
            this.version = this.proofResponse[0].version;
            for (let index = 0; index < this.fullHistory.length; index++) {
              if (this.fullHistory[index].versions[0].minVersion == this.version) {
                this.history = this.fullHistory[index];
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
            this.user.fullName
        )
        .then((response) => {
          if (response.status == 200) {
            this.fullHistory = response.data;
            let length = this.fullHistory.length;
            this.history = this.fullHistory[length - 1];
          } else {
            alert("Network error, please try again!");
          }
        })
        .catch((error) => {
          alert("System error, please contact admin!");
          console.log(error);
        });
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
