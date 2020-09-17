import request from "@/util/request";

/**
 * 封装登录流程
 * 1：调用wx.login获取code码
 * 2：根据code码获取用户信息
 */
export const login = () =>{
    wx.login({
        success:(data)=>{
            if(data.code){
                request("login?code="+data.code,(result)=>{
                    setStorage("userInfo",result);
                    if(result.token){
                        setStorage("userToken",result.token);
                    }
                });
            }
        }
    })
}

export const setStorage=(key:string,value:any)=>{
    wx.setStorageSync(key,value);
}

export const getStorage=(key:string)=>{
    return wx.getStorageSync(key);
}