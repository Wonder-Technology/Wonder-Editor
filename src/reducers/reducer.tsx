import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import {ajax} from "rxjs/observable/dom/ajax";
import {REQUEST, receivePosts, RECEIVE} from "../action/Action";

export const postsEpic = action$ =>(
        action$.ofType(REQUEST)
            .delay(3000)
            .mergeMap(action => {
                return ajax.getJSON(action.url)
                        .map(response => receivePosts(response))
            })
    );
export const rootReducer = (state = {loaded:false},action) => {
    switch (action.type){
        case RECEIVE : return Object.assign({},state,action.response,{loaded:true});
        default : return state;
    }
}