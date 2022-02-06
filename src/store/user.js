import {reqGetSMSCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout,
} from "@/api";
import { setToken, getToken,clearUserToken } from "@/utils/token";
const state = {
  smscode: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.smscode = code;
  },
  LOGINTOKEN(state, token) {
    state.token = token;
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state){
    state.userInfo = {};
    state.token = '';
    clearUserToken();
  }

};
const actions = {
  async getSmsCode({ commit }, phone) {
    let result = await reqGetSMSCode(phone);
    if (result.code == 200) {
      console.log(result.data);
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject("获取验证码失败，手机号 " + phone);
    }
  },
  // 用户注册
  async userRegister({ commit }, params) {
    // password: "1234"
    console.log("用户注册", params);
    let result = await reqUserRegister(params);
    if (result.code == 200) {
      console.log("用户注册结果", result.data);
      return "ok";
    } else {
      return Promise.reject("用户注册失败， " + result.message);
    }
  },
  // 用户登录
  async userLogin({ commit }, params) {
    let result = await reqUserLogin(params);
    if (result.code == 200) {
      console.log("用户登陆结果", result.data);
      // 使用工具类来处理token
      // 可能多个地方回使用到这个token 统一处理更好
      setToken(result.data?.token);
      commit("LOGINTOKEN", result.data?.token);
      return "ok";
    } else {
      return Promise.reject("用户注册失败， " + result.message);
    }
  },

  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      console.log("获取的登陆信息！！", result.data);
      commit("USERINFO", result.data);
    } else {
      return Promise.reject("用户注册失败， " + result.message);
    }
  },
  // 退出登陆
  async userLogout({ commit }) {
    // 清除token
    let result = await reqLogout();
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject("用户注册失败， " + result.message);
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
