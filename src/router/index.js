// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";

let origiPush = VueRouter.prototype.push;
let roriginReplace = VueRouter.prototype.replace;

//重写push和replace方法
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    origiPush.call(this,location,resolve,reject)
  }else{
    origiPush.call(this,location,()=>{},()=>{})
  }
}

VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    roriginReplace.call(this,location,resolve,reject)
  }else{
    roriginReplace.call(this,location,()=>{},()=>{})
  }
}

//配置路由
export default new VueRouter({
  //配置路由
  routes: [
    {
      path: "/home",
      component: Home,
      meta: {
        showfooter: true,
      },
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: Search,
      //只能处理params参数
      //  1.布尔值
      //   props:true,
      // 2 对象写法
      // props: {
      //   a: "1",
      //   b: "3",
      // },
      meta: {
        showfooter: true,
      },
      // 3 函数写法
      props: ($route) => {
        return {
          keyword: $route.params.keyword,
        };
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        showfooter: false,
      },
    },
    {
      path: "/login",
      component: Login,
      meta: {
        showfooter: false,
      },
    },
    {
      path: "/",
      component: Home,
      meta: {
        showfooter: true,
      },
    },
  ],
});
