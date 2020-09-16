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
import {moveTo} from "@/util/animation";


export default () => {

    const [isAuth,setIsAuth] = useState<boolean>(false);
    const [tiLiModalVisible, setTiLiModalVisible] = useState<boolean>(false);
    const [rankModalVisible, setRankModalVisible] = useState<boolean>(false);
    const [giftModalVisible, setGiftModalVisible] = useState<boolean>(false);
    const [settingModalVisible, setSettingModalVisible] = useState<boolean>(false);
    const [rankData, setRankData] = useState<RankData[]>([]);
    const [countDownTime,setCountDownTime] = useState<number>(100);
    const [animation,setAnimation] = useState<any>(null);

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


    usePageEvent("onLoad",()=>{
       console.log("index", wx.getStorageSync('siteInfo'));
       // 获取用户基本信息
        request("user/info",(data => {
            console.log("user/info",data);
        }),{
            data:{
                userToken:wx.getStorageSync("userToken")
            }
        })
    });

    const wxUserInfo=(e:any)=>{
        const a = e.detail.errMsg;
        if ("getUserInfo:ok" == a) {
            const userInfo = e.detail.userInfo;
            wx.setStorageSync("isAuth",true);
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

    }

    const animation2=()=>{
        console.log("start");
        let animation1 = wx.createAnimation({
            duration:5000,
            timingFunction:'linear',
            delay:1000,
        });
        animation.rotate(60).step();
        setAnimation(animation1.export);
    }
  return (
    <View className={styles.app} style={{background:'#fbd3a4'}}>
      <View className={styles.top}>
          <View className={styles.power} onTap={checkEng}>
              <Image className={styles.powerImg} src="/images/power.png" />
              <Text className={styles.powerTxt}>5/7</Text>
              <Text className={styles.currTime}>{formatTime(countDownTime)}</Text>
          </View>
          <View className={styles.coin}>
              <Image className={styles.powerImg} src="/images/coin.png" />
              <Text onTap={()=>{
                  console.log("abc");
              }} className={styles.powerTxt}>1230</Text>
          </View>
      </View>
        <View className={styles.main}>
            <Image className={styles.mainImg} src={Constants.resourceUrl+'images/rank/rank6.png'} />
            <View />
            <Image className={styles.duanTxt} src={Constants.resourceUrl+'images/rank/rank6_1.png'} />
            <view className={styles.info}>还差56关晋级优秀黄铜</view>
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
            <View onTap={goRewards} className={styles.rewards}>
                <Image src="https://bbs.zhuchenkeji.shop/attachment/images/51/2020/09/s1DD3FW1W3tjbBZzDBWbK77fgbTss3.jpg" />
                <view>1元</view>
            </View>
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
    </View>
  );
};
