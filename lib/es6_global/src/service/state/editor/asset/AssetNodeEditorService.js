

import * as AssetTreeRootEditorService$WonderEditor from "./AssetTreeRootEditorService.js";

function _getTreeNodeName(index, state) {
  var match = index === AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(state);
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

function buildWdbNodeResult(name, wdbGameObject, wdbArrayBuffer) {
  return /* record */[
          /* name */name,
          /* wdbArrayBuffer */wdbArrayBuffer,
          /* wdbGameObject */wdbGameObject
        ];
}

function renameWdbNodeResult(name, wdbNodeResult) {
  return /* record */[
          /* name */name,
          /* wdbArrayBuffer */wdbNodeResult[/* wdbArrayBuffer */1],
          /* wdbGameObject */wdbNodeResult[/* wdbGameObject */2]
        ];
}

function buildMaterialNodeResult(name, type_, materialComponent) {
  return /* record */[
          /* name */name,
          /* type_ */type_,
          /* materialComponent */materialComponent
        ];
}

function renameMaterialNodeResult(name, materialNodeResult) {
  return /* record */[
          /* name */name,
          /* type_ */materialNodeResult[/* type_ */1],
          /* materialComponent */materialNodeResult[/* materialComponent */2]
        ];
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
  buildWdbNodeResult ,
  renameWdbNodeResult ,
  buildMaterialNodeResult ,
  renameMaterialNodeResult ,
  buildAssetTreeNodeByIndex ,
  
}
/* AssetTreeRootEditorService-WonderEditor Not a pure module */
