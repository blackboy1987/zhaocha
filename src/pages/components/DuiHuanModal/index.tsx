import * as React from 'react';
import styles from "./index.css";
import {View,Image,Button} from "remax/one";
import classNames from 'classnames';

interface ModalProps{
    visible:boolean;
    close:()=>void;
}

export const DuiHuanModal:React.FC<ModalProps>=({visible,close})=>{
    console.log("rankData",visible);
    const goExchange=()=>{

    }

    return (
        <>
            {
                visible ? (
                    <View className={styles.bg}>
                        <View className={classNames(styles.toastBg,styles.rankToast)}>
                            <Image className={classNames(styles.toastImg,styles.rankImg)} src="/images/01.png" />
                            <View className={styles.rankMain}>
                                <Image className={styles.engTitle} src="/images/exchangeTitle.png "/>

                                <View className={styles.userExchange}>
                                    <View className={styles.exchangeView} />
                                    <Button onTap={goExchange} className="exchange-btn">兑换:30元</Button>
                                </View>

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

export default DuiHuanModal;