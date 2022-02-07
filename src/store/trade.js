import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
  address: [],
  orderInfo: {},
};

const mutations = {
  GETUSERADDRESS(state, data) {
    state.address = address;
  },
  GETORDERINFO(state, data) {
    state.orderInfo = orderInfo;
  },
};

const actions = {
  //获取用户地址信息
  async getUserAddress({ commit }) {
      console.log("getUserAddress-----");
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
      return "ok";
    } else {
      return Promise.reject(result.message || "查询失败！");
    }
  },
  //获取商品清单数据
  async getOrderInfo({ commit }) {
    console.log("getOrderInfo---2222--");
    let result = await reqOrderInfo();
    console.log(result);
    if (result.code == 200) {
      commit("GETORDERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(result.message || "查询失败！");
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
