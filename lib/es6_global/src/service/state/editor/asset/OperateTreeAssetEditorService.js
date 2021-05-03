

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../record/editor/asset/FolderNodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "./TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";
import * as OperateTreeAssetService$WonderEditor from "../../../record/editor/asset/OperateTreeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../record/editor/asset/MaterialNodeAssetService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "./CurrentNodeIdAssetEditorService.js";

function _getTree(func, editorState) {
  return Curry._1(func, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
}

function _getTreeWithLabel(func, editorState) {
  return Curry._1(func, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
}

function _getAndSetTree(func, editorState) {
  var __x = Curry._1(func, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
  return TreeAssetEditorService$WonderEditor.setTree(__x, editorState);
}

function findNodeById(targetNodeId, editorState) {
  var param = TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState);
  return OperateTreeAssetService$WonderEditor.findNodeById(targetNodeId, param);
}

function unsafeFindNodeById(targetNodeId, editorState) {
  var param = TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState);
  return OperateTreeAssetService$WonderEditor.unsafeFindNodeById(targetNodeId, param);
}

function isNodeExistById(targetNodeId, editorState) {
  var param = TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState);
  return Js_option.isSome(OperateTreeAssetService$WonderEditor.findNodeById(targetNodeId, param));
}

function findMaterialNode(targetMaterialComponent, targetType_, editorState) {
  var predNodeFunc = function (materialNode) {
    var match = MaterialNodeAssetService$WonderEditor.getNodeData(materialNode);
    if (match[/* materialComponent */1] === targetMaterialComponent) {
      return match[/* type_ */0] === targetType_;
    } else {
      return false;
    }
  };
  var arg = predNodeFunc;
  return (function (param) {
              return IterateTreeAssetService$WonderEditor.findOne(param, undefined, arg, undefined, undefined, undefined, undefined, undefined, /* () */0);
            })(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
}

function insertNode(targetNodeId, newTreeNode, editorState) {
  return _getAndSetTree((function (param) {
                return OperateTreeAssetService$WonderEditor.insertNode(targetNodeId, newTreeNode, param);
              }), editorState);
}

function setNodeIsShowChildren(targetNodeId, isShowChildren, editorState) {
  return _getAndSetTree((function (param) {
                return OperateTreeAssetService$WonderEditor.setNodeIsShowChildren(targetNodeId, isShowChildren, param);
              }), editorState);
}

function removeNode(targetNode, editorState) {
  var newTree = OperateTreeAssetService$WonderEditor.removeNode(targetNode, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
  return TreeAssetEditorService$WonderEditor.setTree(newTree, editorState);
}

function removeNodeById(targetNodeId, editorState) {
  var match = OperateTreeAssetService$WonderEditor.removeNodeById(targetNodeId, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
  var newTree = match[0];
  return /* tuple */[
          (function (param) {
              return TreeAssetEditorService$WonderEditor.setTree(newTree, param);
            }),
          match[1]
        ];
}

function findNodeParent(targetNode, editorState) {
  return IterateTreeAssetService$WonderEditor.findOne(TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), undefined, undefined, undefined, undefined, undefined, undefined, (function (node) {
                return Js_option.isSome(FolderNodeAssetService$WonderEditor.findChild(node, targetNode));
              }), /* () */0);
}

function findNodeParentId(targetNode, editorState) {
  return Js_option.map(NodeAssetService$WonderEditor.getNodeId, findNodeParent(targetNode, editorState));
}

function getCurrentNode(editorState) {
  return Js_option.map((function (nodeId) {
                var param = TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState);
                return OperateTreeAssetService$WonderEditor.unsafeFindNodeById(nodeId, param);
              }), CurrentNodeIdAssetEditorService$WonderEditor.getCurrentNodeId(editorState));
}

function unsafeGetSelectedFolderNodeInAssetTree(editorState) {
  var targetNodeId = TreeAssetEditorService$WonderEditor.getSelectedFolderNodeIdInAssetTree(editorState);
  var param = TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState);
  return OperateTreeAssetService$WonderEditor.unsafeFindNodeById(targetNodeId, param);
}

export {
  _getTree ,
  _getTreeWithLabel ,
  _getAndSetTree ,
  findNodeById ,
  unsafeFindNodeById ,
  isNodeExistById ,
  findMaterialNode ,
  insertNode ,
  setNodeIsShowChildren ,
  removeNode ,
  removeNodeById ,
  findNodeParent ,
  findNodeParentId ,
  getCurrentNode ,
  unsafeGetSelectedFolderNodeInAssetTree ,
  
}
/* FolderNodeAssetService-WonderEditor Not a pure module */
