

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../../service/record/editor/asset/NodeAssetService.js";
import * as IdSelectTreeService$WonderEditor from "../../../../service/record/ui/selectTree/IdSelectTreeService.js";
import * as RootTreeAssetService$WonderEditor from "../../../../service/record/editor/asset/RootTreeAssetService.js";
import * as NodeSelectTreeService$WonderEditor from "../../../../service/record/ui/selectTree/NodeSelectTreeService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../../service/record/editor/asset/IterateTreeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as PathTreeAssetLogicService$WonderEditor from "../../../../service/stateTuple/logic/asset/PathTreeAssetLogicService.js";
import * as RootTreeAssetEditorService$WonderEditor from "../../../../service/state/editor/asset/RootTreeAssetEditorService.js";
import * as ValueNodeSelectTreeService$WonderEditor from "../../../../service/record/ui/selectTree/ValueNodeSelectTreeService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../../service/record/editor/asset/AssetBundleNodeAssetService.js";
import * as FolderNodeSelectTreeService$WonderEditor from "../../../../service/record/ui/selectTree/FolderNodeSelectTreeService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateTreeSelectTreeService$WonderEditor from "../../../../service/record/ui/selectTree/OperateTreeSelectTreeService.js";
import * as ValueNodeSelectTreeUILocalService$WonderEditor from "../../../../service/state/ui/local/selectTree/ValueNodeSelectTreeUILocalService.js";
import * as FolderNodeSelectTreeUILocalService$WonderEditor from "../../../../service/state/ui/local/selectTree/FolderNodeSelectTreeUILocalService.js";

function unsafeGetSelectTreeNodeIdFromFolderTreeMap(assetTreeNode, folderTreeMap) {
  return ImmutableSparseMapService$WonderCommonlib.unsafeGet(NodeAssetService$WonderEditor.getNodeId(assetTreeNode), folderTreeMap);
}

function _setToFolderTreeMap(assetTreeNode, selectTreeNode, folderTreeMap) {
  return ImmutableSparseMapService$WonderCommonlib.set(NodeAssetService$WonderEditor.getNodeId(assetTreeNode), NodeSelectTreeService$WonderEditor.getNodeId(selectTreeNode), folderTreeMap);
}

function handleFoldAssetNode(parentFolderNode, param, param$1, engineState) {
  var folderTreeMap = param[1];
  var newNodeId = IdSelectTreeService$WonderEditor.generateNodeId(param[0]);
  var selectTree = OperateTreeSelectTreeService$WonderEditor.insertNode(ImmutableSparseMapService$WonderCommonlib.unsafeGet(NodeAssetService$WonderEditor.getNodeId(parentFolderNode), folderTreeMap), ValueNodeSelectTreeService$WonderEditor.buildNode(newNodeId, NodeNameAssetLogicService$WonderEditor.getNodeName(param$1[0], engineState), false, param$1[1], param$1[2]), param[2]);
  return /* tuple */[
          newNodeId,
          folderTreeMap,
          selectTree
        ];
}

function handleFoldFolderAssetNode(parentFolderNode, param, nodeId, nodeData, children) {
  var folderTreeMap = param[1];
  var newNodeId = IdSelectTreeService$WonderEditor.generateNodeId(param[0]);
  var newSelectTreeFolderNode = FolderNodeSelectTreeService$WonderEditor.buildNode(newNodeId, FolderNodeAssetService$WonderEditor.getNodeName(nodeData), false, /* array */[], /* () */0);
  var selectTree = OperateTreeSelectTreeService$WonderEditor.insertNode(ImmutableSparseMapService$WonderCommonlib.unsafeGet(NodeAssetService$WonderEditor.getNodeId(parentFolderNode), folderTreeMap), newSelectTreeFolderNode, param[2]);
  return /* tuple */[
          newNodeId,
          _setToFolderTreeMap(FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, children), newSelectTreeFolderNode, folderTreeMap),
          selectTree
        ];
}

function buildInitAccData(editorState) {
  var rootNode = FolderNodeSelectTreeService$WonderEditor.buildNode(0, RootTreeAssetService$WonderEditor.getAssetTreeRootName(/* () */0), false, /* array */[], /* () */0);
  return /* tuple */[
          0,
          _setToFolderTreeMap(RootTreeAssetEditorService$WonderEditor.getRootNode(editorState), rootNode, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)),
          rootNode
        ];
}

function buildSelectTreeForAssetBundle(convertAssetPathToAssetBundlePathFunc, param) {
  var engineState = param[1];
  var editorState = param[0];
  return IterateTreeAssetService$WonderEditor.foldWithParentFolderNodeWithoutRootNode(handleFoldFolderAssetNode, buildInitAccData(editorState), TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), undefined, (function (parentFolderNode, acc, nodeId, nodeData) {
                  return acc;
                }), (function (parentFolderNode, acc, nodeId, nodeData) {
                  return acc;
                }), (function (parentFolderNode, acc, nodeId, nodeData) {
                  return acc;
                }), (function (parentFolderNode, acc, nodeId, nodeData) {
                  return acc;
                }), (function (parentFolderNode, acc, nodeId, nodeData) {
                  return acc;
                }), (function (parentFolderNode, param, nodeId, nodeData) {
                  var assetNode = AssetBundleNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData);
                  var assetNodeData = AssetBundleNodeAssetService$WonderEditor.getNodeData(assetNode);
                  return handleFoldAssetNode(parentFolderNode, /* tuple */[
                              param[0],
                              param[1],
                              param[2]
                            ], /* tuple */[
                              assetNode,
                              "assetBundle",
                              /* record */[
                                /* assetBundle */AssetBundleNodeAssetService$WonderEditor.getAssetBundle(assetNode),
                                /* path */Curry._2(convertAssetPathToAssetBundlePathFunc, assetNodeData, PathTreeAssetLogicService$WonderEditor.getNodePath(assetNode, /* tuple */[
                                          editorState,
                                          engineState
                                        ])),
                                /* type_ */AssetBundleNodeAssetService$WonderEditor.getType(assetNode)
                              ]
                            ], engineState);
                }), undefined, /* () */0)[2];
}

function setSelectForSelectTree(tree, isSelect, node) {
  var _toggle = function (isSelect, node, tree) {
    if (node.tag) {
      return ValueNodeSelectTreeUILocalService$WonderEditor.setNodeData(node[0], ValueNodeSelectTreeService$WonderEditor.setIsSelect(isSelect, node[1]), tree);
    } else {
      var children = node[2];
      var tree$1 = FolderNodeSelectTreeUILocalService$WonderEditor.setNodeData(node[0], FolderNodeSelectTreeService$WonderEditor.setIsSelect(isSelect, node[1]), children, tree);
      return ArrayService$WonderCommonlib.reduceOneParam((function (tree, node) {
                    return _toggle(isSelect, node, tree);
                  }), tree$1, children);
    }
  };
  if (node.tag) {
    return ValueNodeSelectTreeUILocalService$WonderEditor.setNodeData(node[0], ValueNodeSelectTreeService$WonderEditor.setIsSelect(isSelect, node[1]), tree);
  } else {
    return _toggle(isSelect, node, tree);
  }
}

export {
  unsafeGetSelectTreeNodeIdFromFolderTreeMap ,
  _setToFolderTreeMap ,
  handleFoldAssetNode ,
  handleFoldFolderAssetNode ,
  buildInitAccData ,
  buildSelectTreeForAssetBundle ,
  setSelectForSelectTree ,
  
}
/* RootTreeAssetService-WonderEditor Not a pure module */
