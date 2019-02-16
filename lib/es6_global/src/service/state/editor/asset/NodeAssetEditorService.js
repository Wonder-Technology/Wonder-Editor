

import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "./TreeAssetEditorService.js";
import * as OperateTreeAssetService$WonderEditor from "../../../record/editor/asset/OperateTreeAssetService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "./OperateTreeAssetEditorService.js";

function setNodeData(nodeId, nodeData, buildNodeByNodeDataFunc, editorState) {
  var __x = OperateTreeAssetService$WonderEditor.updateNode(nodeId, nodeData, buildNodeByNodeDataFunc, TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState));
  return TreeAssetEditorService$WonderEditor.setTree(__x, editorState);
}

function addNodeToAssetTree(targetTreeNode, newNode, editorState) {
  return OperateTreeAssetEditorService$WonderEditor.insertNode(NodeAssetService$WonderEditor.getNodeId(targetTreeNode), newNode, editorState);
}

export {
  setNodeData ,
  addNodeToAssetTree ,
  
}
/* TreeAssetEditorService-WonderEditor Not a pure module */
