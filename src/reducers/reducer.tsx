import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import {ajax} from "rxjs/observable/dom/ajax";
import {
    REQUEST, receivePosts, RECEIVE, POSITIONX, POSITIONY, POSITIONZ, ANGLE, GAMEOBJECT,
    RESET, CHANGECOLOR, SHOWMOBILE
} from "../action/Action";
import {combineReducers} from "redux";

export const postsEpic = action$ => (
        action$.ofType(REQUEST)
            .mergeMap(action => {
                return ajax.getJSON(action.url)
                        .map(response => receivePosts(response))
            })
    );

const page = (state = {
    width:null,
    height:null
},action) => {
    switch (action.type) {
        case SHOWMOBILE : return Object.assign({},state,{width:action.style.width,height:action.style.height});
        default : return state;
    }
};

const gameObject = (state = {
    color:null,
    object:null
},action) => {
    switch (action.type){
        case GAMEOBJECT : return Object.assign({},state,{object:action.objectType});
        case CHANGECOLOR : return Object.assign({},state,{color:action.color});
        case RESET:return null;
        default : return state;
    }
};

const position = (state = {x:0,y:0,z:0},action)=>{
    switch (action.type){
        case POSITIONX : return Object.assign({},state,{x:action.num,y:0,z:0});
        case POSITIONY : return Object.assign({},state,{y:action.num,x:0,z:0});
        case POSITIONZ : return Object.assign({},state,{z:action.num,x:0,y:0});
        case RESET:return null;
        default : return state;
    }
};

const angle = (state = 0,action)=>{
    switch (action.type){
        case ANGLE:return state+action.num;
        case RESET:return null;
        default:return state;
    }
};

export const rootReducer = combineReducers({
    position,
    angle,
    gameObject,
    page
});

