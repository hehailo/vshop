// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from './route'

//使用插件
Vue.use(VueRouter);

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

VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    roriginReplace.call(this,location,resolve,reject)
  }else{
    roriginReplace.call(this,location,()=>{},()=>{})
  }
}

//配置路由
export default new VueRouter({
  mode: 'history',
  routes,
  // 
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
