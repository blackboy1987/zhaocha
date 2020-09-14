import * as React from 'react';
import styles from "./index.css";
import {View,Image} from "remax/one";

interface ModalProps{
    visible:boolean
}

export const Modal:React.FC<ModalProps>=({visible})=>{
    console.log(visible);

    return (
        <View className={styles.bg} wx-if={visible}>
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
                    <Image className={styles.closeImg} src="/images/btn_close.png" />
                </View>
            </View>
        </View>
    );
}

export default Modal;