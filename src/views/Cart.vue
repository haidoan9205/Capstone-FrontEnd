<template>
 <div class="container table-responsive">
    <h2>Shopping Cart</h2>
    <table id="cart" class="table table-hover table-sm" v-if="checkLocal != 0">
      <div>
        <tr v-for="item in cart" :key="item.image.photoId">
          <td class="col-sm-3  gallery-panel">
            <img :src="item.image.wmlink" class="img-fluid" />
          </td>
          <td>
            <div class="detail">
              <tr>
                <td class="col1"><p style="color:black;">Photo:</p></td>
                <td class="col2">
                  <p style="color:black;">{{ item.image.photoName }} |
                    <router-link :to="{ name: 'photo', params: { photoId: item.image.photoId } }">
                      Detail
                    </router-link>
                  </p>
                </td>
              </tr>
              <tr>
                <td class="col1"><p style="color:black;">Lisence type:</p></td>
                <td class="col2">
                  <p style="color:black;" v-if="item.image.typeId === 1">Cassual</p>
                  <p style="color:black;" v-if="item.image.typeId === 2">Monopoly</p>
                </td>
              </tr>
              <tr>
                <td class="col1"><p style="color:black;">How can I use it?:</p></td>
                <td class="col2">
                  <p style="color:black;">Available for all permitted uses under our <a href="#">License Terms</a></p>
                </td>
              </tr>
            </div>
          </td>
          <td><h5>${{ item.image.price }}USD</h5></td>
          <td>
            <button type="button" class="close" aria-label="Close" @click="removeItem(item.image)">
              <span aria-hidden="true">&times;</span>
            </button>
          </td>
        </tr>
        <tfoot>
          <tr>
            <td colspan="2" class="d-none d-sm-table-cell"></td>
            <td class="px-0">
              <button class="btn btn-success">
                <span class="text-nowrap"
                  >Checkout <i class="fa fa-angle-right d-inline"></i
                ></span>
              </button>
            </td>
          </tr>
        </tfoot>
      </div>
    </table>
    <div v-else>
      <p>There is nothing to show</p>
      <router-link to="/"> <button class="btn btn-primary">Come here to Shopping</button> </router-link>
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
  },

  data() {
    return {
      checkLocal: this.$store.state.cart,
    };
  },
  methods:{
    removeItem(image){
      this.$store.dispatch('removeItem', { image })
    }
  }
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
  margin-top: 5%
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
</style>