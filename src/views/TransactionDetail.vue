<template>
<div class="container container-lg">
 <table class="styled-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Transaction ID</th>
        <th>Payer Paypal Email</th>
        <th>Amount</th>
        <!-- <th  width="15%">Transaction ID</th> -->
        <th></th>
      </tr>
    </thead>
    <tbody>
       <div>
          <tr v-for="item in transactions" :key="item.image.photoId">
            <td class="col-sm-3 gallery-panel">
              <img :src="item.image.wmlink" class="img-fluid" />
            </td>
            <td>
              <div class="detail">
                <tr>
                  <td class="col1"><p style="color: black">Photo:</p></td>
                  <td class="col2">
                    <p style="color: black">
                      {{ item.image.photoName }} |
                      <router-link
                        :to="{
                          name: 'photo',
                          params: { photoId: item.image.photoId },
                        }"
                      >
                        Detail
                      </router-link>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="col1"><p style="color: black">Lisence type:</p></td>
                  <td class="col2">
                    <p style="color: black" v-if="item.image.typeId === 1">
                      Casual
                    </p>
                    <p style="color: black" v-if="item.image.typeId === 2">
                      Exclusive
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="col1">
                    <p style="color: black">How can I use it?:</p>
                  </td>
                  <td class="col2">
                    <p style="color: black">
                      Available for all permitted uses under our
                      <a href="#">License Terms</a>
                    </p>
                  </td>
                </tr>
              </div>
            </td>
            <td>
              <h5>${{ item.image.price }} USD</h5>
            </td>
            <td>
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="removeItem(item.image)"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </td>
          </tr>
          <tfoot>
            <tr>
              <td colspan="2" class="d-none d-sm-table-cell"></td>
              <td class="px-0">
                  <button class="btn btn-success" @click="checkOut()">
                    <span class="text-nowrap"
                      >Checkout <i class="fa fa-angle-right d-inline"></i
                    ></span>
                  </button>
              </td>
            </tr>
          </tfoot>
        </div>
    </tbody>
  </table>
</div>
 
</template>

<script>
import axios from 'axios';
  import moment from 'moment'

export default {
  data() {
    return {
      photoId: 0,
      transactionId: '',
    };
  },
  computed: {
    transactions() {
      return this.$store.state.transaction_detail;
    },
  },
  mounted() {
    this.$store.dispatch("getTransactionDetail", this.transactionId);
  },
  methods:{
      frontEndDateFormat(date) {
        		return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY HH:mm');
        	},
      
  }
};
</script>

<style lang="scss" scoped>
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
