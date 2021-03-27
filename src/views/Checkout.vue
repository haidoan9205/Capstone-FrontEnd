<template>
  <div class="row">
    <div
      class="col-md-7"
      v-if="!paidFor"
      style="
        border-radius: 15px;
        border: 2px solid rgba(0, 0, 0, 0.48);
        width: 60%;
        margin-top: 30px;
        margin-bottom: 30px;
        margin-left: 7%;
        margin-right: 40px;
        overflow: auto;
        padding-left: 40px;
      "
    >
      <h2 style="padding-left: 10px">Checkout List</h2>
      <table
        id="cart"
        class="table table-hover table-sm"
        v-if="checkLocal != 0"
      >
        <div>
          <tr v-for="item in cart" :key="item.image.photoId">
            <td class="gallery-panel">
              <img
                style="height: 180px; width: 250px"
                :src="item.image.wmlink"
                class="img-fluid"
              />
            </td>
            <td>
              <div class="detail">
                <tr>
                  <td class="col1"><p style="color: black">Photo:</p></td>
                  <td class="col2">
                    <p style="color: black">
                      {{ item.image.photoName }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="col1">
                    <p style="color: black">Lisence type:</p>
                  </td>
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
                  <td>
                    <h5>
                      <b>${{ item.image.price }}USD</b>
                    </h5>
                  </td>
                </tr>
              </div>
            </td>
          </tr>
        </div>
      </table>
    </div>
    <div
      v-if="paidFor"
      class="popup"
    >
      <h2 style="padding-top: 10%; padding-left: 10px">Thank you for your purchase!</h2>
      <div class="row" style="padding-top: 10px; padding-left: 28px">  
        <router-link to="/">
          <button class="btn btn-primary">Continute Shopping</button>
        </router-link>
      </div>
      <div class="row" style="padding-top: 10px; padding-left: 28px">
        <router-link to="/">
          <button class="btn btn-primary">View History</button>
        </router-link>
        </div>
    </div>
    <div
      v-if="!paidFor"
      class="col-md-3"
      style="
        border-radius: 15px;
        border: 2px solid rgba(0, 0, 0, 0.48);
        height: 600px;
        width: 25%;
        margin-top: 30px;
        margin-left: 1.5%;
        margin-bottom: 30px;
        margin-right: 5%;
      "
    >
      <div
        style="
          border-radius: 15px;
          border: 2px solid rgba(0, 0, 0, 0.25);
          height: 200px;
          margin: 15px;
        "
      >
        <h4 style="padding-top: 10px; padding-left: 25px">User</h4>
        <p style="padding-left: 25px">{{ user.fullName }}</p>
        <p style="padding-left: 25px">{{ user.email }}</p>
        <hr style="width: 80%" />
        <p style="padding-left: 140px">
          TOTAL: <span style="color: red">${{ total }}USD</span>
        </p>
      </div>
      <div
        style="height: 150px; width: 75%; margin-top: 25px; margin-left: 45px"
        ref="paypal"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    cart() {
      if (this.$store.state.cartFlag === true) {
        return this.$store.state.cart;
      } else {
        return this.$store.state.ucart;
      }
      
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },

  data: function () {
    return {
      total: [],
      loaded: false,
      paidFor: false,
      products: [],
      checkLocal: "",
      orderDetail: [],
      orderInfo: [],
      user: JSON.parse(localStorage.getItem("user"))
    };
  },
  mounted: function () {
    this.getTotal();
    this.createListItems();
    const script = document.createElement("script");
    this.checkLocal = this.$store.state.cart,
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYvSMAPfagJB-ffNa4cHkH_dk7zK8ojJu4G6UVhrhQqe2w3LaKqjzvKirbdm3cGguTH_pM6FQRx-_O76";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
    //console.log(this.$store.state.cart);
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: this.total,
                    breakdown: {
                      item_total: {
                        currency_code: "USD",
                        value: this.total,
                      },
                    },
                  },
                  items: this.products,
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
            this.orderInfo = order;
            this.onCheckOut();

            //console.log("VALUE");
            //console.log(order.create_time);
          },
          onError: (err) => {
            console.log("ERR: " + err);
            alert("Transaction error!");
          },
        })
        .render(this.$refs.paypal);
    },
    getTotal() {
      var price = 0;
      this.$store.state.cart.forEach((el) => {
        price += parseInt(el.image.price);
      });
      this.total = price;
      //console.log(this.total);
    },
    createListItems() {
      this.cart.forEach((item) => {
        this.products.push({
          name: item.image.photoId + "-" + item.image.photoName,
          unit_amount: {
            currency_code: "USD",
            value: item.image.price,
          },
          quantity: 1,
        });
        this.orderDetail.push(parseInt(item.image.photoId));
        //this.orderDetail.push({
        //  photoId: parseInt(item.image.photoId),
        //  price: parseFloat(item.image.price),
        //});
      });
    },
    onCheckOut() {
      const fd = new FormData();
      const orderDetails = Object.values(this.orderDetail);
      fd.append('userId', this.user.userId);
      fd.append('transactionId', this.orderInfo.id);
      fd.append('createTime', this.orderInfo.create_time);
      fd.append('amount', parseFloat(this.orderInfo.purchase_units[0].amount.value));
      fd.append('payerId', this.orderInfo.payer.payer_id);
      fd.append('payerPaypalEmail', this.orderInfo.payer.email_address);
      for (let i = 0; i < orderDetails.length; i++) {
        fd.append('ListPhotoId', orderDetails[i]);
      }
      
      axios({
                url: "https://imago.azurewebsites.net/api/Order",
                data: fd,
                method: "POST",
                headers: {'Content-Type': 'application/json'}
            })
            .then((respone) => {
            if (respone.status == 201) {
                alert("Transaction successfully");
                this.paidFor = true;
            } else {
                alert("Transaction error");
            }
            console.log(respone.status);
            })
            .catch((error) => {
            console.log(error);
            });
    },
    onCheckoutSaveToBC() {
      const fd = new FormData();
      const orderDetails = Object.values(this.orderDetail);
      fd.append('userId', this.user.userId);
      fd.append('transactionId', this.orderInfo.id);
      fd.append('createTime', this.orderInfo.create_time);
      fd.append('amount', parseFloat(this.orderInfo.purchase_units[0].amount.value));
      fd.append('name', this.user.fullName);
      fd.append('photoId', this.orderInfo.payer.email_address);
      fd.append('photoHash', this.$store.state.ucart);
      for (let i = 0; i < orderDetails.length; i++) {
        fd.append('ListPhotoId', orderDetails[i]);
      }
      
      axios({
                url: "http://localhost:3000/transactions",
                data: fd,
                method: "POST",
                headers: {'Content-Type': 'application/json'}
            })
            .then((respone) => {
            if (respone.status == 201) {
                alert("Transaction successfully");
                this.paidFor = true;
            } else {
                alert("Transaction error");
            }
            console.log(respone.status);
            })
            .catch((error) => {
            console.log(error);
            });
    }
  },
};
</script>

<style scoped>
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
table {
  margin-top: 20px;
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
.popup {
  margin: auto;
  width: 600px;
  height: 500px;
}
</style>