import { defineStore } from "pinia";
//引入规则
import type { reqLoginType, reqReginType } from "@/api/user/type";
//引入api
import { reqLogin, reqRegin, userinfo } from "@/api/user/index";
import request from "@/axios/axios";
//引入接口类型
import { userStoreType } from "@/store/userStore/type";
let userUserStore = defineStore("User", {
  //保存数据
  state: (): userStoreType => {
    return {
      token: localStorage.getItem("token"),
      users: {},
    };
  },
  //处理逻辑
  actions: {
    async loginSub(data: reqLoginType) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      //调用api中方法
      let result = await reqLogin(data);
      if (Number(result.data.code) === 200) {
        let token = result.data.token;
        let id = result.data.payload.userId;
        localStorage.setItem("userId", String(id));
        localStorage.setItem("token", token);
        request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return Promise.resolve(result.data);
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    //注册函数
    async signSub(data:reqReginType){
        let result = await reqRegin(data)
        console.log(result);
        
        if (result.data.item){
            return 'ok'
        }else{
            return Promise.reject(new Error(result.data.message))
        }
    },
    //获取用户信息函数
    async userinfos(userId: number) {
      return await userinfo(userId);
    },
  },
  //计算属性
  getters: {},
});
export default userUserStore;
