import * as React from 'react';
import './app.css';
import request from "@/util/request";
import {useAppEvent } from "remax/macro";
import {getStorage, setStorage} from "@/util/wxUtils";

const App: React.FC = props => {

    useAppEvent("onLaunch",()=>{
        // 获取网站基本信息
        request("site",(data)=>{
            wx.setStorage({
                key:"siteInfo",
                data:data.siteInfo
            });
            wx.setStorage({
                key:"rankList",
                data:data.rankList
            });
        });
    });

    return props.children as React.ReactElement;
};

export default App;
