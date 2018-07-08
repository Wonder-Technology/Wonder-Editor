

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../../service/primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderEditor from "../../../../../../service/atom/SparseMapService.js";
import * as StateAssetService$WonderEditor from "../../../../../../service/state/asset/StateAssetService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as JsonNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/JsonNodeMapAssetService.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../../service/state/asset/AssetTreeRootAssetService.js";
import * as FolderNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/FolderNodeMapAssetService.js";
import * as TextureNodeMapAssetService$WonderEditor from "../../../../../../service/state/asset/TextureNodeMapAssetService.js";
import * as CurrentNodeParentIdAssetService$WonderEditor from "../../../../../../service/state/asset/CurrentNodeParentIdAssetService.js";

function getTargetTreeNodeId(assetState) {
  var match = CurrentNodeParentIdAssetService$WonderEditor.getCurrentNodeParentId(assetState);
  if (match) {
    return match[0];
  } else {
    return AssetTreeRootAssetService$WonderEditor.getRootTreeNodeId(assetState);
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
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, child) {
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
  var assetState = param[0];
  var match = targetId === removedId;
  if (match) {
    return true;
  } else {
    var match$1 = _isRemovedTreeNodeBeTargetParent(targetId, OptionService$WonderEditor.unsafeGet(getSpecificTreeNodeById(removedId, AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(assetState))));
    if (match$1) {
      return true;
    } else {
      return _isTargetTreeNodeBeRemovedParent(OptionService$WonderEditor.unsafeGet(getSpecificTreeNodeById(targetId, AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(assetState))), removedId);
    }
  }
}

function deepRemoveTreeNode(removedTreeNode) {
  var _iterateRemovedTreeNode = function (nodeArr) {
    nodeArr.forEach((function (param) {
            var id = param[/* id */0];
            switch (param[/* type_ */2]) {
              case 0 : 
                  var assetState = StateAssetService$WonderEditor.getState(/* () */0);
                  StateAssetService$WonderEditor.setState(FolderNodeMapAssetService$WonderEditor.setFolderNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInDict, id, SparseMapService$WonderEditor.copy(FolderNodeMapAssetService$WonderEditor.unsafeGetFolderNodeMap(assetState))), assetState));
                  break;
              case 1 : 
                  var assetState$1 = StateAssetService$WonderEditor.getState(/* () */0);
                  StateAssetService$WonderEditor.setState(JsonNodeMapAssetService$WonderEditor.setJsonNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInDict, id, SparseMapService$WonderEditor.copy(JsonNodeMapAssetService$WonderEditor.unsafeGetJsonNodeMap(assetState$1))), assetState$1));
                  break;
              case 2 : 
                  var assetState$2 = StateAssetService$WonderEditor.getState(/* () */0);
                  StateAssetService$WonderEditor.setState(TextureNodeMapAssetService$WonderEditor.setTextureNodeMap(Curry._2(DomHelper$WonderEditor.deleteKeyInDict, id, SparseMapService$WonderEditor.copy(TextureNodeMapAssetService$WonderEditor.unsafeGetTextureNodeMap(assetState$2))), assetState$2));
                  break;
              case 3 : 
                  throw [
                        Caml_builtin_exceptions.match_failure,
                        [
                          "AssetUtils.re",
                          68,
                          9
                        ]
                      ];
              
            }
            return _iterateRemovedTreeNode(param[/* children */1]);
          }));
    return /* () */0;
  };
  _iterateRemovedTreeNode(/* array */[removedTreeNode]);
  return StateAssetService$WonderEditor.getState(/* () */0);
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
                            /* Some */[treeNode]
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
  return _checkRemovedTreeNodeAndGetVal(_iterateAssetTree(targetId, /* array */[assetTreeRoot], /* array */[], /* None */0));
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
