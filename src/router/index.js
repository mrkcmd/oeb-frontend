import Vue from "vue";
import VueRouter from "vue-router";
import MyEbook from "../views/MyEbook.vue";
import Permission from "@/components/Permission.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Generate from "@/components/GenerateUrl.vue";
import Users from "@/components/Users.vue";
import UserEbook from "@/components/UserEbook.vue";
import store from "@/store/index";
import RegisterAdmin from "@/components/RegisterAdmin.vue";
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
  {
    path: "/my-ebook",
    name: "MyEbook",
    component: MyEbook,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user) {
        if (store.state.auth.user.roles.includes("ROLE_ADMIN")) {
          next("/users");
        } else {
          next();
        }
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/permission",
    name: "Permission",
    component: Permission,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user) {
        if (store.state.auth.user.roles.includes("ROLE_ADMIN")) {
          next();
        } else {
          next("/");
        }
      } else {
        next("/login");
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
      if (store.state.auth.user) {
        if (store.state.auth.user.roles.includes("ROLE_ADMIN")) {
          next();
        } else {
          next("/");
        }
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user) {
        if (store.state.auth.user.roles.includes("ROLE_ADMIN")) {
          next();
        } else {
          next("/");
        }
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/users/:id",
    name: "UserEbook",
    component: UserEbook,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user) {
        if (store.state.auth.user.roles.includes("ROLE_ADMIN")) {
          next();
        } else {
          next("/");
        }
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/registerAdmin",
    name: "registerAdmin",
    component: RegisterAdmin,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.user) {
        if (store.state.auth.user.roles.includes("ROLE_ADMIN")) {
          next();
        } else {
          next("/");
        }
      } else {
        next("/login");
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
