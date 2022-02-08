// 配置路由
import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./route";

//使用插件
Vue.use(VueRouter);

let origiPush = VueRouter.prototype.push;
let roriginReplace = VueRouter.prototype.replace;

//重写push和replace方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    origiPush.call(this, location, resolve, reject);
  } else {
    origiPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    roriginReplace.call(this, location, resolve, reject);
  } else {
    roriginReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由
let router = new VueRouter({
  mode: "history",
  routes,
  //
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// 全局路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 全局路由前置守卫
  console.log("全局路由前置守卫");
  console.log(to, from);
  //函数体
  let token = store.state.user.token;
  let name = store.state.user.name;
  if (token) {
    // 用户已经登陆
    if (to.path == "/login" || to.path == "/register") {
      next("/");
    } else {
      if (name) {
        next();
      } else {
        try {
          // 重新获取用户信息
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token失效 重新登陆
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    let toPath = to.path
    console.log("未登陆不准入页面");
    //未登陆不与准入页面
    // if (toPath.indexOf("center") != -1) {
    //   next("/login");
    // } else {
      next();
    // }
  }
});

export default router;
