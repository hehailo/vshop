//home

import { reqProdDetail } from "@/api";
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
};

// categoryView:Object
// price:3432
// skuInfo:Object
// spuSaleAttrList:Array[0]
// valuesSkuJson:"

const getters = {
  categoryView(state){
    return state.productInfo.categoryView || {}
  },
  skuInfo(state){
    return state.productInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.productInfo.spuSaleAttrList || []
  }

};

export default {
  state,
  mutations,
  actions,
  getters,
};
