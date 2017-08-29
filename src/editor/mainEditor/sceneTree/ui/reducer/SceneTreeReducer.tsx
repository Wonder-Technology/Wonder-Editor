import {CHANGESCENETREE} from "../action/SceneTreeAction";

export default function sceneTree(state:any = [], action){
    switch (action.type){
        case CHANGESCENETREE: return state = action.data;
        default : return state;
    }
};
