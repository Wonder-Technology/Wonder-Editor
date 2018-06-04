

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../../service/primitive/OptionService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";

function getTargetTreeNodeId(currentNodeParentId, editorState) {
  if (currentNodeParentId) {
    return currentNodeParentId[0];
  } else {
    return AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(editorState);
  }
}

function isIdEqual(id, targetId) {
  return id === targetId;
}

function getSpecificTreeNodeById(id, node) {
  var match = id === node[/* id */0];
  if (match) {
    return /* Some */[node];
  } else {
    return node[/* children */1].reduce((function (param, child) {
                    var id = param[1];
                    var resultNode = param[0];
                    if (resultNode) {
                      return /* tuple */[
                              resultNode,
                              id
                            ];
                    } else {
                      return /* tuple */[
                              getSpecificTreeNodeById(id, child),
                              id
                            ];
                    }
                  }), /* tuple */[
                  /* None */0,
                  id
                ])[0];
  }
}

function _isRemovedTreeNodeBeTargetParent(targetId, removedTreeNode) {
  var match = targetId === removedTreeNode[/* id */0];
  if (match) {
    return true;
  } else {
    return removedTreeNode[/* children */1].reduce((function (result, child) {
                  if (result) {
                    return true;
                  } else {
                    return _isRemovedTreeNodeBeTargetParent(targetId, child);
                  }
                }), false);
  }
}

function _isTargetTreeNodeBeRemovedParent(targetTreeNode, removedId) {
  var len = targetTreeNode[/* children */1].filter((function (child) {
          return child[/* id */0] === removedId;
        })).length;
  var match = len >= 1;
  if (match) {
    return true;
  } else {
    return false;
  }
}

function isTreeNodeRelationError(targetId, removedId, param) {
  var editorState = param[0];
  var match = targetId === removedId;
  if (match) {
    return true;
  } else {
    var match$1 = _isRemovedTreeNodeBeTargetParent(targetId, OptionService$WonderEditor.unsafeGet(getSpecificTreeNodeById(removedId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState))));
    if (match$1) {
      return true;
    } else {
      return _isTargetTreeNodeBeRemovedParent(OptionService$WonderEditor.unsafeGet(getSpecificTreeNodeById(targetId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState))), removedId);
    }
  }
}

function deepRemoveTreeNodeChildren(removedTreeNode, nodeMap) {
  var _iterateRemovedTreeNode = function (id, children) {
    Curry._2(DomHelper$WonderEditor.deleteKeyInDict, id, nodeMap);
    children.forEach((function (param) {
            return _iterateRemovedTreeNode(param[/* id */0], param[/* children */1]);
          }));
    return /* () */0;
  };
  return _iterateRemovedTreeNode(removedTreeNode[/* id */0], removedTreeNode[/* children */1]);
}

function removeSpecificTreeNodeFromAssetTree(targetId, assetTreeRoot) {
  var _iterateAssetTree = function (targetId, assetTree, newAssetTree, removedTreeNode) {
    return assetTree.reduce((function (param, treeNode) {
                  var newAssetTree = param[0];
                  var match = treeNode[/* id */0] === targetId;
                  if (match) {
                    return /* tuple */[
                            newAssetTree,
                            /* Some */[treeNode]
                          ];
                  } else {
                    var match$1 = _iterateAssetTree(targetId, treeNode[/* children */1], /* array */[], param[1]);
                    return /* tuple */[
                            ArrayService$WonderEditor.push(/* record */[
                                  /* id */treeNode[/* id */0],
                                  /* children */match$1[0]
                                ], newAssetTree),
                            match$1[1]
                          ];
                  }
                }), /* tuple */[
                newAssetTree,
                removedTreeNode
              ]);
  };
  var match = _iterateAssetTree(targetId, /* array */[assetTreeRoot], /* array */[], /* None */0);
  var match$1 = match[1];
  if (match$1) {
    return /* tuple */[
            ArrayService$WonderEditor.getFirst(match[0]),
            match$1[0]
          ];
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("removeSpecificTreeNodeFromAssetTree", "\n     the removed treenode " + (String(targetId) + " is not exist "), "", "", ""));
  }
}

function insertNewTreeNodeToTargetTreeNode(targetId, newTreeNode, assetTreeRoot) {
  var _iterateInsertAssetTree = function (targetId, newTreeNode, assetTree) {
    return assetTree.map((function (treeNode) {
                  var children = treeNode[/* children */1];
                  var match = treeNode[/* id */0] === targetId;
                  if (match) {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* children */ArrayService$WonderEditor.push(newTreeNode, children.slice())
                          ];
                  } else {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* children */_iterateInsertAssetTree(targetId, newTreeNode, children)
                          ];
                  }
                }));
  };
  return ArrayService$WonderEditor.getFirst(_iterateInsertAssetTree(targetId, newTreeNode, /* array */[assetTreeRoot]));
}

export {
  getTargetTreeNodeId ,
  isIdEqual ,
  getSpecificTreeNodeById ,
  _isRemovedTreeNodeBeTargetParent ,
  _isTargetTreeNodeBeRemovedParent ,
  isTreeNodeRelationError ,
  deepRemoveTreeNodeChildren ,
  removeSpecificTreeNodeFromAssetTree ,
  insertNewTreeNodeToTargetTreeNode ,
  
}
/* Log-WonderLog Not a pure module */
