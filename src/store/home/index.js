//home

import { reqCategoryList } from "@/api";
const state = {
  catgorylist:[]
};
const mutations = {
  CATROREYLIST(state,params){
    state.catgorylist = params
  }
};
const actions = {
  async reqCategoryList(context) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      context.commit("CATROREYLIST",result.data);
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
