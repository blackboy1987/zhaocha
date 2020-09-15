import * as React from 'react';
import styles from "./index.css";
import {View,Image,Text,} from "remax/one";
import {ScrollView,Button} from 'remax/wechat';

interface ModalProps{
    visible:boolean;
    close:()=>void;
    rankData:RankData[];
}

export interface RankData{
    nickname:string;
    avatarUrl:string;
}

export const GiftModal:React.FC<ModalProps>=({visible,close,rankData})=>{
    return (
        <>
            {
                visible ? (
                    <View className={styles.bg}>
                        <View className={styles.toastBg} style={{height:750}}>
                            <Image className={styles.toastImg} src="/images/01.png" />
                            <Image className={styles.engTitle} src="/images/libaoTitle.png "/>

                            <ScrollView scrollY className={styles.toMain}>
                                <View className={styles.toMainItem}>
                                    <Image className={styles.itemIcon} src="/images/ico_help.png" />
                                    <View className={styles.itemTxt}>
                                        <Text className={styles.itemTxtTop}>好友助力</Text>
                                        <Text className={styles.itemTxtBottom}>领体力+金币</Text>
                                    </View>
                                    <Button data-other="share1" openType="share">
                                        <Image className={styles.itemBtn} src="/images/gotoget.png" />
                                        <Image className={styles.itemBtn} src="/images/has01.png" />
                                    </Button>
                                </View>

                                <View className={styles.toMainItem}>
                                    <Image className={styles.itemIcon} src="/images/ico_invite.png" />
                                    <View className={styles.itemTxt}>
                                        <Text className={styles.itemTxtTop}>邀请好友</Text>
                                        <Text className={styles.itemTxtBottom}>领更多体力+金币</Text>
                                    </View>
                                    <Button data-other="share2" openType="share">
                                        <Image className={styles.itemBtn} src="/images/gotoget.png" />
                                        <Image className={styles.itemBtn} src="/images/has01.png" />
                                    </Button>
                                </View>

                                <View className={styles.toMainItem}>
                                    <Image className={styles.itemIcon} src="/images/ico_share.png" />
                                    <View className={styles.itemTxt}>
                                        <Text className={styles.itemTxtTop}>分享到群里</Text>
                                        <Text className={styles.itemTxtBottom}>领体力</Text>
                                    </View>
                                    <Button data-other="share3" openType="share">
                                        <Image className={styles.itemBtn} src="/images/gotoget.png" />
                                        <Image className={styles.itemBtn} src="/images/has01.png" />
                                    </Button>
                                </View>

                                <View className={styles.toMainItem}>
                                    <Image className={styles.itemIcon} src="/images/ico_video.png" />
                                    <View className={styles.itemTxt}>
                                        <Text className={styles.itemTxtTop}>看激励视频</Text>
                                        <Text className={styles.itemTxtBottom}>免费领金币</Text>
                                    </View>
                                    <Button data-other="share3" openType="share">
                                        <Image className={styles.itemBtn} src="/images/gotoget.png" />
                                        <Image className={styles.itemBtn} src="/images/has01.png" />
                                    </Button>
                                </View>

                                <View className={styles.toMainItem}>
                                    <Image className={styles.itemIcon} src="/images/iconc.png" />
                                    <View className={styles.itemTxt}>
                                        <Text className={styles.itemTxtTop}>客服会话</Text>
                                        <Text className={styles.itemTxtBottom}>每日得体力</Text>
                                    </View>
                                    <Button data-other="share3" openType="share">
                                        <Image className={styles.itemBtn} src="/images/gotoget.png" />
                                        <Image className={styles.itemBtn} src="/images/has01.png" />
                                    </Button>
                                </View>

                            </ScrollView>
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

export default GiftModal;