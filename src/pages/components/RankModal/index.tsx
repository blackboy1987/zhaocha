import * as React from 'react';
import styles from "./index.css";
import {View,Image,Text} from "remax/one";
import {ScrollView} from 'remax/wechat';
import classNames from 'classnames';

interface ModalProps{
    visible:boolean;
    close:()=>void;
    rankData:RankData[];
}

export interface RankData{
    nickname:string;
    avatarUrl:string;
}

export const RankModal:React.FC<ModalProps>=({visible,close,rankData})=>{
    console.log("rankData",visible);
    return (
        <>
            {
                visible ? (
                    <View className={styles.bg}>
                        <View className={classNames(styles.toastBg,styles.rankToast)}>
                            <Image className={classNames(styles.toastImg,styles.rankImg)} src="/images/01.png" />
                            <Image className={styles.engTitle} src="/images/rankTitle.png "/>

                            <ScrollView scrollY style={{height: 500,borderBottom: '2px solid #eb7c02'}}>
                                {
                                    rankData.map((item,index)=>(
                                        <View className={styles.ranklist} key={index}>
                                            <View className={styles.rankItem}>
                                                <View className={styles.rankRow}>
                                                    <Image src={item.avatarUrl} />
                                                    <Text>{item.nickname}</Text>
                                                </View>
                                                <Text>第{index+1}名</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </ScrollView>

                            <View className={styles.ranklist}>
                                <View className={styles.rankItem}>
                                    <View className={styles.rankRow}>
                                        <Image src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzic1qjbhDJ3ia494IWj3yaVLysEKOmS42Hvle1bByCKribFY7mUBzJibFB1LblQxVaQ8ktWaGBYibaVg/132" />
                                        <text>一枚帅哥</text>
                                    </View>
                                    <Text>第2名</Text>
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

export default RankModal;