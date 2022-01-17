//进行api接口统一管理

import requests from "./request";
import mockRequests from "./mockRequest";

//三级联动目录接口
export const reqCategoryList = () => {
  //函数体
  return requests.get("/product/getBaseCategoryList");
};

//首页轮播图
export const reqBannerList = () => {
  return mockRequests.get("/banner");
};

//floor轮播图获取
export const reqFloorlist = () => {
    return mockRequests.get("/floor")
};
