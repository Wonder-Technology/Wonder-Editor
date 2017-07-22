import {combineReducers} from "redux";
import {ADD,COMPLETE,FILTER,visibilyFilter} from "../action/Action";

export type todoType = {
    text:string;
    completed:boolean;
}

const {SHOW_ALL} = visibilyFilter;

function visFilter(state:string = SHOW_ALL,action){
    switch (action.type){
        case FILTER: return action.filter;
        default : return state;
    }
};

function todos(state = [{
    text: "fck",
    completed: false
}],action):todoType[]{
    switch (action.type){
        case ADD:return [ ...state,{
            text:action.text,
            completed:false
        }];break;
        case COMPLETE : return [
            ...state.slice(0,action.index),
            Object.assign({},state[action.index],{
                completed:true
            }),
            ...state.slice(action.index+1)
        ];
        default : return state;
    }
}

const rootReducer = combineReducers({
    visFilter,
    todos
});

export default rootReducer;
