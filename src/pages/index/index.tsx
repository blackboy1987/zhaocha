import * as React from 'react';
import { View, Text, Image } from 'remax/one';
import styles from './index.css';
import {usePageEvent} from 'remax/macro';
import request from "@/util/request";

export default () => {

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

  return (
    <View className={styles.app} style={{background:'#fbd3a4'}}>
      <View className={styles.top}>
          <View className={styles.power}>
              <Image className={styles.powerImg} src="/images/power.png" />
              <Text className={styles.powerTxt}>5/7</Text>
              <Text className={styles.currTime}>03:00</Text>
          </View>
          <View className={styles.coin}>
              <Image className={styles.powerImg} src="/images/coin.png" />
              <Text onTap={()=>{
                  console.log("abc");
                  setShareModalVisible(true);
              }} className={styles.powerTxt}>1230</Text>
          </View>
      </View>
        <View className={styles.main}>
            <Image className={styles.mainImg} />
        </View>
    </View>
  );
};
