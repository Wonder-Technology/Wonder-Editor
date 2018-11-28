

import * as TreeRootAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/FolderNodeMapAssetEditorService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";
import * as IterateAssetTreeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/IterateAssetTreeAssetEditorService.js";

function getAssetTreeRootName() {
  return "Assets";
}

function getNewFolderName() {
  return "New Folder";
}

function getNoNameFolderName() {
  return "NoName Folder";
}

function getNoNameFolderNameByNodeId(nodeId, editorState) {
  var match = nodeId === TreeRootAssetEditorService$WonderEditor.getRootTreeNodeId(editorState);
  if (match) {
    return "Assets";
  } else {
    return "NoName Folder";
  }
}

function addFolderIntoNodeMap(nodeId, parentFolderNodeId, name, param) {
  var editorState = param[0];
  var __x = FolderNodeMapAssetEditorService$WonderEditor.buildFolderNodeResult(parentFolderNodeId, IterateAssetTreeAssetEditorService$WonderEditor.getUniqueTreeNodeName(name, /* Folder */0, parentFolderNodeId, /* tuple */[
            editorState,
            param[1]
          ]));
  return FolderNodeMapAssetEditorService$WonderEditor.setResult(nodeId, __x, editorState);
}

function addMaterialIntoNodeMap(nodeId, parentFolderNodeId, material, editorState) {
  return MaterialNodeMapAssetEditorService$WonderEditor.setResult(nodeId, MaterialNodeMapAssetEditorService$WonderEditor.buildMaterialNodeResult(parentFolderNodeId, /* LightMaterial */1, material), editorState);
}

function addTextureIntoNodeMap(nodeId, parentFolderNodeId, texture, imageNodeId, editorState) {
  return TextureNodeMapAssetEditorService$WonderEditor.setResult(nodeId, TextureNodeMapAssetEditorService$WonderEditor.buildTextureNodeResult(texture, parentFolderNodeId, imageNodeId), editorState);
}

export {
  getAssetTreeRootName ,
  getNewFolderName ,
  getNoNameFolderName ,
  getNoNameFolderNameByNodeId ,
  addFolderIntoNodeMap ,
  addMaterialIntoNodeMap ,
  addTextureIntoNodeMap ,
  
}
/* TreeRootAssetEditorService-WonderEditor Not a pure module */
