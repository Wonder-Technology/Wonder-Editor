

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as ValueNodeSelectTreeService$WonderEditor from "./ValueNodeSelectTreeService.js";
import * as FolderNodeSelectTreeService$WonderEditor from "./FolderNodeSelectTreeService.js";
import * as IterateTreeSelectTreeService$WonderEditor from "./IterateTreeSelectTreeService.js";

function replaceNode(targetNodeId, newTreeNode, tree) {
  var _nodeFunc = function (nodeId, nodeData, buildNodeByNodeDataFunc) {
    var match = nodeId === targetNodeId;
    if (match) {
      return newTreeNode;
    } else {
      return Curry._2(buildNodeByNodeDataFunc, nodeId, nodeData);
    }
  };
  var _valueNodeFunc = function (nodeId, nodeData) {
    return _nodeFunc(nodeId, nodeData, ValueNodeSelectTreeService$WonderEditor.buildNodeByNodeData);
  };
  var _folderNodeFunc = function (nodeId, nodeData, children) {
    return _nodeFunc(nodeId, nodeData, (function (param) {
                  return (function (param$1) {
                      var param$2 = param$1;
                      var param$3 = children;
                      return FolderNodeSelectTreeService$WonderEditor.buildNodeByNodeData(param, param$2, param$3);
                    });
                }));
  };
  return IterateTreeSelectTreeService$WonderEditor.cata(tree, _valueNodeFunc, _folderNodeFunc, /* () */0);
}

function updateNode(nodeId, nodeData, buildNodeByNodeDataFunc, tree) {
  return replaceNode(nodeId, Curry._2(buildNodeByNodeDataFunc, nodeId, nodeData), tree);
}

function insertNode(targetNodeId, newTreeNode, tree) {
  var _folderNodeFunc = function (nodeId, nodeData, children) {
    var match = nodeId === targetNodeId;
    return FolderNodeSelectTreeService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, match ? ArrayService$WonderEditor.push(newTreeNode, children.slice()) : children);
  };
  return IterateTreeSelectTreeService$WonderEditor.cata(tree, undefined, _folderNodeFunc, /* () */0);
}

export {
  replaceNode ,
  updateNode ,
  insertNode ,
  
}
/* ArrayService-WonderEditor Not a pure module */
