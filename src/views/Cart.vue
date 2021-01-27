<template>
  <div class="container table-responsive">
    <table id="cart" class="table table-hover table-sm">
      <thead>
        <tr>
          <th style="width:50%">Image</th>
          <th style="width:40%">Price</th>
          <th style="width:10%"></th>
        </tr>
      </thead>
      <div v-if="checkLocal != null">
        <tr v-for="item in cart" :key="item.image.photoId">
          <td>
            <div class="row">
              <div class="col-sm-2 d-none d-sm-block">
                <img :src="item.image.link" class="img-fluid" />
              </div>
              <div class="col-sm-10">
                <h4 class="nomargin">{{ item.image.photoName }}</h4>
              </div>
            </div>
          </td>
          <td data-th="Price">{{ item.image.price }}</td>
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
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      console.log("con cac");
      console.log(this.$store.state);
      return this.$store.state.cart;
    },
  },

  data() {
    return {
      checkLocal: window.localStorage.getItem("cart"),
    };
  },
  methods:{
    removeItem(image){
      this.$store.dispatch('removeItem', image)
    }
  }
};
</script>
