//home

import { reqProdDetail, reqAddOrUpdateShopCart } from "@/api";
const state = {
  productInfo: {},
};
const mutations = {
  PRDOINFO(state, item) {
    state.productInfo = item;
  },
};
const actions = {
  async getProdInfo(context, skuid) {
    let result = await reqProdDetail(skuid);
    if (result.code == 200) {
      context.commit("PRDOINFO", result.data);
    }
  },

  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // result 不是promise 需要重新封装
    console.log("加入购物车请求", result);
    if (result.code >= 200 && result.code < 300 ) {
      return "ok";
    } else {
      // return Promise.reject("fail")
      return Promise.reject(new Error("添加购物车失败！"));
    }
  },
};

// categoryView:Object
// price:3432
// skuInfo:Object
// spuSaleAttrList:Array[0]
// valuesSkuJson:"

const getters = {
  categoryView(state) {
    return state.productInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.productInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.productInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
