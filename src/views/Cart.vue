<template>
  <div class="content">
    <div
      class="container table-responsive"
      v-if="!flag"
      style="background-color:#F2F2F2;padding:0;"
    >
      <div id="outer">
        <div class="inner">
          <button
            class="block"
            v-bind:class="{tabSelected: flag === true}"
            v-on:click="flag = true"
          >
            Non-Exclusive
          </button>
        </div>
        <div class="inner">
          <button
            class="block"
            v-bind:class="{tabSelected: flag === false}"
            v-on:click="flag = false"
          >
            Exclusive
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <h2>Shopping Cart</h2>
      </div>
      <table
        id="ucart"
        class="table table-hover table-sm"
        v-if="checkLocal2 != 0"
      >
        <div class="itemCart" v-for="item in ucart" :key="item.image.photoId">
          <tr>
            <td class="col-sm-3 gallery-panel">
              <img :src="item.image.wmlink" class="img-fluid" />
            </td>
            <td>
              <div class="detail">
                <tr>
                  <td class="col1">
                    <strong style="color: black">Photo:</strong>
                  </td>
                  <td class="col2">
                    <strong style="color: black">
                      {{ item.image.photoName }} |
                      <router-link
                        :to="{
                          name: 'photo',
                          params: {photoId: item.image.photoId},
                        }"
                      >
                        Detail
                      </router-link>
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td class="col1">
                    <strong style="color: black">Lisence type:</strong>
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
                  <td class="col1">
                    <strong style="color: black">How can I use it?:</strong>
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
              <h4>${{ item.image.price }} USD</h4>
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
        <p style="margin-bottom:2rem">
          Put your favourite to the basket first!
        </p>
        <router-link to="/">
          <button class="btn btn-primary">Go Shopping</button>
        </router-link>
      </div>
    </div>
    <div
      class="container table-responsive"
      v-if="flag"
      style="background-color:#F2F2F2;padding:0;"
    >
      <div id="outer">
        <div class="inner">
          <button
            class="block"
            v-bind:class="{tabSelected: flag === true}"
            v-on:click="flag = true"
          >
            Non-Exclusive
          </button>
        </div>
        <div class="inner">
          <button
            class="block"
            v-bind:class="{tabSelected: flag === false}"
            v-on:click="flag = false"
          >
            Exclusive
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <h2>Shopping Cart</h2>
      </div>
      <table
        id="cart"
        class="table table-hover table-sm"
        v-if="checkLocal != 0"
      >
        <div class="itemCart" v-for="item in cart" :key="item.image.photoId">
          <tr>
            <td class="col-sm-3 gallery-panel">
              <img :src="item.image.wmlink" class="img-fluid" />
            </td>
            <td>
              <div class="detail">
                <tr>
                  <td class="col1">
                    <strong style="color: black">Photo:</strong>
                  </td>
                  <td class="col2">
                    <strong style="color: black">
                      {{ item.image.photoName }} |
                      <router-link
                        :to="{
                          name: 'photo',
                          params: {photoId: item.image.photoId},
                        }"
                      >
                        Detail
                      </router-link>
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td class="col1">
                    <strong style="color: black">Lisence type:</strong>
                  </td>
                  <td class="col2">
                    <p style="color: black" v-if="item.image.typeId === 1">
                      Non-Exclusive
                    </p>
                    <p style="color: black" v-if="item.image.typeId === 2">
                      Exclusive
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="col1">
                    <strong style="color: black">How can I use it?:</strong>
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
              <h4>${{ item.image.price }} USD</h4>
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
                
                
              </td>
            </tr>
          </tfoot>
        </div>
        <button class="btn btn-success" @click="checkOut()" style="float:right">
                  <span class="text-nowrap"
                    >Checkout <i class="fa fa-angle-right d-inline"></i
                  ></span>
                </button>
      </table>
      
      <div class="nothing" v-else>
        <p style="margin-bottom:2rem">
          Put your favourite to the basket first!
        </p>
        <router-link to="/">
          <button class="btn btn-primary">Go Shopping</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
     isLoggedIn() {
      return this.$store.getters.isLoggedIn;
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
      this.$router.push('/checkout');
    },
    removeItem(image) {
      if (confirm('Are you sure to remove this item ?')) {
        this.$store.state.cartFlag = this.flag;
        this.$store.dispatch('removeItem', {image});
        axios.put('https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/ChangeIsBought/' +
          image.photoId).then((response) => {
              console.log(response.status);
              console.log(response.data);
          })
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
  width: unset;
  margin: 1rem;
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
.container {
  border: 1px solid;
  border-radius: 12px;
  margin-bottom: 2px;
}
#outer {
  width: 100%;
  text-align: center;
}
.inner {
  width: 50%;
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
  background-color: #5e72fe;
  color: white;
  font: bold;
}
.button:active {
  border: 2px solid black;
}
.nothing {
  margin: 2rem;
}
.content {
  margin-top: 2%;
  margin-bottom: 2%;
}
.tabSelected {
  background-color: #5e72e4;
  color: white;
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
</style>
