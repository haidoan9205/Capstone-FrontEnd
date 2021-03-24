<template>
  <div class="content">
    <div class="container table-responsive" v-if="!flag" style="background-color:#F2F2F2">
    
    <div id="outer">
      <div class="inner"><button class="block" v-on:click="flag = true" >Normal</button></div>
      <div class="inner"><button class="block" v-on:click="flag = false">Exclusive</button></div>
    </div>
      <h2>Shopping Cart</h2>
      <table id="ucart" class="table table-hover table-sm" v-if="checkLocal2 != 0">
        <div>
          <tr v-for="item in ucart" :key="item.image.photoId">
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
      </table>
      <div class="nothing" v-else>
        <p>There is nothing to show</p>
        <router-link to="/">
          <button class="btn btn-primary">Come here to Shopping</button>
        </router-link>
      </div>
    </div>
    <div class="container table-responsive" v-if="flag" style="background-color:#F2F2F2">
    
    <div id="outer">
      <div class="inner"><button class="block" v-on:click="flag = true" >Normal</button></div>
      <div class="inner"><button class="block" v-on:click="flag = false">Exclusive</button></div>
    </div>
      <h2>Shopping Cart</h2>
      <table id="cart" class="table table-hover table-sm" v-if="checkLocal != 0">
        <div>
          <tr v-for="item in cart" :key="item.image.photoId">
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
      </table>
      <div class="nothing" v-else>
        <p>There is nothing to show</p>
        <router-link to="/">
          <button class="btn btn-primary">Come here to Shopping</button>
        </router-link>
      </div>
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
    ucart() {
      return this.$store.state.ucart;
    },
  },

  data() {
    return {
      checkLocal: this.$store.state.cart,
      checkLocal2: this.$store.state.ucart,
      flag: true,
    };
  },
  methods: {
    checkOut() {
      this.$store.state.cartFlag = this.flag;
      console.log(this.$store.state.cartFlag);
      this.$router.push("/checkout");
    },
    removeItem(image) {
      if (confirm("Are you sure to remove this item ?")) {
        this.$store.dispatch("removeItem", { image });
      } else {
        return;
      }
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
  margin-top: 5%;
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
.container{
  border: 1px solid;
  border-radius: 12px;
  margin-bottom: 2px;
}
#outer
{
    width:100%;
    text-align: center;
}
.inner
{
    width:50%;
    display: inline-block;
}
.block {
  display: block;
  width: 100%;
  border: none;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}
.block:hover {
  background-color: #ddd;
  color: black;
}
.button:active {
  border: 2px solid black;
}
.nothing {
  margin-bottom: 5%;
}
.content{
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>