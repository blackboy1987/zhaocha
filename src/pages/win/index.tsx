import * as React from 'react';
import { View, Text, Image,Button } from 'remax/one';
import Ad from '../components/Ad';
import {usePageEvent} from 'remax/macro';
import styles from './index.css';
import {formatTime} from "@/util/utils";

export default () => {

    usePageEvent("onShow",()=>{
        let interstitialAd:any = null
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: 'adunit-aaaa125d434975d9'
            })
            interstitialAd.onLoad(() => {})
            interstitialAd.onError((err) => {})
            interstitialAd.onClose(() => {})
        }
        if (interstitialAd) {
            setTimeout(()=>{
                interstitialAd.show().catch((err) => {
                    console.error(err)
                })
            },15000);

        }
    })


  return (
    <View className={styles.app} style={{background:'#fbd3a4'}}>
        <View className={styles.top}>
            <View className={styles.power}>
                <Image className={styles.powerImg} src="/images/power.png" />
                <Text className={styles.powerTxt}>5/7</Text>
                <Text className={styles.currTime}>{formatTime(584)}</Text>
            </View>
        </View>
        <view className={styles.main}>
            <Image className={styles.mainImgTitle} src="/images/winTitle.png" />
            <Image className={styles.mainImg} src="https://bootx-xxl.oss-cn-hangzhou.aliyuncs.com/zhaocha/rank/dg16.png" />
            <View />
            <Image className={styles.duanTxt} src="https://bootx-xxl.oss-cn-hangzhou.aliyuncs.com/zhaocha/rank/rank15_1.png" />
            <View className={styles.info}>还差23关晋级机敏青铜</View>
            <Image className={styles.startGame}  src="https://bootx-xxl.oss-cn-hangzhou.aliyuncs.com/zhaocha/next.png" />
            <view className={styles.btnhome}>
                <Image className={styles.mainBack} src="/images/backIndex.png" />
                <Button className={styles.inviteBtn} data-other="share3" hoverClass="none" openType="share">
                    <Image src="/images/invite.png" />
                </Button>
            </view>
        </view>



        <Ad />
    </View>
  );
};
