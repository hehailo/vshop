//进行api接口统一管理

import requests from "./request";
import mockRequests from "./mockRequest";

//三级联动目录接口
export const reqCategoryList = () => {
  return requests.get("/product/getBaseCategoryList");
};

//搜索结果
//需要带参数 post请求
//接口要求：params 至少时一个空对象
export const reqSeachlist = (params) => {
  console.log("请求", params);
  return requests.post("/list", params);
};

// 产品详情
export const reqProdDetail = (skuid) => {
  return requests.get("/item/" + skuid);
};

// 加入购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  // /api/cart/addToCart/{ skuId }/{ skuNum }
  return requests.post("/cart/addToCart/" + skuId + "/" + skuNum);
};

// 获取购物车列表
export const reqCartList = () => {
  //函数体
  return requests.get("/cart/cartList");
  // return mockRequests.get("/cart/cartlist")
};

//首页轮播图
export const reqBannerList = () => {
  return mockRequests.get("/banner");
};

//floor轮播图获取
export const reqFloorlist = () => {
  return mockRequests.get("/floor");
};

// 删除某一商品
export const reqDeleteCartById = (skuId) => {
  // /api/cart/addToCart/{ skuId }/{ skuNum }
  return requests.delete("/cart/deleteCart/" + skuId);
};

// 修改商品的选中状态
export const reqUpdateCheckedById = (skuId, ischecked) => {
  // /api/cart/addToCart/{ skuId }/{ skuNum }
  return requests.get("/cart/checkCart/" + skuId + "/" + ischecked);
};

//URL:/api/user/passport/sendCode/{phone}  method:get
// 获取验证码
export const reqGetSMSCode = (phone) => {
  return requests.get("/user/passport/sendCode/" + phone);
};

// password: "1234"
// phone: "13666667777"
// smscode: "501223"
// 用户注册
// url:/api/user/passport/register  method:post    phone code password
export const reqUserRegister = (params) => {
  return requests.post("/user/passport/register", params);
};

export const reqUserLogin = (params) => {
  // URL:/api/user/passport/login  method:post phone password
  return requests.post("/user/passport/login", params);
};

// 获取用户信息
export const reqUserInfo = () => {
  //函数体
  return requests.get("/user/passport/auth/getUserInfo");
};

// 退出登陆
export const reqLogout = () => {
  //函数体
  return requests.get("/user/passport/logout");
};
