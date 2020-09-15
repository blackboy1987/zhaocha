export const formatTime = (time:number,separate?:string):string=>{
    let min = parseInt(`${time/60}`,10);
    let sec = parseInt(`${time%60}`,10);
    return (min<10 ? '0'+min : `${min}`) +(separate?separate:":")+ (sec<10 ? '0'+sec : `${sec}`);
}