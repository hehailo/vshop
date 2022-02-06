export const setToken = (token) => {
  //函数体
  localStorage.setItem("USERTOKEN", token);
};

export const getToken = () => {
    //函数体
    return localStorage.getItem("USERTOKEN");
  };

// 清除本地的缓存 tui chu登陆时使用
export const clearUserToken =()=>{
  //函数体
  localStorage.removeItem("USERTOKEN")
}