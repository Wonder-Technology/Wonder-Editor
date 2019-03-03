

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../record/editor/asset/WDBNodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../record/editor/asset/FolderNodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../state/editor/asset/TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "./NodeNameAssetLogicService.js";

function _handleLeafNodeFunc(param, targetNodeId, nodeId, node) {
  var pathArr = param[1];
  if (param[0]) {
    return /* tuple */[
            true,
            pathArr
          ];
  } else {
    var match = NodeAssetService$WonderEditor.isIdEqual(nodeId, targetNodeId);
    if (match) {
      return /* tuple */[
              true,
              pathArr
            ];
    } else {
      return /* tuple */[
              false,
              pathArr
            ];
    }
  }
}

function _handleFolderNodeFunc(param, targetNodeId, nodeId, node) {
  var pathArr = param[1];
  if (param[0]) {
    return /* tuple */[
            true,
            pathArr
          ];
  } else {
    var match = NodeAssetService$WonderEditor.isIdEqual(nodeId, targetNodeId);
    if (match) {
      return /* tuple */[
              true,
              ArrayService$WonderEditor.push(node, pathArr)
            ];
    } else {
      return /* tuple */[
              false,
              pathArr
            ];
    }
  }
}

function _textureNodeFunc(targetNodeId, engineState, acc, nodeId, param) {
  return _handleLeafNodeFunc(acc, targetNodeId, nodeId, NodeNameAssetLogicService$WonderEditor.getTextureNodeName(param[/* textureComponent */0], engineState));
}

function _materialNodeFunc(targetNodeId, engineState, acc, nodeId, param) {
  return _handleLeafNodeFunc(acc, targetNodeId, nodeId, NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(param[/* materialComponent */1], param[/* type_ */0], engineState));
}

function _wdbNodeFunc(targetNodeId, acc, nodeId, nodeData) {
  return _handleLeafNodeFunc(acc, targetNodeId, nodeId, NodeNameAssetLogicService$WonderEditor.getWDBNodeName(WDBNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData)));
}

function _folderNodeFunc(targetNodeId, acc, nodeId, nodeData, children) {
  return _handleFolderNodeFunc(acc, targetNodeId, nodeId, NodeNameAssetLogicService$WonderEditor.getFolderNodeName(FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, children)));
}

function _handleBeforeFoldChildrenFunc(param) {
  return param[0];
}

function _handleAfterFoldChildrenFunc(nodeId, folderNodeData, children, param) {
  var pathArr = param[1];
  if (param[0]) {
    return /* tuple */[
            true,
            ArrayService$WonderEditor.push(NodeNameAssetLogicService$WonderEditor.getFolderNodeName(FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, folderNodeData, children)), pathArr)
          ];
  } else {
    return /* tuple */[
            false,
            pathArr
          ];
  }
}

function getNodePath(targetNode, param) {
  var engineState = param[1];
  var targetNodeId = NodeAssetService$WonderEditor.getNodeId(targetNode);
  var match = IterateTreeAssetService$WonderEditor.foldWithHandleBeforeAndAfterFoldChildren(/* tuple */[
        false,
        /* array */[]
      ], TreeAssetEditorService$WonderEditor.unsafeGetTree(param[0]), (function (param, param$1, param$2) {
          return _textureNodeFunc(targetNodeId, engineState, param, param$1, param$2);
        }), (function (param, param$1, param$2) {
          return _materialNodeFunc(targetNodeId, engineState, param, param$1, param$2);
        }), (function (param, param$1, param$2) {
          return _wdbNodeFunc(targetNodeId, param, param$1, param$2);
        }), (function (param, param$1, param$2, param$3) {
          return _folderNodeFunc(targetNodeId, param, param$1, param$2, param$3);
        }), _handleBeforeFoldChildrenFunc, _handleAfterFoldChildrenFunc, undefined, /* () */0);
  return match[1].reverse().join("/");
}

export {
  _handleLeafNodeFunc ,
  _handleFolderNodeFunc ,
  _textureNodeFunc ,
  _materialNodeFunc ,
  _wdbNodeFunc ,
  _folderNodeFunc ,
  _handleBeforeFoldChildrenFunc ,
  _handleAfterFoldChildrenFunc ,
  getNodePath ,
  
}
/* ArrayService-WonderEditor Not a pure module */
