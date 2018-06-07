

import * as SceneEditorService$WonderEditor from "./SceneEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "./asset/AssetCurrentNodeIdEditorService.js";

function clearCurrentNode(editorState) {
  return SceneEditorService$WonderEditor.clearCurrentSceneTreeNode(AssetCurrentNodeIdEditorService$WonderEditor.clearCurrentNodeId(editorState));
}

export {
  clearCurrentNode ,
  
}
/* SceneEditorService-WonderEditor Not a pure module */
