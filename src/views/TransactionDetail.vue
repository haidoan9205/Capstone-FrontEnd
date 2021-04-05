<template>
<div class="container table-responsive ">
    <table class="table table-hover table-sm mx-auto">
      <h2>Items in order
      </h2>
      <div class="itemCart" v-for="item in transactions.photo" :key="item.photoId">
        <tr >
          <td class="col-sm-3  gallery-panel">
            <img :src="item.wmlink" class="img-fluid" />
          </td>
          <td>
            <div class="detail">
              <tr>
                <td class="col1">
                  <strong class="description">Photo:</strong>
                </td>
                <td class="col2">
                  <p>{{ item.photoName }}</p>
                </td>
                <tr>
                <td class="col1"><strong class="rejection">Type:</strong></td>
                <td class="col2">
                  <p v-if="item.typeId == 1">Normal</p>
                  <p v-if="item.typeId == 2">Exclusive</p>
                </td>
              </tr>
              <tr>
                <td class="col1">
                  <strong class="rejection">Price:</strong>
                </td>
                <td class="col2">
                  <p>{{ item.price }} $</p>
                </td>
              </tr>
              
          
           
            </div>
            
          </td>
        </tr>
      </div>
      <div class="col-sm-4" style="float:right;"><strong style="font-size:20px">Amount:{{transactions.total}} $ </strong></div>
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
      return this.$store.state.transaction_detail;
    },
  },
  mounted() {
    this.$store.dispatch("getTransactionDetail", this.$route.params.transactionId);
    console.log(this.transactions)
  },
  methods:{
      frontEndDateFormat(date) {
        		return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY HH:mm');
        	},
      
  }
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300&family=Oxygen:wght@300&display=swap');
.description {
  font-family: 'Heebo', sans-serif;
}
.wrapper {
  margin: 0 auto;
  max-width: 800px;
  @media only screen and (max-width: 799px) {
    max-width: 100%;
    margin: 0 1.5rem;
  }
}
.image-card-grid {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
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
.gallery-panel img {
  width: 20vw;
  height: 10vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
.itemCart {
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: lightgray;
}

strong {
  font-size: 15px;
  position: relative;
  top: 4px;
}
.status {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  background-color: green;
  padding-left: 6px;
  width: 30%;
  border-radius: 10px;
}
</style>
