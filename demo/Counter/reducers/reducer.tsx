import {combineReducers} from "redux";
import {CHANGE_COUNT,UNDO_COUNT,REDO_COUNT,Action} from "../action/Action";
//noinspection TypeScriptCheckImport
import undoable,{includeAction} from "redux-undo";

type stateType = {
    countNumber:number;
    name:string;
    age:number;
}

let initState:stateType = {
    countNumber:0,
    name:"arvin",
    age:23
};

const countReducer = (state:stateType = initState,action:Action)=>{
    const name = action.type == CHANGE_COUNT?"yanghao":"";
    switch (action.type){
        case CHANGE_COUNT : return Object.assign({},state,{
            countNumber:state.countNumber + action.counter,
            name:name,
            age:state.age + action.counter
        });break;
        default : return state;
    }
};

const rootReducer = combineReducers({
    countReducer:undoable(countReducer,{
        filter:includeAction([CHANGE_COUNT]),
        undoType:UNDO_COUNT,
        redoType:REDO_COUNT,
        debug:true
    })
})

export default rootReducer;
