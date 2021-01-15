import Vue from "vue";
import VueRouter from "vue-router";
import Ebook from "../views/Ebook.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Generate from "@/components/GenerateUrl.vue";
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
    component: Register
  },
  {
    path: "/generate",
    name: "Generate",
    component: Generate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
