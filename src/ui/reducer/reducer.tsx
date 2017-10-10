import { combineReducers } from "redux";
import getSceneTreeData from "../../editor/mainEditor/component/sceneTree/ui/reducer/SceneTreeReducer";
import getAssetFiles from "../../editor/mainEditor/component/asset/ui/reducer/AssetReducer";
import changeEditorState from "../../editor/mainEditor/ui/reducer/MainReducer";

export const rootReducer = combineReducers({
    sceneTreeData:getSceneTreeData,
    assetFiles:getAssetFiles,
    editorState:changeEditorState
});

