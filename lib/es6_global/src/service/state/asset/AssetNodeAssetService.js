

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
  return /* record */[/* name */_getTreeNodeName(index, state)];
}

function renameFolderNodeResult(name, _) {
  return /* record */[/* name */name];
}

function buildJsonNodeResult(fileResult) {
  return /* record */[
          /* name */fileResult[/* name */0],
          /* jsonResult */fileResult[/* result */2]
        ];
}

function renameJsonNodeResult(name, jsonNodeResult) {
  return /* record */[
          /* name */name,
          /* jsonResult */jsonNodeResult[/* jsonResult */1]
        ];
}

function buildTextureNodeResult(textureIndex) {
  return /* record */[/* textureIndex */textureIndex];
}

function buildAssetTreeNodeByIndex(index, type_) {
  return /* record */[
          /* id */index,
          /* children : array */[],
          /* type_ */type_
        ];
}

export {
  _getTreeNodeName ,
  buildFolderResult ,
  renameFolderNodeResult ,
  buildJsonNodeResult ,
  renameJsonNodeResult ,
  buildTextureNodeResult ,
  buildAssetTreeNodeByIndex ,
  
}
/* AssetTreeRootAssetService-WonderEditor Not a pure module */
