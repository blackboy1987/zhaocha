import request from "@/util/request";
import {SystemInfo} from "@/data";
import {useCallback} from "react";

/**
 * 封装登录流程
 * 1：调用wx.login获取code码
 * 2：根据code码获取用户信息
 */
export const login = (callback?:(res:any)=>void) =>{
    wx.login({
        success:(data)=>{
            if(data.code){
                request("login?code="+data.code,(result)=>{
                    setStorage("userInfo",result);
                    if(result.token){
                        setStorage("userToken",result.token);
                    }
                    if(callback){
                        callback(result);
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

export const wxGetSystemInfo=(callback?:(res:SystemInfo)=>void)=>{
    wx.getSystemInfo({
        success:(result:SystemInfo)=>{
            wx.setStorageSync("systemInfo",result);
            if(callback){
                callback(result);
            }
        }
    });
}