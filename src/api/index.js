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
  console.log("请求",params);
  return requests.post("/list",params)
};


// 产品详情
export const reqProdDetail = (skuid) => {
  return requests.get("/item/"+skuid)
};


// 加入购物车
export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
  // /api/cart/addToCart/{ skuId }/{ skuNum }
  return requests.post("/cart/addToCart/"+skuId +'/'+skuNum)
};


// 获取购物车列表
export const reqCartList = ()=>{
  //函数体
  // return requests.get("/cart/cartlist")
  return mockRequests.get("/cart/cartlist")
}

//首页轮播图
export const reqBannerList = () => {
  return mockRequests.get("/banner");
};

//floor轮播图获取
export const reqFloorlist = () => {
    return mockRequests.get("/floor")
};