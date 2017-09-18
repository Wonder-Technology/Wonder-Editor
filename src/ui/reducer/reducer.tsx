import { combineReducers } from "redux";
import getSceneTreeData from "../../editor/mainEditor/component/sceneTree/ui/reducer/SceneTreeReducer";

export const rootReducer = combineReducers({
    sceneTreeData: getSceneTreeData
});

