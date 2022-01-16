import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "./router";
//引入vuex
import store from './store';
//引入全局组件 三级联动
import TypeNav from '@/components/TypeNav';

Vue.config.productionTip = false;

Vue.component(TypeNav.name,TypeNav)

new Vue({
  router,
  store,//多了一个¥store
  render: (h) => h(App),
}).$mount("#app");
