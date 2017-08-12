export const REQUEST:string = "REQUEST";
export const RECEIVE:string = "RECEIVE";
export const POSITIONX:string = "POSITIONX";
export const POSITIONY:string = "POSITIONY";
export const POSITIONZ:string = "POSITIONZ";
export const ANGLE:string = "ANGLE";
export const GAMEOBJECT:string = "GAMEOBJECT";
export const RESET:string = "RESET";
export const CHANGECOLOR:string = "CHANGECOLOR";

export type ActionType = {
    requestPosts:Function;
    receivePost:Function;
    positionX:Function;
    positionY:Function;
    positionZ:Function;
    angle:Function;
    GameObject:Function;
    reset:Function;
    changeColor:Function;
}

export const reset = () =>({
    type:RESET
});

export const changeColor = color =>({
    type:CHANGECOLOR,
    color
});

export const GameObject = objectType =>({
    type:GAMEOBJECT,
    objectType
})

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

export const angle = num => ({
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
