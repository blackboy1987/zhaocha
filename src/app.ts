import * as React from 'react';
import './app.css';
import request from "@/util/request";
import {useAppEvent } from "remax/macro";

const App: React.FC = props => {

    useAppEvent("onLaunch",()=>{
        request("site",(data)=>{
            wx.setStorage({
                key:"siteInfo",
                data:data.data.siteInfo
            });
            wx.setStorage({
                key:"rankList",
                data:data.data.rankList
            });
        })
    });


    wx.checkSession({
        success:()=>{

        },
        fail:()=>{
            wx.login({
                success:result=>{
                    request("login?code="+result.code,(data)=>{
                        console.log(data,"abc");
                        wx.setStorage({
                            key:"userToken",
                            data:data.data.token,
                        })
                    })
                }
            });
        }
    })

    wx.getUserInfo({
        success:result => {
            console.log("userInfo",result);
        }
    })


    return props.children as React.ReactElement;
};

export default App;
