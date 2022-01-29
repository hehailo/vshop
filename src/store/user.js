import { reqGetSMSCode,reqUserRegister,reqUserLogin } from "@/api";
const state = {
  smscode: "",
  token:''
};
const mutations = {
  GETCODE(state, code) {
    state.smscode = code;
  },
  LOGINTOKEN(state,token){
    state.token = token;
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
  async userRegister({ commit }, params) {
    // password: "1234"
    // phone: "13666667777"
    // smscode: "501223"
    console.log("用户注册", params);
    let result =  await reqUserRegister(params)
    if (result.code == 200) {
        console.log("用户注册结果",result.data);
        return "ok";
    } else {
        return Promise.reject("用户注册失败， " + result.message);
    }
  },
  async userLogin({commit},params){
     let result = await reqUserLogin(params);
     if (result.code == 200) {
        console.log("用户注册结果",result.data);
        commit("LOGINTOKEN",result.data?.token)
        return "ok";
    } else {
        return Promise.reject("用户注册失败， " + result.message);
    }
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
