import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "./router";
//引入全局组件 三级联动
import TypeNav from '@/pages/Home/TypeNav';

Vue.config.productionTip = false;

Vue.component(TypeNav.name,TypeNav)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
