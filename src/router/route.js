//引入路由组件
import Home from "@/views/Home";
import Search from "@/views/Search";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Detail from '@/views/Detail'

//路由配置信息
export default [
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
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: {
      showfooter: true,
    },
  },
];
