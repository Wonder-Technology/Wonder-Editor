

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../record/editor/asset/WDBNodeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../record/editor/asset/FolderNodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../state/editor/asset/TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../record/editor/asset/IterateTreeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "./NodeNameAssetLogicService.js";

function getNodePath(targetNode, param) {
  var engineState = param[1];
  var targetNodeId = NodeAssetService$WonderEditor.getNodeId(targetNode);
  var _handleLeafNodeFunc = function (param, nodeId, _) {
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
  };
  var _textureNodeFunc = function (acc, nodeId, param) {
    return _handleLeafNodeFunc(acc, nodeId, NodeNameAssetLogicService$WonderEditor.getTextureNodeName(param[/* textureComponent */0], engineState));
  };
  var _materialNodeFunc = function (acc, nodeId, param) {
    return _handleLeafNodeFunc(acc, nodeId, NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(param[/* materialComponent */1], param[/* type_ */0], engineState));
  };
  var _wdbNodeFunc = function (acc, nodeId, nodeData) {
    return _handleLeafNodeFunc(acc, nodeId, NodeNameAssetLogicService$WonderEditor.getWDBNodeName(WDBNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData)));
  };
  var _folderNodeFunc = function (acc, nodeId, nodeData, children) {
    var param = acc;
    var nodeId$1 = nodeId;
    var node = NodeNameAssetLogicService$WonderEditor.getFolderNodeName(FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, children));
    var pathArr = param[1];
    if (param[0]) {
      return /* tuple */[
              true,
              pathArr
            ];
    } else {
      var match = NodeAssetService$WonderEditor.isIdEqual(nodeId$1, targetNodeId);
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
  };
  var _handleBeforeFoldChildrenFunc = function (param) {
    return param[0];
  };
  var _handleAfterFoldChildrenFunc = function (nodeId, folderNodeData, children, param) {
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
  };
  var match = IterateTreeAssetService$WonderEditor.foldWithHandleBeforeAndAfterFoldChildren(/* tuple */[
        false,
        /* array */[]
      ], TreeAssetEditorService$WonderEditor.unsafeGetTree(param[0]), _textureNodeFunc, _materialNodeFunc, _wdbNodeFunc, _folderNodeFunc, _handleBeforeFoldChildrenFunc, _handleAfterFoldChildrenFunc, undefined, /* () */0);
  return match[1].reverse().join("/");
}

export {
  getNodePath ,
  
}
/* ArrayService-WonderEditor Not a pure module */
