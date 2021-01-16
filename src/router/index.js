import Vue from "vue";
import VueRouter from "vue-router";
import MyEbook from "../views/MyEbook.vue";
import Permission from "@/components/Permission.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Generate from "@/components/GenerateUrl.vue";
import store from "@/store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  { path: "/my-ebook", name: "MyEbook", component: MyEbook },
  {
    path: "/permission",
    name: "Permission",
    component: Permission,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user.roles.includes("ROLE_ADMIN")) {
        next();
      } else {
        next("/");
      }
    }
  },
  {
    path: "/register/:token",
    name: "Register",
    component: Register
  },
  {
    path: "/generate",
    name: "Generate",
    component: Generate,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user.roles.includes("ROLE_ADMIN")) {
        next();
      } else {
        next("/");
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
