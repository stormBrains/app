import Vue from "vue";
import App from "./App.vue";
//引入暴露的router文件
import router from "./router/index";
//引入暴露的UI框架 Vant
import Vant from "vant";
import "vant/lib/index.css";
//引入暴露的vuex
import store from "./store/index.js";
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
