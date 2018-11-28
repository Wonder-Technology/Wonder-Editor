

import * as IndexAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/IndexAssetEditorService.js";
import * as RemovedAssetIdArrayAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/RemovedAssetIdArrayAssetEditorService.js";

function generateAssetId(editorState) {
  var match = RemovedAssetIdArrayAssetEditorService$WonderEditor.getFirstIdIfHasUsableAssetId(editorState);
  var match$1 = match[0];
  if (match$1 !== undefined) {
    return /* tuple */[
            match[1],
            match$1
          ];
  } else {
    var editorState$1 = IndexAssetEditorService$WonderEditor.increaseIndex(match[1]);
    return /* tuple */[
            editorState$1,
            IndexAssetEditorService$WonderEditor.getIndex(editorState$1)
          ];
  }
}

export {
  generateAssetId ,
  
}
/* RemovedAssetIdArrayAssetEditorService-WonderEditor Not a pure module */
