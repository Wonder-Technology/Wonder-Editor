

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as IdAssetService$WonderEditor from "./IdAssetService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FileNameService$WonderEditor from "../../../atom/FileNameService.js";
import * as NodeAssetService$WonderEditor from "./NodeAssetService.js";
import * as StateEditorService$WonderEditor from "../../../state/editor/StateEditorService.js";
import * as UIStateAssetService$WonderEditor from "./UIStateAssetService.js";
import * as WDBNodeAssetService$WonderEditor from "./WDBNodeAssetService.js";
import * as RootTreeAssetService$WonderEditor from "./RootTreeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "./FolderNodeAssetService.js";
import * as IterateTreeAssetService$WonderEditor from "./IterateTreeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "./TextureNodeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "./MaterialNodeAssetService.js";

function setNodeIsShowChildren(targetNodeId, isShowChildren, tree) {
  var _folderNodeFunc = function (nodeId, nodeData) {
    var match = NodeAssetService$WonderEditor.isIdEqual(nodeId, targetNodeId);
    if (match) {
      return /* tuple */[
              isShowChildren ? /* ChangeToShow */1 : /* ChangeToHide */2,
              nodeData
            ];
    } else {
      return /* tuple */[
              /* NotChange */0,
              nodeData
            ];
    }
  };
  return IterateTreeAssetService$WonderEditor.map(tree, _folderNodeFunc, undefined, undefined, undefined, /* () */0);
}

function findNodeById(targetNodeId, tree) {
  var predNodeFunc = function (node) {
    return NodeAssetService$WonderEditor.isIdEqual(NodeAssetService$WonderEditor.getNodeId(node), targetNodeId);
  };
  return IterateTreeAssetService$WonderEditor.findOne(tree, predNodeFunc, predNodeFunc, predNodeFunc, predNodeFunc, /* () */0);
}

function unsafeFindNodeById(targetNodeId, tree) {
  return OptionService$WonderEditor.unsafeGet(findNodeById(targetNodeId, tree));
}

function insertNode(targetNodeId, newTreeNode, tree) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("new tree node not exist in tree", "exist"), (function (param) {
                        return Contract$WonderLog.assertTrue(Js_option.isNone(findNodeById(NodeAssetService$WonderEditor.getNodeId(newTreeNode), tree)));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var _folderNodeFunc = function (nodeId, nodeData, children) {
    var match = NodeAssetService$WonderEditor.isIdEqual(nodeId, targetNodeId);
    return FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, match ? UIStateAssetService$WonderEditor.map((function (children) {
                        return ArrayService$WonderEditor.push(newTreeNode, children.slice());
                      }), children) : children);
  };
  return IterateTreeAssetService$WonderEditor.cata(tree, undefined, undefined, undefined, _folderNodeFunc, /* () */0);
}

function findTargetChild(folderNode, targetChild, isNodeEqualFunc) {
  return Caml_option.undefined_to_opt(FolderNodeAssetService$WonderEditor.getChildrenNodes(folderNode).find((function (child) {
                    return Curry._2(isNodeEqualFunc, child, targetChild);
                  })));
}

function removeNode(targetNode, tree) {
  var targetNodeId = NodeAssetService$WonderEditor.getNodeId(targetNode);
  var _folderNodeFunc = function (nodeId, nodeData, children) {
    return FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, FolderNodeAssetService$WonderEditor.filterChildrenById(targetNodeId, children));
  };
  return IterateTreeAssetService$WonderEditor.cata(tree, undefined, undefined, undefined, _folderNodeFunc, /* () */0);
}

function removeNodeById(targetNodeId, tree) {
  var _folderNodeFunc = function (nodeId, nodeData, children) {
    return FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, FolderNodeAssetService$WonderEditor.filterChildrenById(targetNodeId, children));
  };
  var removedNode = OptionService$WonderEditor.unsafeGet(findNodeById(targetNodeId, tree));
  return /* tuple */[
          IterateTreeAssetService$WonderEditor.cata(tree, undefined, undefined, undefined, _folderNodeFunc, /* () */0),
          removedNode
        ];
}

function replaceNode(targetNodeId, newTreeNode, tree) {
  var _nodeFunc = function (nodeId, nodeData, buildNodeByNodeDataFunc) {
    var match = nodeId === targetNodeId;
    if (match) {
      return newTreeNode;
    } else {
      return Curry._2(buildNodeByNodeDataFunc, nodeId, nodeData);
    }
  };
  var _textureNodeFunc = function (nodeId, nodeData) {
    return _nodeFunc(nodeId, nodeData, TextureNodeAssetService$WonderEditor.buildNodeByNodeData);
  };
  var _materialNodeFunc = function (nodeId, nodeData) {
    return _nodeFunc(nodeId, nodeData, MaterialNodeAssetService$WonderEditor.buildNodeByNodeData);
  };
  var _wdbNodeFunc = function (nodeId, nodeData) {
    return _nodeFunc(nodeId, nodeData, WDBNodeAssetService$WonderEditor.buildNodeByNodeData);
  };
  var _folderNodeFunc = function (nodeId, nodeData, children) {
    return _nodeFunc(nodeId, nodeData, (function (param) {
                  return (function (param$1) {
                      var param$2 = param$1;
                      var param$3 = children;
                      return FolderNodeAssetService$WonderEditor.buildNodeByNodeData(param, param$2, param$3);
                    });
                }));
  };
  return IterateTreeAssetService$WonderEditor.cata(tree, _textureNodeFunc, _materialNodeFunc, _wdbNodeFunc, _folderNodeFunc, /* () */0);
}

function updateNode(nodeId, nodeData, buildNodeByNodeDataFunc, tree) {
  return replaceNode(nodeId, Curry._2(buildNodeByNodeDataFunc, nodeId, nodeData), tree);
}

function _getFolderPathArr(folderPath) {
  return Contract$WonderLog.ensureCheck((function (pathArr) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("contain root node", "not"), (function (param) {
                              Contract$WonderLog.Operators[/* >= */7](pathArr.length, 1);
                              return Contract$WonderLog.Operators[/* ==^ */2](Caml_array.caml_array_get(pathArr, 0), RootTreeAssetService$WonderEditor.getAssetTreeRootName(/* () */0));
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), FileNameService$WonderEditor.removePathPostfix(folderPath).split("/"));
}

function _buildTreeByFolderPath(folderPathArr, index) {
  var match = RootTreeAssetService$WonderEditor.buildRootNode(RootTreeAssetService$WonderEditor.getAssetTreeRootName(/* () */0), index);
  var match$1 = ArrayService$WonderCommonlib.reduceOneParam((function (param, folderNodeName) {
          var match = IdAssetService$WonderEditor.generateNodeId(param[2]);
          var id = match[1];
          return /* tuple */[
                  id,
                  insertNode(param[0], FolderNodeAssetService$WonderEditor.buildNode(id, folderNodeName, undefined, /* () */0), param[1]),
                  match[0]
                ];
        }), /* tuple */[
        match[0],
        match[1],
        match[2]
      ], folderPathArr.slice(1));
  return /* tuple */[
          match$1[1],
          match$1[2]
        ];
}

function _mergeTreeByFolderNodeName(isNodeEqualByName, tree1, onlyFolderNodeTree) {
  var _folderNodeFunc = function (param, nodeId, nodeData, children) {
    var newTree = param[1];
    var parentFolderNodeInNewTree = param[0];
    if (parentFolderNodeInNewTree !== undefined) {
      var parentFolderNodeInNewTree$1 = parentFolderNodeInNewTree;
      var node = FolderNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData, children);
      var targetChildFolderNodeInNewTree = findTargetChild(parentFolderNodeInNewTree$1, node, isNodeEqualByName);
      if (targetChildFolderNodeInNewTree !== undefined) {
        return /* tuple */[
                targetChildFolderNodeInNewTree,
                newTree
              ];
      } else {
        return /* tuple */[
                node,
                insertNode(NodeAssetService$WonderEditor.getNodeId(parentFolderNodeInNewTree$1), node, newTree)
              ];
      }
    } else {
      return /* tuple */[
              RootTreeAssetService$WonderEditor.getRootNode(newTree),
              newTree
            ];
    }
  };
  return IterateTreeAssetService$WonderEditor.fold(_folderNodeFunc, /* tuple */[
                undefined,
                tree1
              ], onlyFolderNodeTree, undefined, undefined, undefined, undefined, /* () */0)[1];
}

function _unsafeFindFolderNodeByName(targetFolderNodeName, tree) {
  return OptionService$WonderEditor.unsafeGet(IterateTreeAssetService$WonderEditor.findOne(tree, undefined, undefined, undefined, (function (node) {
                    return FolderNodeAssetService$WonderEditor.getNodeName(FolderNodeAssetService$WonderEditor.getNodeData(node)) === targetFolderNodeName;
                  }), /* () */0));
}

function addFolderNodesToTreeByPath(path, isNodeEqualByName, tree, index) {
  var pathArr = _getFolderPathArr(path);
  var match = _buildTreeByFolderPath(pathArr, index);
  var newTree = _mergeTreeByFolderNodeName(isNodeEqualByName, tree, match[0]);
  return /* tuple */[
          newTree,
          match[1],
          _unsafeFindFolderNodeByName(ArrayService$WonderEditor.unsafeGetLast(pathArr), newTree)
        ];
}

export {
  setNodeIsShowChildren ,
  findNodeById ,
  unsafeFindNodeById ,
  insertNode ,
  findTargetChild ,
  removeNode ,
  removeNodeById ,
  replaceNode ,
  updateNode ,
  _getFolderPathArr ,
  _buildTreeByFolderPath ,
  _mergeTreeByFolderNodeName ,
  _unsafeFindFolderNodeByName ,
  addFolderNodesToTreeByPath ,
  
}
/* Log-WonderLog Not a pure module */
