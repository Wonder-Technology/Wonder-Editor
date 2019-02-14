

import * as RootTreeAssetService$WonderEditor from "../../../record/editor/asset/RootTreeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "./TreeAssetEditorService.js";
import * as IndexAssetEditorService$WonderEditor from "./IndexAssetEditorService.js";

function getRootNode(editorState) {
  return RootTreeAssetService$WonderEditor.getRootNode(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
}

function buildRootNode(_, editorState) {
  var match = RootTreeAssetService$WonderEditor.buildRootNode(RootTreeAssetService$WonderEditor.getAssetTreeRootName(/* () */0), IndexAssetEditorService$WonderEditor.getNodeIndex(editorState));
  return /* tuple */[
          match[0],
          match[1],
          IndexAssetEditorService$WonderEditor.setNodeIndex(match[2], editorState)
        ];
}

export {
  getRootNode ,
  buildRootNode ,
  
}
/* RootTreeAssetService-WonderEditor Not a pure module */
