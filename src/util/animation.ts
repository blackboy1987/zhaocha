export const moveTo=({x,y,z}:{x:number,y:number,z:number})=>{
    let animation = wx.createAnimation({
        duration:5000,
        timingFunction:'linear',
        delay:1000,
    });
    animation.translateX(x).translateY(y).translateZ(z).step();
    return animation.export();
}


export const resetAnimation=(animationObj:any)=>{
    console.log("huanyangzhuagntai");
    animationObj.opacity(1).rotate(0, 0).scale(1).translate(0, 0).skew(0, 0).step({ duration: 0 });
    return animationObj.export();
}