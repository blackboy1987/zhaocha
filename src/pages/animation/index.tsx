import * as React from 'react';
import { View, Button } from 'remax/wechat';
import {useNativeEffect} from 'remax';
import styles from './index.css';
import {useState} from "react";

let animationObj:any;

export default () => {
    const [animation,setAnimation] = useState<Record<string, any>[]>([]);
    const [opacity,setOpacity] = useState<number>(0);
    useNativeEffect(()=>{
        animationObj = wx.createAnimation({
            duration:5000,
        });
    });


    const rotate=()=>{
        animationObj.rotate(Math.random() * 720 - 360).step();
        setAnimation(animationObj.export());
    }

    const reset=()=>{
        animationObj.opacity(1).rotate(0, 0).scale(1).translate(0, 0).skew(0, 0).step({ duration: 0 })
        setAnimation(animationObj.export());
    }

    const translate=()=>{
        setOpacity(1);
        setTimeout(()=>{
            animationObj.opacity(0).translate(200, -500).step()
            setAnimation(animationObj.export());
        },10);
    }

      return (
        <View className={styles.app} style={{background:'#fbd3a4'}}>
           <View className={styles.animation} style={{opacity:opacity}} animation={animation}>我是动画</View>
            <View>
                <Button onClick={rotate}>旋转</Button>
            </View>
            <View>
                <Button onClick={reset}>还原</Button>
            </View>
            <View>
                <Button onClick={translate}>移动</Button>
            </View>
        </View>
      );
};
