import * as React from 'react';
import {Text,View,} from 'remax/one';
import {Button,Image} from 'remax/wechat';
import styles from './index.css';
import request from "@/util/request";
import {Constants} from "@/util/constants";
import {useState} from "react";
import {btnSoundTrue, go} from "@/util/common";
import {useNativeEffect} from 'remax';
import {usePageEvent} from 'remax/macro';
import TiLiModal from "@/pages/components/tiliModal";
import {formatTime} from "@/util/utils";
import RankModal, {RankData} from "@/pages/components/RankModal";
import SettingModal from "@/pages/components/SettingModal";
import GiftModal from "@/pages/components/GiftModal";
import BannerAd from "../components/Ad/BannerAd";
import {getStorage, login, setStorage} from "@/util/wxUtils";
import {RankInfo, SiteInfo, UserInfo} from "@/data";
import {defaultRankInfo, defaultSiteInfo, defaultUserInfo} from "@/initData";
import DuiHuanModal from "@/pages/components/DuiHuanModal";


export default () => {

    const [isAuth,setIsAuth] = useState<boolean>(false);
    const [tiLiModalVisible, setTiLiModalVisible] = useState<boolean>(false);
    const [rankModalVisible, setRankModalVisible] = useState<boolean>(false);
    const [giftModalVisible, setGiftModalVisible] = useState<boolean>(false);
    const [settingModalVisible, setSettingModalVisible] = useState<boolean>(false);
    const [duiHuanModalVisible,setDuiHuanModalVisible] = useState<boolean>(false);
    const [rankData, setRankData] = useState<RankData[]>([]);
    const [countDownTime,setCountDownTime] = useState<number>(100);
    const [animation,setAnimation] = useState<any>(null);
    const [rankInfo,setRankInfo] = useState<RankInfo>(defaultRankInfo);
    const [siteInfo,setSiteInfo] = useState<SiteInfo>(defaultSiteInfo);
    const [userInfo,setUserInfo] = useState<UserInfo>(defaultUserInfo);
    const [rewards,setRewards] = useState([]);

    useNativeEffect(() => {
        setIsAuth(wx.getStorageSync("isAuth"));
        countDown(countDownTime);
    }, [isAuth,countDownTime]);

    const countDown=(time:number)=>{
        let timer = setInterval(()=>{
            let newTime = time-1;
            setCountDownTime(newTime);
            clearInterval(timer);
            countDown(newTime);
        },1e3);
    }


    usePageEvent("onLoad",(e)=>{
        setSiteInfo(getStorage("siteInfo"));
       // 调用登录接口获取用户信息
        login((res)=>{
            setUserInfo(res);
        });
        // 获取用户等级信息
        request("user/level?userToken="+getStorage("userToken"),(data)=>{
            setRankInfo(getStorage("rankInfo"));
            setStorage("rankInfo",data);
        })
    });

    const wxUserInfo=(e:any)=>{
        const a = e.detail.errMsg;
        if ("getUserInfo:ok" == a) {
            const userInfo = e.detail.userInfo;
            // 授权成功之后，将信息写入到数据库里面去。
            request("user/update",()=>{},{
                data:{
                    userToken:wx.getStorageSync("userToken"),
                    ...userInfo
                }
            })

            setStorage("isAuth",true);
            setIsAuth(true);
            wx.showToast({
                title: "授权成功，请继续游戏",
                icon: "none",
                duration: 2e3,
                mask: !0
            })
        } else {
            wx.setStorageSync("isAuth",true);
            setIsAuth(true);
            wx.showToast({
                title: "授权后才能查看",
                icon: "none",
                duration: 2e3,
                mask: !0
            });
        }

    }

    const toGame = () =>{
        btnSoundTrue();
        go('/pages/game/index');
    }

    const checkEng=()=>{
        setTiLiModalVisible(true);
    }

    const rankFun=()=>{
        setRankModalVisible(true);
    }

    const gift=()=>{
        setGiftModalVisible(true);
    }

    const setting=()=>{
        setSettingModalVisible(true);
    }

    const goRewards=()=>{
        const {money=0} = userInfo;
        const {reward:{max_unit=0,msg}} = siteInfo;
        if(money<max_unit){
            wx.showToast({
                title: msg,
                icon: "none",
                duration: 2e3
            })
        }else{
            // 拉取可以兑换的礼品
            setDuiHuanModalVisible(true);
        }
    }
  return (
    <View className={styles.app} style={{background:'#fbd3a4'}}>
      <View className={styles.top}>
          <View className={styles.power} onTap={checkEng}>
              <Image className={styles.powerImg} src="/images/power.png" />
              <Text className={styles.powerTxt}>{userInfo.ticket}/{siteInfo.ticketMax}</Text>
              <Text className={styles.currTime}>{formatTime(rankInfo.residueTime||0)}</Text>
          </View>
          <View className={styles.coin}>
              <Image className={styles.powerImg} src="/images/coin.png" />
              <Text onTap={()=>{
                  console.log("abc");
              }} className={styles.powerTxt}>1230</Text>
          </View>
      </View>
        <View className={styles.main}>
            <Image className={styles.mainImg} src={rankInfo.rankImg} />
            <View />
            <Image className={styles.duanTxt} src={rankInfo.rankNameImg} />
            <view className={styles.info}>{rankInfo.willTitle}</view>
            {
                isAuth ? (
                    <Button onClick={toGame}>
                        <Image className={styles.startGame} src={Constants.resourceUrl+'images/startGame.png'} />
                    </Button>
                ) : (
                    <Button onGetUserInfo={wxUserInfo} openType="getUserInfo">
                        <Image onClick={()=>go("/pages/game/index")} className={styles.startGame} src={Constants.resourceUrl+'images/startGame.png'} />
                    </Button>
                )
            }

            <View className={styles.btns}>
                <View className={styles.btnCon}>
                    {
                        !isAuth ? (<Button onGetUserInfo={wxUserInfo} className={styles.getuser} openType="getUserInfo" />) : null
                    }
                    <Image className={styles.btnImg} src={Constants.resourceUrl+'images/pk.png'} />
                </View>
                <View className={styles.btnCon}>
                    {
                        !isAuth ? (<Button onGetUserInfo={wxUserInfo} className={styles.getuser} openType="getUserInfo" />) : null
                    }
                    <Image onClick={gift} className={styles.btnImg} src={Constants.resourceUrl+'images/gift.png'} />
                </View>
                <View className={styles.btnCon}>
                    {
                        !isAuth ? (<Button onGetUserInfo={wxUserInfo} className={styles.getuser} openType="getUserInfo" />) : null
                    }
                    <Image onClick={rankFun} className={styles.btnImg} src={Constants.resourceUrl+'images/paihang.png'} />
                </View>
                <View className={styles.btnCon}>
                    <Image onClick={setting} className={styles.btnImg} src={Constants.resourceUrl+'images/setting.png'} />
                </View>
                <Button className={styles.btnCon} openType="contact">
                    <Image className={styles.btnImg} src={Constants.resourceUrl+'images/people.png'} />
                </Button>
            </View>
            {
                siteInfo.reward?.open==1 ? (
                    <View onTap={goRewards} className={styles.rewards}>
                        <Image src={siteInfo.reward.img} />
                        <view>{userInfo.money} {siteInfo.reward.unit}</view>
                    </View>
                ) : null
            }
            <BannerAd />
        </View>
        {
            tiLiModalVisible ? ( <TiLiModal visible={tiLiModalVisible} close={()=>setTiLiModalVisible(false)} countDownTime={countDownTime} />) : null
        }
        {
            rankModalVisible ? (<RankModal visible={rankModalVisible} close={()=>setRankModalVisible(false)} rankData={rankData} />) : null
        }
        {
            giftModalVisible ? (<GiftModal visible={giftModalVisible} close={()=>setGiftModalVisible(false)} rankData={rankData} />) : null
        }
        {
            settingModalVisible ? (<SettingModal visible={settingModalVisible} close={()=>setSettingModalVisible(false)} rankData={rankData} />) : null
        }
        {
            duiHuanModalVisible ? (<DuiHuanModal visible close={()=>setDuiHuanModalVisible(false)} />) : null
        }

    </View>
  );
};
