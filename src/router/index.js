import Vue from "vue";
import VueRouter from "vue-router";
import Goods from "../pages/index/Goods";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "goods",
    component: Goods,
  },
  {
    path: "/merchant",
    name: "merchant",

    component: () => import("../pages/index/Merchant"),
  },
  {
    path: "/evaluate",
    name: "evaluate",
    component: () => import("../pages/index/Evaluate"),
  },

  {
    path: "/Goodsimg",
    name: "Goodsimg",
    component: () => import("../pages/index/Goodsimg"),
  },
  {
    path: "/Go",
    name: "Good",
    component: () => import("../pages/Go"),
  },
];

const router = new VueRouter({
  //mode: 'history'--记录用户跳转记录
  //如果不写mode: 'history'，默认hash
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
