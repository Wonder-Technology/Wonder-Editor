import { CHANGE_SCENE_DATA } from "../action/SceneTreeAction";

export default function sceneTree(state: any = [], action) {
    switch (action.type) {
        case CHANGE_SCENE_DATA: return state = action.data;
        default: return state;
    }
};
