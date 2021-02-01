<template>
 <div class="container table-responsive">
    <table id="cart" class="table table-hover table-sm" v-if="checkLocal != 0">
      <div>
        <tr v-for="item in cart" :key="item.image.photoId">
          <td data-th="Image">
            <div class="row">
              <td class="col-sm-3  gallery-panel">
                <img :src="item.image.link" class="img-fluid" />
              </td>
              <td>
                <h4 class="nomargin">{{ item.image.photoName }}</h4>
              </td>
            </div>
          </td>
          <td data-th="Price"><h4>${{ item.image.price }}</h4></td>
          <td class="actions" data-th="">
            <button class="btn btn-danger btn-sm" @click.prevent="removeItem(item.image)">
              <i class="fa fa-trash-o"></i>
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
      <router-link to="/"> <button type="primary">Come here to Shopping</button> </router-link>
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
      this.$store.dispatch('removeItem', image)
    }
  }
};
</script>
<style scoped>
.gallery-panel img {
    width: 100%;
    height: 10vw;
    object-fit: cover;
    border-radius: 0.75rem;
  }
</style>