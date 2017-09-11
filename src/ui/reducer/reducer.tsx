import { combineReducers } from "redux";
import getSceneTreeData from "../../editor/mainEditor/sceneTree/ui/reducer/SceneTreeReducer";
import getAssetFiles from "../../editor/mainEditor/asset/ui/reducer/AssetReducer";

export const rootReducer = combineReducers({
    sceneTreeData:getSceneTreeData,
    assetFiles:getAssetFiles
});

