import {Constants} from "@/util/constants";
import { navigateTo } from 'remax/one';

const globalData = {
    musicBG: wx.createInnerAudioContext(),
    musicCommon: wx.createInnerAudioContext(),
    btnMusic: wx.createInnerAudioContext(),
}

export const btnSoundTrue=()=>{
    const {musicCommon} = globalData;
    musicCommon.src = Constants.resourceUrl+"music/btnSound.mp3",
    musicCommon.play();
};

export const go=(url:string)=>{
    navigateTo({
        url
    });
};

export const copy=(data:any,callback?:()=>void)=>{
    wx.setClipboardData({
        data,
        success: function(t) {
            if(callback){
                callback();
            }
        }
    });
}