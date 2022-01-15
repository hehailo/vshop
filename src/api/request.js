//对axios进行二次封装
import axios from "axios";

//request 就是 xios
const requests = axios.create({
  //配置对象
  baseURL: "/api", //基础路径
  // 请求超时时间
  timeout: "5000",
});

// 请求拦截器
requests.interceptors.request.use(
  () => {},
  () => {}
);

// 响应拦截器

//对外八路
export default axios;
