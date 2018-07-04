

import * as AssetTreeRootAssetService$WonderEditor from "./AssetTreeRootAssetService.js";

function _getTreeNodeName(index, state) {
  var match = index === AssetTreeRootAssetService$WonderEditor.getRootTreeNodeId(state);
  if (match) {
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
  _getTreeNodeName ,
  buildFolderResult ,
  buildAssetTreeNodeByIndex ,
  
}
/* AssetTreeRootAssetService-WonderEditor Not a pure module */
