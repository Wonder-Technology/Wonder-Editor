

import * as Js_option from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StoreUtils$WonderEditor from "../../../../../../../utils/ui/StoreUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../../../../service/primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectUtils$WonderEditor from "../../../../../../../utils/engine/GameObjectUtils.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../service/state/engine/GameObjectEngineService.js";

function getSceneTreeNodeIsShowChildren(param) {
  return true;
}

function buildTreeNode(gameObject, engineState) {
  var match = gameObject === SceneEngineService$WonderEditor.getSceneGameObject(engineState);
  return /* record */[
          /* name */GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(gameObject, engineState),
          /* uid */gameObject,
          /* isShowChildren */match ? true : false,
          /* children : array */[]
        ];
}

function _buildSceneGraphData(gameObject, engineState) {
  var _buildSceneGraphDataRec = function (gameObject, treeNode, engineState) {
    var match = GameObjectUtils$WonderEditor.hasChildren(gameObject, engineState);
    if (match) {
      return ArrayService$WonderCommonlib.reduceOneParam((function (treeNode, child) {
                    return /* record */[
                            /* name */treeNode[/* name */0],
                            /* uid */treeNode[/* uid */1],
                            /* isShowChildren */treeNode[/* isShowChildren */2],
                            /* children */ArrayService$WonderEditor.push(_buildSceneGraphDataRec(child, buildTreeNode(child, engineState), engineState), treeNode[/* children */3].slice())
                          ];
                  }), treeNode, GameObjectUtils$WonderEditor.getChildren(gameObject, engineState));
    } else {
      return treeNode;
    }
  };
  return _buildSceneGraphDataRec(gameObject, buildTreeNode(gameObject, engineState), engineState);
}

function getSceneGraphDataFromEngine(param) {
  var engineState = param[1];
  return /* array */[_buildSceneGraphData(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState)];
}

function setSpecificSceneTreeNodeIsShowChildren(targetUid, isShowChildren, sceneGraphArray) {
  return sceneGraphArray.map((function (treeNode) {
                var match = treeNode[/* uid */1] === targetUid;
                if (match) {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* isShowChildren */isShowChildren,
                          /* children */treeNode[/* children */3]
                        ];
                } else {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* isShowChildren */treeNode[/* isShowChildren */2],
                          /* children */setSpecificSceneTreeNodeIsShowChildren(targetUid, isShowChildren, treeNode[/* children */3])
                        ];
                }
              }));
}

function setIsShowChildrenByMap(isShowChildrenMap, sceneGraphArray) {
  return sceneGraphArray.map((function (treeNode) {
                var match = SparseMapService$WonderCommonlib.get(treeNode[/* uid */1], isShowChildrenMap);
                return /* record */[
                        /* name */treeNode[/* name */0],
                        /* uid */treeNode[/* uid */1],
                        /* isShowChildren */match !== undefined ? (
                            match ? true : false
                          ) : treeNode[/* isShowChildren */2],
                        /* children */setIsShowChildrenByMap(isShowChildrenMap, treeNode[/* children */3])
                      ];
              }));
}

function renameSceneGraphData(targetUid, newName, sceneGraphArray) {
  return sceneGraphArray.map((function (treeNode) {
                var match = treeNode[/* uid */1] === targetUid;
                if (match) {
                  return /* record */[
                          /* name */newName,
                          /* uid */treeNode[/* uid */1],
                          /* isShowChildren */treeNode[/* isShowChildren */2],
                          /* children */treeNode[/* children */3]
                        ];
                } else {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* isShowChildren */treeNode[/* isShowChildren */2],
                          /* children */renameSceneGraphData(targetUid, newName, treeNode[/* children */3])
                        ];
                }
              }));
}

function addTreeNodeSceneGraphData(treeNodeSceneGraphData, targetUid, sceneGraphArray, engineState) {
  return sceneGraphArray.map((function (treeNode) {
                var match = treeNode[/* uid */1] === targetUid;
                if (match) {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* isShowChildren */treeNode[/* isShowChildren */2],
                          /* children */ArrayService$WonderEditor.push(treeNodeSceneGraphData, treeNode[/* children */3].slice())
                        ];
                } else {
                  return treeNode;
                }
              }));
}

function buildIsShowChildrenMap(sceneGraphArray) {
  var _build = function (sceneGraphArray, map) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (map, treeNode) {
                  var map$1 = SparseMapService$WonderCommonlib.set(treeNode[/* uid */1], treeNode[/* isShowChildren */2], map);
                  return _build(treeNode[/* children */3], map$1);
                }), map, sceneGraphArray);
  };
  return _build(sceneGraphArray, SparseMapService$WonderCommonlib.createEmpty(/* () */0));
}

function buildIsShowChildrenMapFromStore(store) {
  var match = StoreUtils$WonderEditor.getSceneGraphDataFromStore(store);
  return buildIsShowChildrenMap(match !== undefined ? match : /* array */[]);
}

function _checkDragedTreeNodeShouldExist(param) {
  var dragedTreeNode = param[1];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("dragedTreeNode should exist", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(Js_option.isSome(dragedTreeNode));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return /* tuple */[
          param[0],
          OptionService$WonderEditor.unsafeGet(dragedTreeNode)
        ];
}

function removeDragedTreeNode(dragedUid, sceneGraphArray) {
  var _iterateSceneGraph = function (dragedUid, sceneGraphArray, newSceneGraphArray, dragedTreeNode) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, treeNode) {
                  var newSceneGraphArray = param[0];
                  var match = treeNode[/* uid */1] === dragedUid;
                  if (match) {
                    return /* tuple */[
                            newSceneGraphArray,
                            treeNode
                          ];
                  } else {
                    var match$1 = _iterateSceneGraph(dragedUid, treeNode[/* children */3], /* array */[], param[1]);
                    return /* tuple */[
                            ArrayService$WonderEditor.push(/* record */[
                                  /* name */treeNode[/* name */0],
                                  /* uid */treeNode[/* uid */1],
                                  /* isShowChildren */treeNode[/* isShowChildren */2],
                                  /* children */match$1[0]
                                ], newSceneGraphArray),
                            match$1[1]
                          ];
                  }
                }), /* tuple */[
                newSceneGraphArray,
                dragedTreeNode
              ], sceneGraphArray);
  };
  return _checkDragedTreeNodeShouldExist(_iterateSceneGraph(dragedUid, sceneGraphArray, /* array */[], undefined));
}

function getAllGameObjects(treeNode) {
  var _iterateGet = function (treeNodeArr, resultArr) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (resultArr, param) {
                  return _iterateGet(param[/* children */3], ArrayService$WonderEditor.push(param[/* uid */1], resultArr));
                }), resultArr, treeNodeArr);
  };
  return _iterateGet(/* array */[treeNode], /* array */[]);
}

export {
  getSceneTreeNodeIsShowChildren ,
  buildTreeNode ,
  _buildSceneGraphData ,
  getSceneGraphDataFromEngine ,
  setSpecificSceneTreeNodeIsShowChildren ,
  setIsShowChildrenByMap ,
  renameSceneGraphData ,
  addTreeNodeSceneGraphData ,
  buildIsShowChildrenMap ,
  buildIsShowChildrenMapFromStore ,
  _checkDragedTreeNodeShouldExist ,
  removeDragedTreeNode ,
  getAllGameObjects ,
  
}
/* Log-WonderLog Not a pure module */
