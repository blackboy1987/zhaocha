import * as React from 'react';
import styles from "./index.css";
import {View} from "remax/one";

const BannerAd= ()=>{
    const adLoad=()=>{
        console.log('Banner 广告加载成功');
    }
    const adError=(err)=>{
        console.log('Banner 广告加载失败', err)
    }
    const adClose=()=>{
        console.log('Banner 广告关闭')
    }


    return (
        <View className={styles.adContainer}>
            <ad bindload={adLoad} binderror={adError} bindclose={adClose} unit-id="adunit-4813ca1eefbf6332" />
        </View>
    );
}

export default BannerAd;