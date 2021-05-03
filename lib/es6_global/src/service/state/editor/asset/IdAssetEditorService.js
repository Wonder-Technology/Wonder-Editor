

import * as IdAssetService$WonderEditor from "../../../record/editor/asset/IdAssetService.js";
import * as IndexAssetEditorService$WonderEditor from "./IndexAssetEditorService.js";

function generateNodeId(editorState) {
  var match = IdAssetService$WonderEditor.generateNodeId(IndexAssetEditorService$WonderEditor.getNodeIndex(editorState));
  return /* tuple */[
          IndexAssetEditorService$WonderEditor.setNodeIndex(match[0], editorState),
          match[1]
        ];
}

export {
  generateNodeId ,
  
}
/* No side effect */
