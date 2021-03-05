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
      <!-- <div style="text-align: center">
        <div v-if="!paidFor">
          <h1>Buy this Lamp - ${{ product.price }} OBO</h1>

          <p>{{ product.description }}</p>

          <img
            width="250"
            src="https://images-na.ssl-images-amazon.com/images/I/61yZD4-mKjL._SX425_.jpg"
          />
        </div>

        <div v-if="paidFor">
          <h1>Noice, you bought a beautiful lamp!</h1>

          <img src="https://media.giphy.com/media/j5QcmXoFWl4Q0/giphy.gif" />
        </div>

        <div ref="paypal"></div>
      </div> -->
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
      <h1>Nice, your transaction success!</h1>

      <img src="https://media.giphy.com/media/j5QcmXoFWl4Q0/giphy.gif" />
    </div>
    <div
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
export default {
  computed: {
    cart() {
      console.log(this.checkLocal);
      console.log(this.$store.state);
      return this.$store.state.cart;
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

  data() {
    return {
      checkLocal: this.$store.state.cart,
    };
  },

  data: function () {
    return {
      total: [],
      loaded: false,
      paidFor: false,
      product: {
        price: 777.77,
        description: "leg lamp from that one movie",
        img: "./assets/lamp.jpg",
      },
      products: [],
      // purchase_units: []
    };
  },
  mounted: function () {
    this.getTotal();
    this.createListItems();
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYvSMAPfagJB-ffNa4cHkH_dk7zK8ojJu4G6UVhrhQqe2w3LaKqjzvKirbdm3cGguTH_pM6FQRx-_O76";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              // purchase_units: [
              //   {
              //     description: this.product.description,
              //     amount: {
              //       currency_code: "USD",
              //       value: this.product.price,
              //     },
              //   },
              // ],

              intent: "CAPTURE",
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
                  // items: this.products,
                  // items: [
                  //   {
                  //     name: "item1",
                  //     unit_amount: {
                  //       currency_code: "USD",
                  //       value: "0.01",
                  //     },
                  //     quantity: "1",
                  //   },
                  //   {
                  //     name: "item2",
                  //     unit_amount: {
                  //       currency_code: "USD",
                  //       value: "0.01",
                  //     },
                  //     quantity: "1",
                  //   },
                  // ],
                },
              ]
            });
          },
          onApprove: async (data, actions) => {
            console.log(purchase_units);
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            console.log(order);
            alert("Transaction success!");
          },
          onError: (err) => {
            console.log(err);
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
          name: item.image.photoName,
          unit_amount: {
            currency_code: "USD",
            value: item.image.price,
          },
          quantity: 1,
        });
      });
      console.log(this.products);
    },
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
</style>