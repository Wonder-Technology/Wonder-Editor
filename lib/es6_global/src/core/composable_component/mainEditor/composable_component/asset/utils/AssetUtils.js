

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../../service/primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderEditor from "../../../../../../service/atom/SparseMapService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetJsonNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetJsonNodeMapEditorService.js";
import * as AssetFolderNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetFolderNodeMapEditorService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetTextureNodeMapEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

function getWidge() {
  return /* Asset */1;
}

function isWidge(startWidge) {
  if (startWidge !== undefined) {
    return startWidge === /* Asset */1;
  } else {
    return false;
  }
}

function getTargetTreeNodeId(editorState) {
  var match = AssetCurrentNodeParentIdEditorService$WonderEditor.getCurrentNodeParentId(editorState);
  if (match !== undefined) {
    return match;
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
    return node;
  } else {
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, child) {
                    var id = param[1];
                    var resultNode = param[0];
                    if (resultNode !== undefined) {
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
                  undefined,
                  id
                ], node[/* children */1])[0];
  }
}

function _isRemovedTreeNodeBeTargetParent(targetId, removedTreeNode) {
  var match = targetId === removedTreeNode[/* id */0];
  if (match) {
    return true;
  } else {
    return ArrayService$WonderCommonlib.reduceOneParam((function (result, child) {
                  if (result) {
                    return true;
                  } else {
                    return _isRemovedTreeNodeBeTargetParent(targetId, child);
                  }
                }), false, removedTreeNode[/* children */1]);
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

function deepRemoveTreeNode(removedTreeNode) {
  var _iterateRemovedTreeNode = function (nodeArr) {
    nodeArr.forEach((function (param) {
            var id = param[/* id */0];
            switch (param[/* type_ */2]) {
              case 0 : 
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  StateEditorService$WonderEditor.setState(AssetFolderNodeMapEditorService$WonderEditor.setFolderNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInDict, id, SparseMapService$WonderEditor.copy(AssetFolderNodeMapEditorService$WonderEditor.getFolderNodeMap(editorState))), editorState));
                  break;
              case 1 : 
                  var editorState$1 = StateEditorService$WonderEditor.getState(/* () */0);
                  StateEditorService$WonderEditor.setState(AssetJsonNodeMapEditorService$WonderEditor.setJsonNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInDict, id, SparseMapService$WonderEditor.copy(AssetJsonNodeMapEditorService$WonderEditor.getJsonNodeMap(editorState$1))), editorState$1));
                  break;
              case 2 : 
                  var editorState$2 = StateEditorService$WonderEditor.getState(/* () */0);
                  StateEditorService$WonderEditor.setState(AssetTextureNodeMapEditorService$WonderEditor.setTextureNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInDict, id, SparseMapService$WonderEditor.copy(AssetTextureNodeMapEditorService$WonderEditor.getTextureNodeMap(editorState$2))), editorState$2));
                  break;
              
            }
            return _iterateRemovedTreeNode(param[/* children */1]);
          }));
    return /* () */0;
  };
  _iterateRemovedTreeNode(/* array */[removedTreeNode]);
  return StateEditorService$WonderEditor.getState(/* () */0);
}

function _checkRemovedTreeNodeAndGetVal(param) {
  var removedTreeNode = param[1];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("removedTreeNode should exist", "not"), (function () {
                        return Contract$WonderLog.assertTrue(Js_option.isSome(removedTreeNode));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return /* tuple */[
          ArrayService$WonderEditor.getFirst(param[0]),
          OptionService$WonderEditor.unsafeGet(removedTreeNode)
        ];
}

function removeSpecificTreeNode(targetId, assetTreeRoot) {
  var _iterateAssetTree = function (targetId, assetTreeArr, newAssetTree, removedTreeNode) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, treeNode) {
                  var newAssetTree = param[0];
                  var match = treeNode[/* id */0] === targetId;
                  if (match) {
                    return /* tuple */[
                            newAssetTree,
                            treeNode
                          ];
                  } else {
                    var match$1 = _iterateAssetTree(targetId, treeNode[/* children */1], /* array */[], param[1]);
                    return /* tuple */[
                            ArrayService$WonderEditor.push(/* record */[
                                  /* id */treeNode[/* id */0],
                                  /* children */match$1[0],
                                  /* type_ */treeNode[/* type_ */2]
                                ], newAssetTree),
                            match$1[1]
                          ];
                  }
                }), /* tuple */[
                newAssetTree,
                removedTreeNode
              ], assetTreeArr);
  };
  return _checkRemovedTreeNodeAndGetVal(_iterateAssetTree(targetId, /* array */[assetTreeRoot], /* array */[], undefined));
}

function insertSourceTreeNodeToTargetTreeNodeChildren(targetId, newTreeNode, assetTreeRoot) {
  var _iterateInsertAssetTree = function (targetId, newTreeNode, assetTreeArr) {
    return assetTreeArr.map((function (treeNode) {
                  var children = treeNode[/* children */1];
                  var match = treeNode[/* id */0] === targetId;
                  if (match) {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* children */ArrayService$WonderEditor.push(newTreeNode, children.slice()),
                            /* type_ */treeNode[/* type_ */2]
                          ];
                  } else {
                    return /* record */[
                            /* id */treeNode[/* id */0],
                            /* children */_iterateInsertAssetTree(targetId, newTreeNode, children),
                            /* type_ */treeNode[/* type_ */2]
                          ];
                  }
                }));
  };
  return ArrayService$WonderEditor.getFirst(_iterateInsertAssetTree(targetId, newTreeNode, /* array */[assetTreeRoot]));
}

export {
  getWidge ,
  isWidge ,
  getTargetTreeNodeId ,
  isIdEqual ,
  getSpecificTreeNodeById ,
  _isRemovedTreeNodeBeTargetParent ,
  _isTargetTreeNodeBeRemovedParent ,
  isTreeNodeRelationError ,
  deepRemoveTreeNode ,
  _checkRemovedTreeNodeAndGetVal ,
  removeSpecificTreeNode ,
  insertSourceTreeNodeToTargetTreeNodeChildren ,
  
}
/* Log-WonderLog Not a pure module */
