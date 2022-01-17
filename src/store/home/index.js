//home

import { reqCategoryList, reqBannerList, reqFloorlist } from "@/api";
const state = {
  catgorylist: [],
  bannerlist: [],
  floorlist: [],
};
const mutations = {
  CATROREYLIST(state, params) {
    state.catgorylist = params;
  },
  BANNERLIST(state, params) {
    state.bannerlist = params;
  },
  FLOORLIST(state, params) {
    state.floorlist = params;
  },
};
const actions = {
  //categorylist
  async reqCategoryList(context) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      context.commit("CATROREYLIST", result.data);
    }
  },
  //banner
  async getBannerlist(context) {
    let result = await reqBannerList();
    if (result.code == 200) {
      context.commit("BANNERLIST", result.data);
    }
  },
  //floor
  async getFloorList({ commit }) {
    let result = await reqFloorlist();
    if (result.code == 200) {
      commit("FLOORLIST", result.data);
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
