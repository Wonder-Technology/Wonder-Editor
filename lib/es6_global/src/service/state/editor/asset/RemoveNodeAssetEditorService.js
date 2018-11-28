

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

function removeFolderNodeEditorData(nodeId, editorState) {
  return FolderNodeMapAssetEditorService$WonderEditor.setFolderNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInMap, nodeId, SparseMapService$WonderEditor.copy(FolderNodeMapAssetEditorService$WonderEditor.getFolderNodeMap(editorState))), editorState);
}

function removeWDBNodeEditorData(nodeId, editorState) {
  return WDBNodeMapAssetEditorService$WonderEditor.setWDBNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInMap, nodeId, SparseMapService$WonderEditor.copy(WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(editorState))), editorState);
}

function removeMaterialNodeEditorData(nodeId, editorState) {
  var match = MaterialNodeMapAssetEditorService$WonderEditor.unsafeGetResult(nodeId, editorState);
  return MaterialNodeIdMapAssetEditorService$WonderEditor.remove(match[/* materialComponent */2], MaterialNodeMapAssetEditorService$WonderEditor.remove(nodeId, editorState));
}

function removeTextureNodeEditorData(nodeId, editorState) {
  var match = SparseMapService$WonderCommonlib.unsafeGet(nodeId, TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState));
  var image = match[/* image */1];
  var editorState$1 = TextureNodeMapAssetEditorService$WonderEditor.setTextureNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInMap, nodeId, SparseMapService$WonderEditor.copy(TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(editorState))), editorState);
  var match$1 = TextureNodeMapAssetEditorService$WonderEditor.doesAnyTextureUseImage(image, editorState$1);
  if (match$1) {
    return editorState$1;
  } else {
    return ImageNodeMapAssetEditorService$WonderEditor.setImageNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInMap, image, ImageNodeMapAssetEditorService$WonderEditor.getImageNodeMap(editorState$1).slice()), editorState$1);
  }
}

function deepDisposeAssetTreeRoot(removedAssetIdArr, editorState) {
  return CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(CurrentNodeParentIdAssetEditorService$WonderEditor.clearCurrentNodeParentId(TreeRootAssetEditorService$WonderEditor.clearAssetTreeRoot(RemovedAssetIdArrayAssetEditorService$WonderEditor.setRemovedAssetIdArray(RemovedAssetIdArrayAssetEditorService$WonderEditor.getRemovedAssetIdArray(editorState).concat(removedAssetIdArr), editorState))));
}

export {
  removeFolderNodeEditorData ,
  removeWDBNodeEditorData ,
  removeMaterialNodeEditorData ,
  removeTextureNodeEditorData ,
  deepDisposeAssetTreeRoot ,
  
}
/* DomHelper-WonderEditor Not a pure module */
