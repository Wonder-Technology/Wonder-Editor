

import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as IndexAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/IndexAssetEditorService.js";

function getNewAssetId($staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return IndexAssetEditorService$WonderEditor.getNodeIndex(editorState) + 1 | 0;
}

export {
  getNewAssetId ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
