export const PING:string = "PING";
export const PONG:string = "PONG";

export const ping = ()=>{
    return {
        type:PING
    }
}
