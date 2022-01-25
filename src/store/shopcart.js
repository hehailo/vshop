//search
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
import { getUUID } from "@/utils/uuid_token";

const state = {
  cartList: [],
  uuid_token: getUUID(),
};

const mutations = {
  CARTLIST(state, cartlist) {
    state.cartList = cartlist[0]?.cartInfoList || [];
  },
};

const actions = {
  // 获取购物车列表
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      console.log("getCartList", result.data);
      commit("CARTLIST", result.data);
    }
    console.log("购物车列表数据", result.data);
  },
  // 删除商品
  async deleteCartById({ commit }, skuId) {
    console.log("删除的商品id", skuId);
    let rusult = await reqDeleteCartById(skuId);
    if (rusult.code == 200) {
      return "ok";
    } else {
      return Promise.reject("删除失败！");
    }
  },
  // 修改选中状态
  async changeChecedState({ commit }, { skuId, checked }) {
    let result = await reqUpdateCheckedById(skuId, checked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  deleteAllSelected({ dispatch, state }) {
    let prmiseAll = [];
    // 删除所有选中的商品 {dispatch,getters}
    state.cartList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("deleteCartById", item.skuId) : "";
      prmiseAll.push(promise);
    });
    console.log("prmiseAll", prmiseAll);
    return Promise.all(prmiseAll);
  },
  // 选中所有商品
  selectAll({ dispatch, state }) {
    let promiseAll = [];
    state.cartList.forEach((item) => {
      //函数体
      let promise =
        item.isChecked == 1?
         "": dispatch("changeChecedState", { skuId: item.skuId, checked: 1 });
      promiseAll.push(promise);
    });
    console.log("选中所有商品", promiseAll);
    return Promise.all(promiseAll);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
