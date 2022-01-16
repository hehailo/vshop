//进行api接口统一管理

import requests from './request';

//三级联动接口

export const reqCategoryList = ()=>{
    //函数体
    return requests.get("/product/getBaseCategoryList");
}