

import * as Caml_option from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/FolderNodeMapAssetEditorService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/MaterialNodeMapAssetEditorService.js";
import * as IterateAssetTreeAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/IterateAssetTreeAssetEditorService.js";

function getAssetTreeRootName(param) {
  return "Assets";
}

function getNewFolderName(param) {
  return "New Folder";
}

function getNoNameFolderName(param) {
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
  return MaterialNodeMapAssetEditorService$WonderEditor.setResult(nodeId, MaterialNodeMapAssetEditorService$WonderEditor.buildMaterialNodeResult(/* LightMaterial */1, material, Caml_option.some(parentFolderNodeId), /* () */0), editorState);
}

function addTextureIntoNodeMap(nodeId, parentFolderNodeId, texture, imageNodeId, editorState) {
  return TextureNodeMapAssetEditorService$WonderEditor.setResult(nodeId, TextureNodeMapAssetEditorService$WonderEditor.buildTextureNodeResult(texture, imageNodeId, Caml_option.some(parentFolderNodeId), /* () */0), editorState);
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
