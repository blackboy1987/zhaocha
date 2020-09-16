import * as React from 'react';
import { View,Text,Image,Button} from 'remax/one';
import styles from './index.css';
import {formatTime} from "@/util/utils";
import {useState} from "react";
import {usePageEvent} from 'remax/macro';
import BannerAd from "@/pages/components/Ad/BannerAd";
import {createRewardedVideoAd} from "@/pages/components/Ad/RewardedVideoAd";
import {go} from "@/util/common";



export default () => {
    const [isShare,setIsShare] = useState(false);
    const [excitation,setExcitation] = useState(false);
    const [rewardedVideoAd,setRewardedVideoAd] = useState<any>(null);
    usePageEvent("onLoad",()=>{
        console.log("11111111111111111111111");
       const rewardedVideoAd1 = createRewardedVideoAd('adunit-2b255eac86508a8a',(res)=>{
           if (res && res.isEnded) {
               // 正常播放结束，可以下发游戏奖励
               console.log("奖励");
           } else {
               // 播放中途退出，不下发游戏奖励
               console.log("1111111奖励");
           }
        })
        console.log("222222222222222222",rewardedVideoAd1);
        setRewardedVideoAd(rewardedVideoAd1);


        setTimeout(()=>{
            rewardedVideoAd1.show();
        },3000);
    });

  return (
    <View className={styles.app} style={{background:'#fbd3a4'}}>
        <View className={styles.top}>
            <View className={styles.power}>
                <Image className={styles.powerImg} src="/images/power.png" />
                <Text className={styles.powerTxt}>5/7</Text>
                <Text className={styles.currTime}>{formatTime(30)}</Text>
            </View>
            <view className={styles.timeTitle}>时间到</view>
        </View>
        <view className={styles.main}>
            <Image className={styles.mainImg} src="/images/clock.png" />
            {/* 分享延长60秒 */}
            {
                !isShare&&!excitation ? (
                    <Image className={styles.startGame} src="https://bbs.zhuchenkeji.shop/addons/yf_zhaocha/resource/images/delayA.png" />
                ) : null
            }

            {/* 看视频广告延长60秒 */}
            {
                !isShare&&excitation ? (
                    <Image className={styles.startGame} src="https://bbs.zhuchenkeji.shop/addons/yf_zhaocha/resource/images/delay.png" />
                ) : null
            }
            {
                isShare ? (
                    <Button className={styles.startGame}>
                        <Image className={styles.startGame} src="https://bbs.zhuchenkeji.shop/addons/yf_zhaocha/resource/images/delayA.png" />
                    </Button>
                ) : null
            }
            <Image className={styles.reset} src="https://bbs.zhuchenkeji.shop/addons/yf_zhaocha/resource/images/reset.png" />
            <View className={styles.btnhome}>
                <Image className={styles.mainBack} src="/images/backIndex.png"  onTap={()=>go('/pages/index/index')} />
                <Image className={styles.invite} src="/images/invite.png" />
            </View>
        </view>
        <BannerAd />
    </View>
  );
};
