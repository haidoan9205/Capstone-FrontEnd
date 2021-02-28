<template>
  <div style="text-align: center;">
    <div v-if="!paidFor">
      <h1>Buy this Lamp - ${{ product.price }} OBO</h1>

      <p>{{ product.description }}</p>

      <img
        width="400"
        src="https://images-na.ssl-images-amazon.com/images/I/61yZD4-mKjL._SX425_.jpg"
      />
    </div>

    <div v-if="paidFor">
      <h1>Noice, you bought a beautiful lamp!</h1>

      <img src="https://media.giphy.com/media/j5QcmXoFWl4Q0/giphy.gif" />
    </div>

    <div ref="paypal"></div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: 777.77,
        description: "leg lamp from that one movie",
        img: "./assets/lamp.jpg",
      },
    };
  },
  mounted: function () {
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
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
</script>

<style>
</style>