<template>
  <div>
    <unauthorized v-if="!isLoggedIn"></unauthorized>
    <div class="row justify-content-center" style="background-color: #FFFAFA" v-if="isLoggedIn">
      <div class="flex-container">
        <div
          v-if="!paidFor"
          style="
        border-radius: 15px;
        border: 0px solid rgba(0, 0, 0, 0.48);
        width: 870px;
        margin-top: 30px;
        margin-bottom: 30px;
        margin-left: 7%;
        margin-right: 15px;
        overflow: auto;
        background-color:#F2F2F2
      "
        >
          <h2 style="padding-left: 35px">Checkout List</h2>
          <hr style="width: 90%" />
          <table
            id="cart"
            class="table table-hover table-sm"
            v-if="checkLocal != 0"
          >
            <div class="itemList">
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
                          <b>${{ item.image.price }} USD</b>
                        </h5>
                      </td>
                    </tr>
                  </div>
                </td>
              </tr>
            </div>
          </table>
        </div>
        <div v-if="paidFor" class="popup">
          <h2 style="padding-top: 10%; padding-left: 10px">
            Thank you for your purchase!
          </h2>
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
          class="column"
          style="
        border-radius: 15px;
        border: 0px solid rgba(0, 0, 0, 0.48);
        height: 600px;
        width: 400px;
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
          background-color: #FFFAF0
        "
          >
            <h4 style="padding-top: 10px; padding-left: 25px">Customer</h4>
            <p style="padding-left: 25px">Name: {{ user.fullName }}</p>
            <p style="padding-left: 25px">Email: {{ user.email }}</p>
            <hr style="width: 80%" />
            <p style="padding-left:180px; margin-top:-30px">
              TOTAL: <br />
              <span style="color: red; font-weight:bold">${{ total }} USD</span>
            </p>
          </div>
          <div
            style="height: 150px; width: 75%; margin-top: 25px; margin-left: 45px"
            ref="paypal"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Unauthorized from "./Unauthorized.vue";


export default {
  components: { Unauthorized },
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
    },
  },

  data: function() {
    return {
      total: [],
      loaded: false,
      paidFor: false,
      products: [],
      checkLocal: "",
      orderDetail: [],
      orderInfo: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  mounted: function() {
    this.getTotal();
    this.createListItems();
    const script = document.createElement("script");
    if (this.$store.state.cartFlag === true) {
      this.checkLocal = this.$store.state.cart;
    } else {
      this.checkLocal = this.$store.state.ucart;
    }
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYvSMAPfagJB-ffNa4cHkH_dk7zK8ojJu4G6UVhrhQqe2w3LaKqjzvKirbdm3cGguTH_pM6FQRx-_O76";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
    //console.log(this.$store.state.ucart);
  },
  methods: {
    setLoaded: function() {
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
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
            this.orderInfo = order;
            if (this.$store.state.cartFlag === true) {
              this.onCheckOut();
            } else {
              this.onCheckoutSaveToBC();
            }

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
      if (this.$store.state.cartFlag === true) {
        this.$store.state.cart.forEach((el) => {
          price += parseInt(el.image.price);
        });
      } else {
        this.$store.state.ucart.forEach((el) => {
          price += parseInt(el.image.price);
        });
      }

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
      fd.append("userId", this.user.userId);
      fd.append("transactionId", this.orderInfo.id);
      fd.append("createTime", this.orderInfo.create_time);
      fd.append(
        "amount",
        parseFloat(this.orderInfo.purchase_units[0].amount.value)
      );
      fd.append("payerId", this.orderInfo.payer.payer_id);
      fd.append("payerPaypalEmail", this.orderInfo.payer.email_address);
      for (let i = 0; i < orderDetails.length; i++) {
        fd.append("ListPhotoId", orderDetails[i]);
      }

      axios({
        url: "https://imago.azurewebsites.net/api/Order",
        data: fd,
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((respone) => {
          if (respone.status == 201) {
            this.$alert("Transaction complete", "Success", "success").then(() =>
              console.log("Closed")
            );

            this.paidFor = true;
            window.localStorage.removeItem("cart");
            this.$store.state.cart = [];
          } else {
            this.$toasts.push({
              type: "error",
              message: "Error",
            });
          }
        })
        .catch((error) => {
          this.$toasts.push({
            type: "error",
            message: error,
          });
        });
    },
    onCheckoutSaveToBC() {
      axios({
        url: "http://localhost:3000/transactions",
        data: {
          transactionId: this.orderInfo.id,
          prevOwner: this.$store.state.ucart[0].image.userId,
          userId: this.user.userId,
          photoId: this.$store.state.ucart[0].image.photoId,
          photoHash: this.$store.state.ucart[0].image.hash,
          amount: parseFloat(this.orderInfo.purchase_units[0].amount.value),
          transactionCreationTime: this.orderInfo.create_time,
        },
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((respone) => {
          if (respone.status == 200) {
            const fd = new FormData();
            const orderDetails = Object.values(this.orderDetail);
            fd.append("userId", this.user.userId);
            fd.append("transactionId", this.orderInfo.id);
            fd.append("proofId", respone.data);
            fd.append("createTime", this.orderInfo.create_time);
            fd.append(
              "amount",
              parseFloat(this.orderInfo.purchase_units[0].amount.value)
            );
            fd.append("payerId", this.orderInfo.payer.payer_id);
            fd.append("payerPaypalEmail", this.orderInfo.payer.email_address);
            for (let i = 0; i < orderDetails.length; i++) {
              fd.append("ListPhotoId", orderDetails[i]);
            }
            axios({
              url: "https://imago.azurewebsites.net/api/Order",
              data: fd,
              method: "POST",
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => {
                if (res.status == 201) {
                  this.$toasts.push({
                    type: "success",
                    message: "Transaction successfully",
                  });
                  this.paidFor = true;
                } else {
                  this.$toasts.push({
                    type: "error",
                    message: "Transaction error",
                  });
                }
              })
              .catch((error) => {
                this.$toasts.push({
                  type: "error",
                  message: error,
                });
              });
          } else {
            this.$toasts.push({
              type: "error",
              message: "Transaction error",
            });
          }
        })
        .catch((error) => {
          this.$toasts.push({
            type: "error",
            message: error,
          });
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
.itemList {
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
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
