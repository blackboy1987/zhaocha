import * as React from 'react';
import styles from "./index.css";
import {View,Image,Text,} from "remax/one";
import {Switch} from 'remax/wechat';
import classNames from 'classnames';
import {useState} from "react";
import {copy} from "@/util/common";

interface ModalProps{
    visible:boolean;
    close:()=>void;
    rankData:RankData[];
}

export interface RankData{
    nickname:string;
    avatarUrl:string;
}

export const SettingModal:React.FC<ModalProps>=({visible,close,rankData})=>{

    const [uuId,setUuId] = useState<string>("werweqreqwrqwerqwerewqr");
    const [openSound,setOpenSound] = useState<boolean>(true);
    const [openNotice,setOpenNotice] = useState<boolean>(true);

    const switchSound=(e:any)=>{
        const {value=false} = e.detail;
        setOpenSound(value);
    }
    const switchNotice=(e:any)=>{
        const {value=false} = e.detail;
        setOpenNotice(value);
    }

    return (
        <>
            {
                visible ? (
                    <View className={styles.bg}>
                        <View className={styles.toastBg} style={{height:750}}>
                            <Image className={styles.toastImg} src="/images/01.png" />
                            <Image className={styles.engTitle} src="/images/settingTitle.png "/>
                            <View className={styles.toMain}>
                                <View className={classNames(styles.toMainItem,styles.toMainFlex)}>
                                    <View className={classNames(styles.itemTxt,styles.itemTxtRet)}>
                                        <Text className={styles.itemTxtCenter}>小程序通知</Text>
                                        <Switch checked={openNotice} onChange={switchNotice} />
                                    </View>
                                </View>
                                <View className={classNames(styles.toMainItem,styles.toMainFlex)}>
                                    <View className={classNames(styles.itemTxt,styles.itemTxtRet)}>
                                        <Text className={styles.itemTxtCenter}>声音开关</Text>
                                    </View>
                                    <Switch checked={openSound} onChange={switchSound} />
                                </View>
                                <View onTap={()=>copy(uuId)} className={classNames(styles.toMainItem,styles.toMainFlex)}>
                                    <View className={classNames(styles.itemTxt,styles.itemTxtRet)}>
                                        <Text className={styles.itemTxtCenter}>用户ID</Text>
                                    </View>
                                    <View className={styles.uid}>{uuId}</View>
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

export default SettingModal;