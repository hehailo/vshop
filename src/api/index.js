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



// mock数据

//首页轮播图
export const reqBannerList = () => {
  return mockRequests.get("/banner");
};

//floor轮播图获取
export const reqFloorlist = () => {
    return mockRequests.get("/floor")
};