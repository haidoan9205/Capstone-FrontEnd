<template>
  <div class="row justify-content-center">
    <router-link class="mr-4 type" :to="{name: 'normal', force: true}">
      <h3>Non-Exclusive</h3>
    </router-link>

    <router-link class="type" to="/exclusive_images">
      <h3>Exclusive</h3>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.type {
  font-family: monospace;
  color: black;
  font-size: 28px;
  margin-top:10px
}
.type.active {
  box-shadow: 0px 1px 3px 0px #00000026;
}

.type:hover {
  background: lightgray;
}
</style>
