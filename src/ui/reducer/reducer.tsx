import { combineReducers } from "redux";
import getSceneTreeData from "../../editor/mainEditor/components/sceneTree/ui/reducer/SceneTreeReducer";
import getAssetFiles from "../../editor/mainEditor/components/asset/ui/reducer/AssetReducer";

export const rootReducer = combineReducers({
    sceneTreeData:getSceneTreeData,
    assetFiles:getAssetFiles
});

