import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
  address: [],
  orderInfo: {},
};

const mutations = {
  GETUSERADDRESS(state, data) {
    state.address = data;
  },
  GETORDERINFO(state, data) {
    state.orderInfo = data;
  },
};

const actions = {
  //获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
      return "ok";
    } else {
      return Promise.reject(result.message || "获取用户地址信息查询失败！");
    }
  },
  //获取商品清单数据
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      commit("GETORDERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(result.message || "获取商品清单数据查询失败！");
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
