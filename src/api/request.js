//对axios进行二次封装
import store from "@/store";
import axios from "axios";
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css'
// 当前模块中引入store

//request 就是 xios
const requests = axios.create({
  //配置对象
  baseURL: "/api", //基础路径
  // 请求超时时间
  timeout: "5000",
});

// 请求拦截器
requests.interceptors.request.use(
  (config) => {
    nprogress.start();
    console.log('请求拦截',config.url);
    let uuid_token =store.state.shopcart.uuid_token
    if(uuid_token){
      config.headers.userTempId = uuid_token;
    }
    return config;
  },
  (error) => {
    return  Promise.reject(error);
  }
);

// 响应拦截器
requests.interceptors.response.use(
  (response) => {
    // response 包括响应头等hhtp请求的部分
    console.log('响应拦截',response.data);
    nprogress.done();
    return response.data;
  },
  (error) => {
    return  Promise.reject(error);
  }
);

//对外八路
export default requests;
