

import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/CurrentNodeDataAssetEditorService.js";

function getTextureNode(nodeId) {
  return SparseMapService$WonderCommonlib.unsafeGet(nodeId, TextureNodeMapAssetEditorService$WonderEditor.getTextureNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
}

function getCurrentNodeId() {
  return StateLogicService$WonderEditor.getEditorState(CurrentNodeDataAssetEditorService$WonderEditor.unsafeGetCurrentNodeData)[/* currentNodeId */0];
}

function getTextureComponentFromNodeId(nodeId) {
  return getTextureNode(nodeId)[/* textureComponent */0];
}

function getTextureComponentFromCurrentNodeId() {
  return getTextureComponentFromNodeId(getCurrentNodeId(/* () */0));
}

function setCurrentNodeData(nodeId, nodeType) {
  var partial_arg = /* record */[
    /* currentNodeId */nodeId,
    /* nodeType */nodeType
  ];
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return CurrentNodeDataAssetEditorService$WonderEditor.setCurrentNodeData(partial_arg, param);
              }));
}

function setCurrentTextureNodeData(nodeId) {
  return setCurrentNodeData(nodeId, /* Texture */1);
}

function getUploadedTextureIndex(assetTreeData) {
  return assetTreeData[/* firstLayer */1][/* textureData */3][/* lastIndex */1] + 1 | 0;
}

function getAddedFirstFolderNodeDomIndexForAssetTree(assetTreeData) {
  return assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1].length + 1 | 0;
}

function getAddedSecondNodeDomIndex(assetTreeData) {
  return assetTreeData[/* firstLayer */1][/* length */0] + 2 | 0;
}

function getAddedFirstNodeDomIndex(assetTreeData) {
  return assetTreeData[/* firstLayer */1][/* length */0] + 1 | 0;
}

function getFirstFolderDomIndexForAssetChildren(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]) - 1 | 0;
}

function getFirstFolderDomIndexForAssetTree(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getSecondFolderDomIndexForAssetChildren(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]) - 1 | 0;
}

function getSecondFolderDomIndexForAssetTree(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getFirstTextureDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* textureData */3][/* domIndexArr */0]) - 1 | 0;
}

function getSecondTextureDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* firstLayer */1][/* textureData */3][/* domIndexArr */0]) - 1 | 0;
}

function getFirstJsonDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* jsonDomIndexArr */2]) - 1 | 0;
}

function getRootFolderNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* treeNodeIdData */2][/* folderNodeIdArr */0]);
}

function getFirstFolderNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* treeNodeIdData */2][/* folderNodeIdArr */0]);
}

function getSecondFolderNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(2, assetTreeData[/* treeNodeIdData */2][/* folderNodeIdArr */0]);
}

function getFirstTextureNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* treeNodeIdData */2][/* textureNodeIdArr */2]);
}

function getSecondTextureNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* treeNodeIdData */2][/* textureNodeIdArr */2]);
}

function getFirstJsonNodeId(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* treeNodeIdData */2][/* jsonNodeIdArr */1]);
}

var OperateTwoLayer = /* module */[
  /* getUploadedTextureIndex */getUploadedTextureIndex,
  /* getAddedFirstFolderNodeDomIndexForAssetTree */getAddedFirstFolderNodeDomIndexForAssetTree,
  /* getAddedSecondNodeDomIndex */getAddedSecondNodeDomIndex,
  /* getAddedFirstNodeDomIndex */getAddedFirstNodeDomIndex,
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

function getFirstLayserFirstFolderDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getFirstLayserSecondFolderDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* firstLayer */1][/* folderDomIndexArr */1]);
}

function getSecondLayserFirstFolderDomIndexForAssetTree(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* secondLayer */2][/* folderDomIndexArr */2]);
}

function getSecondLayserFirstFolderDomIndexForAssetChildren(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* secondLayer */2][/* folderDomIndexArr */2]) - 1 | 0;
}

function getSecondLayserSecondFolderDomIndexForAssetTree(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetNth(1, assetTreeData[/* secondLayer */2][/* folderDomIndexArr */2]);
}

function getSecondLayserSecondTextureDomIndex(assetTreeData) {
  return ArrayService$WonderEditor.unsafeGetFirst(assetTreeData[/* secondLayer */2][/* textureData */4][/* domIndexArr */0]) - 1 | 0;
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
  getTextureNode ,
  getCurrentNodeId ,
  getTextureComponentFromNodeId ,
  getTextureComponentFromCurrentNodeId ,
  setCurrentNodeData ,
  setCurrentTextureNodeData ,
  OperateTwoLayer ,
  OperateThreeLayer ,
  
}
/* ArrayService-WonderEditor Not a pure module */
