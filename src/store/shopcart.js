//search
import { reqCartList, reqFloorlist } from "@/api";
import { getUUID } from "@/utils/uuid_token";

const state = {
  cartList: [],
  uuid_token: getUUID(),
};

const mutations = {
  CARTLIST(state, cartlist) {
    state.cartList = cartlist;
  },
};

const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("CARTLIST", result.data);
    }
    console.log("购物车列表数据", result.data);
  },
};

const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters,
};
