import { CHANGE_SCENE_TREE_DATA } from "../action/SceneTreeAction";

export default function getSceneTreeData(state: any = [], action) {
    switch (action.type) {
        case CHANGE_SCENE_TREE_DATA:
            return state = action.data;
        default:
            return state;
    }
};
