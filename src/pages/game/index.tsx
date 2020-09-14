import * as React from 'react';
import { View, Text, Image } from 'remax/one';
import {usePageEvent} from 'remax/macro';
import styles from './index.css';
import {useEffect, useState} from "react";
import Ad from '../components/Ad';
import {SystemInfo} from "@/data";
import request from "@/util/request";
import animation from "@/util/animation";
import { navigateTo } from 'remax/one';
import {formatTime} from "@/util/utils";
const imgWidth = 1602;
const imgHeight = 1002;
const innerAudioContext=wx.createInnerAudioContext()

interface ImageData {
    x:number;
    y:number;
    width:number;
    height:number;
    url:string;
    check?:boolean;
}

interface SelectCircle {
    x:number;
    y:number;
    opacity?:number;
}

export default () => {
    const [width,setWidth] = useState<number>(0);
    const [level,setLevel] = useState<number>(0);
    const [remainSeconds,setRemainSeconds] = useState(10);
    const [height,setHeight] = useState<number>(0);
    const [scale,setScale] = useState<number>(1);
    const [imgs,setImgs] = useState<ImageData[]>([]);
    const [selectCircles,setSelectCircles] = useState<SelectCircle[]>([]);
    const [errorCircle,setErrorCircle] = useState<SelectCircle>({
        x:-200,
        y:-200,
        opacity:0,
    });
    const [errorCircleAnimation,setErrorCircleAnimation] = useState(null);

    usePageEvent("onLoad",()=>{
        wx.getSystemInfo({
            success:(result:SystemInfo)=>{
                const width1 = result.windowWidth-30;
                const scale1 = width1/imgWidth;
                const height1 = imgHeight*scale1;
                setWidth(width1);
                setHeight(height1);
                console.log(scale1);
                request("http://blackboy1987.eicp.net/level",(data)=>{
                    const {value,question=[]} = data.data;
                    setLevel(value);
                    setImgs(question.map((item:ImageData,index:number)=>{
                        if(index===0){
                           return item;
                        }
                        return {
                            ...item,
                            width:item.width*scale1,
                            height:item.height*scale1,
                            x:item.x*scale1-item.width*scale1/2,
                            y:Math.abs(item.y*scale1-item.height*scale1/2),
                        }
                    }));
                });
            }
        });
        countDown(remainSeconds);
    });
    const countDown=(seconds:number)=>{
        if(seconds<=0){
            return ;
        }
        if(seconds<=6){
            if(innerAudioContext.paused){
                innerAudioContext.src="https://localhost:9900/zhaocha/music/countDown.mp3";
                innerAudioContext.play();
            }

        }
        setRemainSeconds(seconds-1);
        let timer = setInterval(()=>{
            countDown(seconds-1);
            clearInterval(timer);
        },1000);
    }

    const getError=(item:ImageData,e:any)=>{
        const errorX = e.nativeEvent.detail.x-30;
        const errorY = e.nativeEvent.detail.y-30-30-30-30;
        setErrorCircle({
            x:errorX,
            y:errorY,
            opacity:1,
        });

        animation({x:errorX,y:errorY},{x:50,y:50},10000,(currentPosition)=>{
            setErrorCircleAnimation(currentPosition);
        });

       // wx.vibrateShort();
    }
    const noneClick=(item:ImageData,e:any)=>{
        if(item.check){
            return;
        }
        let selectCircle:SelectCircle = {
            x:0,
            y:0,
        }
        selectCircle.x = item.x + item.width / 2 - 15;
        selectCircle.y = item.y + item.height / 2 - 15;
        const newSelectCircles = [
            ...selectCircles,
            selectCircle
        ]
        setSelectCircles(newSelectCircles);
        // 选中了
        setImgs(imgs.map((img:ImageData)=>{
            if(item.url===img.url){
                return {
                    ...item,
                    check:true
                }
            }
            return img
        }));
        console.log(newSelectCircles.length,imgs.length);
        // 找完所有的不同点
        if(newSelectCircles.length===imgs.length-1){
            navigateTo({
                url: '/pages/index/index',
            });
        }

    }

  return (
    <View className={styles.app} style={{background:'#fbd3a4'}}>
        <view className={styles.top} style={{display:'none'}}>
            <Image className={styles.icon_back} src="/images/icon_back.png" />
        </view>
        <view className={styles.time}>
            <text className={styles.timeText} style={{color:'#1b1b1b'}}>{formatTime(remainSeconds)}</text>
        </view>
        <Image className={styles.icon_back} src="/images/icon_back.png" />

        <view className={styles.num}>
            {
                imgs.map((img,index)=>(index>0&&<Image
                        className={index<=selectCircles.length?styles.numImgSele:styles.numImg}
                        src={index<=selectCircles.length?"/images/b.png":"/images/a.png"}
                    />))
            }
            <view className={styles.checkpoint}>关卡：{level}</view>
        </view>

      <View className={styles.imgCon} style={{width:`${width}PX`,height:`${height}PX`}}>
          {
              imgs.map((item:ImageData,index:number)=>(
                  <>
                      {
                          index === 0 ? (
                              <Image onTap={(e)=>getError(item,e)} key={index} className={styles.imgMain} src={item.url} />
                          ) : (
                            <Image onTap={(e)=>noneClick(item,e)} key={index} className={styles.imgIcon} src={item.url} style={{width:`${item.width}PX`,height:`${item.height}PX`,left:`${item.x}PX`,top:`${item.y}PX`,opacity:index%2}} />
                          )
                      }
                  </>
              ))
          }
          {
              selectCircles.map((selectCircle:SelectCircle,index:number)=>(
                  <View key={index} className={styles.imgSpanA} style={{left:`${selectCircle.x}PX`,top:`${selectCircle.y}PX`}} />
              ))
          }
          <Image className={styles.imgSpanRed} src="/images/errorClick.png" style={{left:`${errorCircle.x}PX`,top:`${errorCircle.y}PX`,width:60,height:60,opacity:errorCircle.opacity}} />
          <View animation={errorCircleAnimation} className={styles.errorTx} style={{left:`${errorCircle.x}PX`,top:`${errorCircle.y}PX`}}>-20</View>
      </View>

        <View className={styles.imgCon} style={{width:`${width}PX`,height:`${height}PX`}}>
            {
                imgs.map((item:ImageData,index:number)=>(
                    <>
                        {
                            index === 0 ? (
                                <Image onTap={(e)=>getError(item,e)} key={index} className={styles.imgMain} src={item.url} />
                            ) : (
                                <Image onTap={(e)=>noneClick(item,e)} key={index} className={styles.imgIcon} src={item.url} style={{width:`${item.width}PX`,height:`${item.height}PX`,left:`${item.x}PX`,top:`${item.y}PX`,opacity:(index+1)%2}} />
                            )
                        }
                    </>
                ))
            }
            {
                selectCircles.map((selectCircle:SelectCircle,index:number)=>(
                    <View key={index} className={styles.imgSpanB} style={{left:`${selectCircle.x}PX`,top:`${selectCircle.y}PX`}} />
                ))
            }
        </View>
        <Image className={styles.tipImg} src="/images/gameTip.png" />





        <Ad />

    </View>
  );
};
