import {LineStringGeometryBatch} from "ol/render/webgl/MixedGeometryBatch";



export interface AlarmData2 {
    id:number;
    warnmsg_typr_id:number;
    warnlevel:string;
    warn_time:string;
    cenlon:string;
    cenlat:string;
}

export interface WarnMsgCor{
    cenlon:string;
    cenlat:string;
}


/*export interface CameraList{
    id:number;
    lon:string;
    lat:string;
    detailed_address:string;
    is_online:number;
    warn_amount:number;
}*/