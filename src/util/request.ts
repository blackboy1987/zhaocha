import {Constants} from "@/util/constants";

export interface RequestOption{
    method?:
        | 'OPTIONS'
        | 'GET'
        | 'HEAD'
        | 'POST'
        | 'PUT'
        | 'DELETE'
        | 'TRACE'
        | 'CONNECT'
}


const request = (url:string,callback:(data:any)=>void,options?:any)=>{
    if(!options){
        options = {};
    }
    const method = options.method || 'GET';
    const data = options.data || {};
    const userToken = wx.getStorageSync("userToken");
    console.log("Constants.baseUrl+url",Constants.baseUrl+url);
    wx.request({
        url: Constants.baseUrl+url,
        method,
        data:{
            ...data,
            appCode:Constants.code,
            appSecret:Constants.secret,
            userToken,
        },
        success (res) {
            const {statusCode} = res;
            console.log(statusCode);
            if(statusCode>=200&&statusCode<=299){
                callback(res.data);
            }else {
                wx.showToast({
                    title:res.data.data.msg,
                    image:'/images/errorClick.png'
                });
            }
        },
        fail(err){
            wx.showToast({
                title:'请求失败',
                image:'/images/errorClick.png'
            });
        }
    })
}

export default request;