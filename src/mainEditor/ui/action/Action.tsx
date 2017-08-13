export const REQUEST:string = "REQUEST";
export const RECEIVE:string = "RECEIVE";
export const POSITIONX:string = "POSITIONX";
export const POSITIONY:string = "POSITIONY";
export const POSITIONZ:string = "POSITIONZ";
export const ANGLE:string = "ANGLE";
export const RESET:string = "RESET";

export type ActionType = {
    requestPosts:Function;
    receivePost:Function;
    positionX:Function;
    positionY:Function;
    positionZ:Function;
    changeAngle:Function;
    reset:Function;
}

export const reset = () =>({
    type:RESET
});

export const positionX = num =>({
    type:POSITIONX,
    num
})

export const positionY = num =>({
    type:POSITIONY,
    num
})

export const positionZ = num =>({
    type:POSITIONZ,
    num
})

export const changeAngle = num => ({
    type:ANGLE,
    num
})

export const requestPosts = url =>({
    type:REQUEST,
    url
});

export const receivePosts = response =>({
    type:RECEIVE,
    response
})
