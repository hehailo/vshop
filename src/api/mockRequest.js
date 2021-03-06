//对axios进行二次封装
import axios from "axios";
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";

//request 就是 xios
const requests = axios.create({
  //配置对象
  baseURL: "/mock", //基础路径
  // 请求超时时间
  timeout: "5000",
});

// 请求拦截器
requests.interceptors.request.use(
  (config) => {
    nprogress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
requests.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//对外八路
export default requests;
