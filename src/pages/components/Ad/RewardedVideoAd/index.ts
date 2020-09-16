let rewardedVideoAd = null
let interstitialAd = null;

export const createRewardedVideoAd = (adUnitId:string,onClose?:(res?:any)=>void)=>{
    console.log("adUnitId",adUnitId)
    if(wx.createRewardedVideoAd){
        rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: adUnitId })
        rewardedVideoAd.onLoad(() => {
            console.log('onLoad event emit')
        })
        rewardedVideoAd.onError((err:any) => {
            console.log('onError event emit', err)
        })
        rewardedVideoAd.onClose((res:any) => {
            if(onClose){
                onClose(res);
            }
            console.log('onClose event emit', res);
        })
    }
    return rewardedVideoAd;
}

export const createInterstitialAd = (adUnitId:string,onClose?:(res?:any)=>void)=>{
    if(wx.createInterstitialAd){
        interstitialAd = wx.createInterstitialAd({ adUnitId: adUnitId })
        interstitialAd.onLoad(() => {
            console.log('onLoad event emit')
        })
        interstitialAd.onError((err) => {
            console.log('onError event emit', err)
        })
        interstitialAd.onClose((res) => {
            if(onClose){
                onClose(res);
            }
            console.log('onClose event emit', res)
        })
    }
    return interstitialAd;
}