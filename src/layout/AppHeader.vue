<template>
  <section class="">
    <base-nav
      v-for="menu in menus"
      :key="menu.type"
      :type="menu.type"
      effect="dark"
      expand
      title="Imago"
      :content-id="`navbar-${menu.type}`"
    >
      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <router-link :to="{ name: 'landing'}">
            <img src="img/brand/logo.png" />
          </router-link>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu" :target="`navbar-${menu.type}`">
          </close-button>
        </div>
      </div>
      <component :is="menu.menuComponent"></component>
    </base-nav>
  </section>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import CloseButton from "@/components/CloseButton";

import HomepageMenu from "../views/components/Navigation/HomepageMenu";

export default {
  components: {
    BaseNav,
    HomepageMenu,
    CloseButton,
  },
  data() {
    return {
      menus: [{ type: "default", menuComponent: HomepageMenu }],
    };
  },
};
</script>
<style>
</style>
