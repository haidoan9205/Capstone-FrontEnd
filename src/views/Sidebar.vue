<template>
  <div id="demo" :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]">
    <div class="demo">
      <router-view />
      <sidebar-menu
        
        :menu="menu"
        :collapsed="collapsed"
        :theme="white-theme"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick"
      />
      <div
        v-if="isOnMobile && !collapsed"
        class="sidebar-overlay"
        @click="collapsed = true"
      />
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";

const separator = {
  template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`,
};

export default {
  name: "Sidebar",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Privacy",
          hiddenOnCollapse: true,
        },
        {
          href: { path: "/profile" },
          title: "Profile",
          icon: "fa fa-user",
        },
        {
          href: "/boughtphoto",
          title: "Your Bought Photos",
          icon: "fa fa-cc-paypal",
        },
          {
          href: "/history",
          title: "Transactions",
          icon: "fa fa-cc-paypal",
        },
        {
          component: separator,
        },
        {
          header: true,
          title: "Photos",
          hiddenOnCollapse: true,
        },
        {
          title: "Your Photo",
          icon: "fa fa-list-ul",
          child: [
            {
              href: { path: "/uploaded/:userId" },
              title: "Approved",
              icon: "fa fa-file-alt",
            },
            {
              href: { path: "/denied/:userId" },
              title: "Denied",
              icon: "fa fa-file-alt",
            },
            {
              href: "/pending/:userId",
              title: "Pending",
              icon: "fa fa-file-alt",
            },
          ],
        },
        {
          href: { path: "/upload" },
          title: "Upload",
          icon: "fa fa-upload",
        },
      
      ],
      collapsed: false,
      themes: [
        {
          name: "Default theme",
          input: "",
        },
        {
          name: "White theme",
          input: "white-theme",
        },
      ],
      selectedTheme: "white-theme",
      isOnMobile: false,
    };
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  computed: {
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
  methods: {
    onToggleCollapse(collapsed) {
      console.log(collapsed);
      this.collapsed = collapsed;
    },
    onItemClick(event, item, node) {
      console.log("onItemClick");
    },
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true;
        this.collapsed = true;
      } else {
        this.isOnMobile = false;
        this.collapsed = false;
      }
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600");

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}

#demo {
  padding-left: 350px;
  transition: 0.3s ease;
}
#demo.collapsed {
  padding-left: 50px;
}
#demo.onmobile {
  padding-left: 50px;
}

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}

.demo {
  padding: 50px;
}

.container {
  max-width: 900px;
}

pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
</style>
