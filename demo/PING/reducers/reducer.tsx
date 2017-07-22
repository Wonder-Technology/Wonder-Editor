import {PING, PONG} from "../action/Action";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
export const pingEpic = action$ => {
    return action$.ofType(PING).delay(2000).mapTo({
        type: PONG
    });
}

export const pingReducer = (state = {isPinging:false},action)=>{
    switch (action.type){
        case PING : return {isPinging:true};
        case PONG : return {isPinging:false};
        default : return state;
    }
};

