'use strict';

import * as AssetTreeRootEditorService$WonderEditor from "./AssetTreeRootEditorService.js";

function _getTreeNodeName(index, state) {
  var match = +(index === AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(state));
  if (match !== 0) {
    return "Asset";
  } else {
    return "newFolder";
  }
}

function buildFolderResult(index, state) {
  return /* record */[
          /* name */_getTreeNodeName(index, state),
          /* type_ : Folder */0,
          /* result : None */0
        ];
}

function buildAssetTreeNodeByIndex(index) {
  return /* record */[
          /* id */index,
          /* children : array */[]
        ];
}

export {
  _getTreeNodeName          ,
  buildFolderResult         ,
  buildAssetTreeNodeByIndex ,
  
}
/* AssetTreeRootEditorService-WonderEditor Not a pure module */
