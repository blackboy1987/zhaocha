import * as React from 'react';
import styles from "./index.css";
import {View,Image} from "remax/one";

import {usePageEvent} from "remax/macro"
import {formatTime} from "@/util/utils";

interface ModalProps{
    visible:boolean;
    close:()=>void;
    countDownTime:number;
}

export const TiLiModal:React.FC<ModalProps>=({visible,close,countDownTime})=>{
    usePageEvent("onLoad",()=>{
        console.log("111111111111111111111");
    });

    return (
        <>
            {
                visible ? (
                    <View className={styles.bg}>
                        <View className={styles.toastBg}>
                            <Image className={styles.toastImg} src="/images/01.png" />
                            <Image className={styles.engTitle} src="/images/engTitleSele.png "/>
                            {
                                countDownTime<=0 ? (
                                    <>
                                        <Image className={styles.eng} src="/images/engSele.png" />
                                        <View className={styles.engTxt}>已满</View>
                                    </>
                                ) : (
                                    <>
                                        <Image className={styles.eng} src="/images/eng.png" />
                                        <View className={styles.engTxt}>还需要{formatTime(countDownTime,'分')}恢复一点体力</View>
                                    </>
                                )
                            }


                            <View className={styles.closeCon}>
                                <Image onTap={()=>close()} className={styles.closeImg} src="/images/btn_close.png" />
                            </View>
                        </View>
                    </View>
                ) : null
            }
        </>
    );
}

export default TiLiModal;