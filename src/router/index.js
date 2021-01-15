import Vue from "vue";
import VueRouter from "vue-router";
import Ebook from "../views/Ebook.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Generate from "@/components/GenerateUrl.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Ebook",
    component: Ebook
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register/:token",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("login");
      }
    }
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
    },
    beforeRouteLeave(to, from, next) {
      const answer = window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
      if (answer) {
        next();
      } else {
        next(false);
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
