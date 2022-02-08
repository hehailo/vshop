//引入路由组件
import Home from "@/views/Home";
import Search from "@/views/Search";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Detail from "@/views/Detail";
import AddCartSuccess from "@/views/AddCartSuccess";
import ShopCart from "@/views/ShopCart";
import Trade from "@/views/Trade";
import Pay from "@/views/Pay";
import PaySuccess from "@/views/PaySuccess";
import Center from "@/views/Center";
// import MyOrder from '@/views/Center/MyOrder';
// import GroupOrder from '@/views/Center/GroupOrder';
// ;

//路由配置信息
export default [
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: {
      showfooter: true,
    },
  },
  {
    path: "/pay",
    component: Pay,
    meta: {
      showfooter: Pay,
    },
    props: ($route) => ({ orderId: $route.query.orderId }),
  },
  {
    path: "/trade",
    component: Trade,
    meta: {
      showfooter: true,
    },
  },
  {
    path: "/center",
    component: Center,
    meta: {
      showfooter: true,
    },
    children: [
      {
        path: "myorder",
        component: () => import("@/views/Center/MyOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/views/Center/GroupOrder"),
      },
      {
        path:'',
        redirect:'myorder'
      }
    ],
  },
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
  // 添加购物车成功
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: {
      showfooter: true,
    },
  },
  // 购物车
  {
    path: "/shopCart",
    name: "shopCart",
    component: ShopCart,
    meta: {
      showfooter: true,
    },
  },
];
