import {CHANGESCENEDATA} from "../action/SceneTreeAction";

export default function sceneTree(state:any = [], action){
    switch (action.type){
        case CHANGESCENEDATA: return state = action.data;
        default : return state;
    }
};
