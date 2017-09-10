import { combineReducers } from "redux";
import sceneTree from "../../editor/mainEditor/sceneTree/ui/reducer/SceneTreeReducer";
import assetFiles from "../../editor/mainEditor/asset/ui/reducer/AssetReducer";

export const rootReducer = combineReducers({
    sceneTree,
    assetFiles
});

