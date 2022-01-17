//search

import { reqSeachlist } from "@/api";

const state = {
  searchlist: {},
};

const mutations = {
  SEARCHLIST(state,params) {
    state.searchlist = params;
  },
};

const actions = {
  //搜索结构
  async getSearchList({ commit }, params = {}) {
    // 形参 是dispatch 时传递的第二个参数
    let result = await reqSeachlist(params);
    if (result.code == 200) {
      commit("SEARCHLIST", result.data);
    }
  },
};

const getters = {
  // state是当前仓库的state
  goodsList(state){
    return state.searchlist.goodsList || []
  },
  attrsList(state){
    return state.searchlist.attrsList || []
  },
  trademarkList(state){
    return state.searchlist.trademarkList ||[]
  },

//   attrsList: (...)
// goodsList: (...)
// pageNo: (...)
// pageSize: (...)
// total: (...)
// totalPages: (...)
// trademarkList:
};

export default {
  state,
  mutations,
  actions,
  getters,
};
