import {FETCH_USER, fetchUserFulfilled, FETCH_USER_FULFILLED} from "../action/Action";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import {ajax} from "rxjs/observable/dom/ajax";

export const fetchUserEpic = action$ =>(
        action$.ofType(FETCH_USER)
            .mergeMap(action => {
                return ajax.getJSON(`https://api.github.com/users/${action.payload}`)
                        .map(response => fetchUserFulfilled(response))
            })
    );
export const users = (state = {},action) => {
    switch (action.type){
        case FETCH_USER_FULFILLED : return {...state,[action.payload.login]:action.payload};
        default : return state;
    }
}