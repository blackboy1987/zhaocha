import * as React from 'react';
import styles from "./index.css";
import {View,Image} from "remax/one";

import {usePageEvent} from "remax/macro"

interface ModalProps{
    visible:boolean;
    close:()=>void;
}

export const ShareModal:React.FC<ModalProps>=({visible,close})=>{
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
                            <Image className={styles.engTitle} src="/images/goldTitle.png "/>
                            <Image className={styles.gold} src="/images/10gold.png" />
                            <View className={styles.engTxt}>邀请好友,好友助力得金币</View>

                            <View className={styles.ticket_tc1}>
                                <Image className={styles.getTicket} src="/images/getTicket.png"/>
                                <Image className={styles.getTicket} src="/images/getOther.png" />
                            </View>
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

export default ShareModal;