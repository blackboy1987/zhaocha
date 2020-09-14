const animation = (from:{x:number,y:number},to:{x:number,y:number},time:number,callback:(animation:any)=>void)=>{
    const animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
    });
    animation.opacity(1).translate(to.x-from.x,to.y-from.y).rotate(45).step();
    callback(animation.export());
    setTimeout(function() {
        animation.step()
        callback(animation.export());
    }, 1000)
}

export default animation;