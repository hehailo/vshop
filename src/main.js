import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "./router";
//引入vuex
import store from "./store";

// 引入样式
//引入mockServe
import "@/mock/mockServe";
// swiper 样式引入
import "swiper/css/swiper.css";

//引入全局组件 三级联动
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import * as API from '@/api';
;

Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

// 引入插件
import { Button,Message, MessageBox,Rate,Popover} from "element-ui";
Vue.use(Button);
Vue.use(Rate);
Vue.use(Popover);
Vue.component(Message.name,Message);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.prototype.$API = API;

Vue.config.productionTip = false;
new Vue({
  router,
  store, //多了一个¥store
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
