

import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetTextureNodeMapEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";

function getCurrentNodeId() {
  return StateLogicService$WonderEditor.getEditorState(AssetCurrentNodeDataEditorService$WonderEditor.unsafeGetCurrentNodeData)[/* currentNodeId */0];
}

function getTextureIndexFromCurrentNodeId() {
  return SparseMapService$WonderCommonlib.unsafeGet(getCurrentNodeId(/* () */0), AssetTextureNodeMapEditorService$WonderEditor.getTextureNodeMap(StateEditorService$WonderEditor.getState(/* () */0)))[/* textureIndex */0];
}

function getUploadedTextureIndex(assetTreeDomRecord) {
  return assetTreeDomRecord[/* firstLayer */1][/* textureData */3][/* lastIndex */1] + 1 | 0;
}

function getUploadedeTextureNodeDomIndex(assetTreeDomRecord) {
  return assetTreeDomRecord[/* firstLayer */1][/* length */0] + 1 | 0;
}

function getUploadedeJsonNodeDomIndex(assetTreeDomRecord) {
  return assetTreeDomRecord[/* firstLayer */1][/* length */0] + 2 | 0;
}

function getUploadedeWdbNodeDomIndex(assetTreeDomRecord) {
  return assetTreeDomRecord[/* firstLayer */1][/* length */0] + 1 | 0;
}

function getFirstFolderDomIndexForAssetChildren(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* firstLayer */1][/* folderDomIndexArr */1]) - 1 | 0;
}

function getFirstFolderDomIndexForAssetTree(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getSecondFolderDomIndexForAssetChildren(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getNth(1, assetTreeDomRecord[/* firstLayer */1][/* folderDomIndexArr */1]) - 1 | 0;
}

function getSecondFolderDomIndexForAssetTree(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getNth(1, assetTreeDomRecord[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getFirstTextureDomIndex(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* firstLayer */1][/* textureData */3][/* domIndexArr */0]) - 1 | 0;
}

function getSecondTextureDomIndex(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getNth(1, assetTreeDomRecord[/* firstLayer */1][/* textureData */3][/* domIndexArr */0]) - 1 | 0;
}

function getFirstJsonDomIndex(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* firstLayer */1][/* jsonDomIndexArr */2]) - 1 | 0;
}

function getRootFolderNodeId(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* treeNodeIdData */2][/* folderNodeIdArr */0]);
}

function getFirstFolderNodeId(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getNth(1, assetTreeDomRecord[/* treeNodeIdData */2][/* folderNodeIdArr */0]);
}

function getSecondFolderNodeId(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getNth(2, assetTreeDomRecord[/* treeNodeIdData */2][/* folderNodeIdArr */0]);
}

function getFirstTextureNodeId(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* treeNodeIdData */2][/* textureNodeIdArr */2]);
}

function getSecondTextureNodeId(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getNth(1, assetTreeDomRecord[/* treeNodeIdData */2][/* textureNodeIdArr */2]);
}

function getFirstJsonNodeId(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* treeNodeIdData */2][/* jsonNodeIdArr */1]);
}

var OperateTwoLayer = /* module */[
  /* getUploadedTextureIndex */getUploadedTextureIndex,
  /* getUploadedeTextureNodeDomIndex */getUploadedeTextureNodeDomIndex,
  /* getUploadedeJsonNodeDomIndex */getUploadedeJsonNodeDomIndex,
  /* getUploadedeWdbNodeDomIndex */getUploadedeWdbNodeDomIndex,
  /* getFirstFolderDomIndexForAssetChildren */getFirstFolderDomIndexForAssetChildren,
  /* getFirstFolderDomIndexForAssetTree */getFirstFolderDomIndexForAssetTree,
  /* getSecondFolderDomIndexForAssetChildren */getSecondFolderDomIndexForAssetChildren,
  /* getSecondFolderDomIndexForAssetTree */getSecondFolderDomIndexForAssetTree,
  /* getFirstTextureDomIndex */getFirstTextureDomIndex,
  /* getSecondTextureDomIndex */getSecondTextureDomIndex,
  /* getFirstJsonDomIndex */getFirstJsonDomIndex,
  /* getRootFolderNodeId */getRootFolderNodeId,
  /* getFirstFolderNodeId */getFirstFolderNodeId,
  /* getSecondFolderNodeId */getSecondFolderNodeId,
  /* getFirstTextureNodeId */getFirstTextureNodeId,
  /* getSecondTextureNodeId */getSecondTextureNodeId,
  /* getFirstJsonNodeId */getFirstJsonNodeId
];

function getFirstLayserFirstFolderDomIndex(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getFirstLayserSecondFolderDomIndex(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getNth(1, assetTreeDomRecord[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getSecondLayserFirstFolderDomIndexForAssetTree(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* secondLayer */2][/* folderDomIndexArr */2]);
}

function getSecondLayserFirstFolderDomIndexForAssetChildren(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* secondLayer */2][/* folderDomIndexArr */2]) - 1 | 0;
}

function getSecondLayserSecondFolderDomIndexForAssetTree(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getNth(1, assetTreeDomRecord[/* secondLayer */2][/* folderDomIndexArr */2]);
}

function getSecondLayserSecondTextureDomIndex(assetTreeDomRecord) {
  return ArrayService$WonderEditor.getFirst(assetTreeDomRecord[/* secondLayer */2][/* textureData */4][/* domIndexArr */0]) - 1 | 0;
}

var OperateThreeLayer = /* module */[
  /* getFirstLayserFirstFolderDomIndex */getFirstLayserFirstFolderDomIndex,
  /* getFirstLayserSecondFolderDomIndex */getFirstLayserSecondFolderDomIndex,
  /* getSecondLayserFirstFolderDomIndexForAssetTree */getSecondLayserFirstFolderDomIndexForAssetTree,
  /* getSecondLayserFirstFolderDomIndexForAssetChildren */getSecondLayserFirstFolderDomIndexForAssetChildren,
  /* getSecondLayserSecondFolderDomIndexForAssetTree */getSecondLayserSecondFolderDomIndexForAssetTree,
  /* getSecondLayserSecondTextureDomIndex */getSecondLayserSecondTextureDomIndex
];

export {
  getCurrentNodeId ,
  getTextureIndexFromCurrentNodeId ,
  OperateTwoLayer ,
  OperateThreeLayer ,
  
}
/* ArrayService-WonderEditor Not a pure module */
