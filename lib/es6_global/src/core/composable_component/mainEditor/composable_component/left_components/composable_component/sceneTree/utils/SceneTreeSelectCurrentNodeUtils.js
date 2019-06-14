

import * as SceneTreeEditorService$WonderEditor from "../../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

function clearCurrentData(editorState) {
  return SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode(CurrentSelectSourceEditorService$WonderEditor.clearCurrentSelectSource(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(editorState)));
}

export {
  clearCurrentData ,
  
}
/* SceneTreeEditorService-WonderEditor Not a pure module */
