export const REQUEST:string = "REQUEST";
export const RECEIVE:string = "RECEIVE";

export type ActionType = {
    requestPosts:Function;
    receivePost:Function;
}

export const requestPosts = url =>({
    type:REQUEST,
    url
});

export const receivePosts = response =>({
    type:RECEIVE,
    response
})
