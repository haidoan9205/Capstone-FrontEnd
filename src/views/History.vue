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
      <tr v-for="transaction in transactions" :key="transaction.transactionId">
        <td>{{ frontEndDateFormat(transaction.createTime) }}</td>
       <router-link
            :to="{ name: 'transactionDetail', params: { transactionId: transaction.transactionId } }"
          >
        <td>{{ transaction.transactionId }}</td>
        </router-link>
        <td>
          {{ transaction.payerPaypalEmail }}
        </td>
        <td>${{ transaction.amount }}</td>
        <!-- <td>{{transaction.transactionId}}</td>  -->
    
      </tr>
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
      
    };
  },
  computed: {
    transactions() {
      return this.$store.state.history;
    },
  },
  mounted() {
    this.$store.dispatch("getHistory");
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
