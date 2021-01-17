<template>
    <div class="container container-lg">
        <div class="row mt-4" >
          <div class="col-md-4 mb-5 mb-md-0" v-for='data in datas' :key="data.id">
            <div class="card card-lift--hover shadow border-0">
              <img v-lazy='data.link' class="card-img" />
            </div>
          </div>
          <!-- <div class="col-md-4 mb-5 mb-md-0">
            <div class="card card-lift--hover shadow border-0">
              <img v-lazy='data.link' class="card-img" />
            </div>
          </div>
          <div class="col-md-4 mb-5 mb-md-0">
            <div class="card card-lift--hover shadow border-0">
              <img v-lazy='data.link' class="card-img" />
            </div> -->
          </div>
        </div>
    <!-- </div> -->
</template>

<script>
// import {Stack, StackItem} from 'vue-stack-grid';

export default {
    data(){
        return{
            title:"Get All Photos",
            datas:[]
        }
    },
    created:function(){
        this.photo_list();
      },
      methods:{
          photo_list(){
           this.axios.get('https://capstonerestapi.azurewebsites.net/api/v1/Photo').then((response)=>{
             this.datas=response.data;
            });
          }
      }

}
</script>

<style scoped>
  .card-img{
    max-width: 100%;
    height: auto;
  }
</style>