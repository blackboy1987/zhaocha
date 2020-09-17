export interface SystemInfo{
    windowWidth:number;
}

export interface RankItem{
    rank:number;
    img:string;
    rank_name:string;
}

export interface SiteInfo {
    ticket_max:number;
    ticket_time:number;
    is_share:number;
    game_time:number;
    down_time:number;
    share_img:string;
    share_title:string;
    service_img:string;
    service_title:string;
    use_gold:number;
    ad_show:number;
    moregame:any[];
    leftMoreGame:any[];
    rightMoreGame:any[];
    rank_list:RankItem[];
    share_long_time:any[];
    share_sys:any[];
    share_lt_time_title:any[];
    adunit:{
        banner:string;
        chaping:string;
        video:string;
    };
    close_service:number;
    hook:number;
    color1:string;
    color2:string;
    rewards:{
        open:number;
        unit:string;
        max_unit:number;
        img:string;
        mgs:string;
    };
    yf_show:number;
    yf_show_image:string;
}

export interface RankInfo{
    rankNameImg: string;
    money: number;
    rankName: string;
    rank: number;
    rankImg: string;
    willTitle: string
}