import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import VueShowdown from "vue-showdown";
import VueUeditorWrap from "vue-ueditor-wrap";
import * as echarts from "echarts";
import request from "./network/request";
import clipboard from "clipboard";

let instance = request();
Vue.prototype.$http = window.axios;
Vue.prototype.$http = instance;
Vue.prototype.clipboard = clipboard;

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(VueUeditorWrap);
Vue.prototype.$echarts = echarts;

Vue.use(VueShowdown, {
  // 设置 showdown 默认 flavor
  flavor: "github",
  // 设置 showdown 默认 options （会覆盖上面 flavor 的 options）
  options: {
    emoji: false,
  },
});

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
