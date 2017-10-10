import {CHANGE_EDITOR_STATE} from "../action/MainAction";

export default function changeEditorState(state:number = 0, action:{type:string, state:any}) {
    switch (action.type){
        case CHANGE_EDITOR_STATE:
            return _avoidStateNotChange(state);
        default:
            return state;
    }
}

const _avoidStateNotChange = (state:number) => state + 1;
