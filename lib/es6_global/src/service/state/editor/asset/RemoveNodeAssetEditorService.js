

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as DomHelper$WonderEditor from "../../../../core/external/DomHelper.js";
import * as SparseMapService$WonderEditor from "../../../atom/SparseMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TreeRootAssetEditorService$WonderEditor from "./TreeRootAssetEditorService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "./WDBNodeMapAssetEditorService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "./ImageNodeMapAssetEditorService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "./FolderNodeMapAssetEditorService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "./TextureNodeMapAssetEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "./CurrentNodeDataAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "./MaterialNodeMapAssetEditorService.js";
import * as MaterialNodeIdMapAssetEditorService$WonderEditor from "./MaterialNodeIdMapAssetEditorService.js";
import * as CurrentNodeParentIdAssetEditorService$WonderEditor from "./CurrentNodeParentIdAssetEditorService.js";
import * as RemovedAssetIdArrayAssetEditorService$WonderEditor from "./RemovedAssetIdArrayAssetEditorService.js";

function _removeNodeEditorData(nodeId, param, editorState) {
  return Curry._2(param[1], Curry._2(DomHelper$WonderEditor.deleteKeyInMap, nodeId, SparseMapService$WonderEditor.copy(Curry._1(param[0], editorState))), editorState);
}

function removeFolderNodeEditorData(nodeId, editorState) {
  return _removeNodeEditorData(nodeId, /* tuple */[
              FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap,
              FolderNodeMapAssetEditorService$WonderEditor.setFolderNodeMap
            ], editorState);
}

function removeWDBNodeEditorData(nodeId, editorState) {
  return _removeNodeEditorData(nodeId, /* tuple */[
              WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap,
              WDBNodeMapAssetEditorService$WonderEditor.setWDBNodeMap
            ], editorState);
}

function removeMaterialNodeEditorData(nodeId, editorState) {
  var match = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(nodeId, editorState);
  return MaterialNodeIdMapAssetEditorService$WonderEditor.remove(match[/* materialComponent */2], MaterialNodeMapAssetEditorService$WonderEditor.remove(nodeId, editorState));
}

function removeTextureNodeEditorData(nodeId, editorState) {
  var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState));
  var image = match[/* image */1];
  _removeNodeEditorData(nodeId, /* tuple */[
        TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap,
        TextureNodeMapAssetEditorService$WonderEditor.setTextureNodeMap
      ], editorState);
  var match$1 = TextureNodeMapAssetEditorService$WonderEditor.doesAnyTextureUseImage(image, editorState);
  if (match$1) {
    return editorState;
  } else {
    return ImageNodeMapAssetEditorService$WonderEditor.setImageNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInMap, image, ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState).slice()), editorState);
  }
}

function deepDisposeAssetTreeRoot(removedAssetIdArr, editorState) {
  return CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(CurrentNodeParentIdAssetEditorService$WonderEditor.clearCurrentNodeParentId(TreeRootAssetEditorService$WonderEditor.clearAssetTreeRoot(RemovedAssetIdArrayAssetEditorService$WonderEditor.setRemovedAssetIdArray(RemovedAssetIdArrayAssetEditorService$WonderEditor.getRemovedAssetIdArray(editorState).concat(removedAssetIdArr), editorState))));
}

export {
  _removeNodeEditorData ,
  removeFolderNodeEditorData ,
  removeWDBNodeEditorData ,
  removeMaterialNodeEditorData ,
  removeTextureNodeEditorData ,
  deepDisposeAssetTreeRoot ,
  
}
/* DomHelper-WonderEditor Not a pure module */
