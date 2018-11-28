

import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as IndexAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/IndexAssetEditorService.js";
import * as RemovedAssetIdArrayAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/RemovedAssetIdArrayAssetEditorService.js";

function getFirstIdIfHasUsableAssetId(editorState) {
  var match = RemovedAssetIdArrayAssetEditorService$WonderEditor.hasUsableAssetId(editorState);
  if (match) {
    var removedAssetIdArr = RemovedAssetIdArrayAssetEditorService$WonderEditor.getRemovedAssetIdArray(editorState);
    return removedAssetIdArr[0];
  }
  
}

function getNewAssetId($staropt$star, _) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  var match = getFirstIdIfHasUsableAssetId(editorState);
  if (match !== undefined) {
    return match;
  } else {
    return IndexAssetEditorService$WonderEditor.getIndex(editorState) + 1 | 0;
  }
}

export {
  getFirstIdIfHasUsableAssetId ,
  getNewAssetId ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
