import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/login",
  },
  {
    name: "userindex",
    path: "/userindex",
    component: () => import("../pages/Userindex/userindex.vue"),
    children: [
      {
        name: "write",
        path: "/write",
        component: () => import("../pages/write/write.vue"),
      },
      {
        name: "files",
        path: "/files",
        component: () => import("../pages/files/files.vue"),
      },
      {
        name: "noteManager",
        path: "/noteManager",
        component: () => import("../pages/noteManager/noteManager.vue"),
      },
      {
        name: "depandenceGraph",
        path: "/depandenceGraph",
        component: () => import("../pages/depandenceGraph/depandenceGraph.vue"),
      },
    ],
  },
  {
    name: "adminindex",
    path: "/adminindex",
    component: () => import("../pages/adminindex/adminindex.vue"),
    children: [
      {
        name: "usercontroller",
        path: "/usercontroller",
        component: () => import("../pages/UserController/usercontroller.vue"),
      },
      {
        name: "dataAnalyse",
        path: "/dataAnalyse",
        component: () => import("../pages/dataAnalyse/dataAnalyse.vue"),
      },
      {
        name: "actionData",
        path: "/actionData",
        component: () => import("../pages/actionData/actionData.vue"),
      },
    ],
  },
  {
    name: "/login",
    path: "/login",
    component: () => import("../pages/login/login.vue"),
  },
  {
    name: "/aliRegister",
    path: "/aliRegister",
    component: () => import("../pages/aliRegister/aliRegister.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
