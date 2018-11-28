

import * as Js_option from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../../service/primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectUtils$WonderEditor from "../../../../../utils/engine/GameObjectUtils.js";
import * as SceneEngineService$WonderEditor from "../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function getWidge() {
  return /* SceneTree */0;
}

function isWidge(startWidge) {
  if (startWidge !== undefined) {
    return startWidge === /* SceneTree */0;
  } else {
    return false;
  }
}

function _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, engineState) {
  var _targetTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState);
  var dragedTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(dragedGameObject, engineState);
  var engineState$1 = engineState;
  while(true) {
    var targetTransform = _targetTransform;
    var match = TransformEngineService$WonderEditor.getParent(targetTransform, engineState$1);
    if (match !== undefined) {
      var match$1 = match === dragedTransform;
      if (match$1) {
        return true;
      } else {
        _targetTransform = match;
        continue ;
      }
    } else {
      return false;
    }
  };
}

function _isTargetGameObjectBeRemovedGameObjectParent(dragedGameObject, targetGameObject, engineState) {
  var match = TransformEngineService$WonderEditor.getParent(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(dragedGameObject, engineState), engineState);
  if (match !== undefined) {
    var match$1 = match === GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState);
    if (match$1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isGameObjectRelationError(targetGameObject, dragedGameObject, param) {
  var engineState = param[1];
  var match = targetGameObject === dragedGameObject;
  if (match) {
    return true;
  } else {
    var match$1 = _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, engineState);
    if (match$1) {
      return true;
    } else {
      return _isTargetGameObjectBeRemovedGameObjectParent(dragedGameObject, targetGameObject, engineState);
    }
  }
}

function _buildTreeNode(gameObject, engineState) {
  return /* record */[
          /* name */GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(gameObject, engineState),
          /* uid */gameObject,
          /* isShowChildren */true,
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
                            /* children */ArrayService$WonderEditor.push(_buildSceneGraphDataRec(child, _buildTreeNode(child, engineState), engineState), treeNode[/* children */3].slice())
                          ];
                  }), treeNode, GameObjectUtils$WonderEditor.getChildren(gameObject, engineState));
    } else {
      return treeNode;
    }
  };
  return _buildSceneGraphDataRec(gameObject, _buildTreeNode(gameObject, engineState), engineState);
}

function getSceneGraphDataFromEngine(param) {
  var engineState = param[1];
  return /* array */[_buildSceneGraphData(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState)];
}

function setSpecificSceneTreeNodeIsShowChildren(targetId, isShowChildren, sceneGraphArray) {
  return sceneGraphArray.map((function (treeNode) {
                var match = treeNode[/* uid */1] === targetId;
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
                          /* children */setSpecificSceneTreeNodeIsShowChildren(targetId, isShowChildren, treeNode[/* children */3])
                        ];
                }
              }));
}

function renameSceneGraphData(targetId, newName, sceneGraphArray) {
  return sceneGraphArray.map((function (treeNode) {
                var match = treeNode[/* uid */1] === targetId;
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
                          /* children */renameSceneGraphData(targetId, newName, treeNode[/* children */3])
                        ];
                }
              }));
}

function buildSceneGraphDataWithNewGameObject(newGameObject, oldSceneGraphData, engineState) {
  var scene = ArrayService$WonderEditor.unsafeGetFirst(oldSceneGraphData);
  return /* array */[/* record */[
            /* name */scene[/* name */0],
            /* uid */scene[/* uid */1],
            /* isShowChildren */scene[/* isShowChildren */2],
            /* children */ArrayService$WonderEditor.push(_buildTreeNode(newGameObject, engineState), scene[/* children */3].slice())
          ]];
}

function _checkDragedTreeNodeShouldExist(param) {
  var dragedTreeNode = param[1];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("dragedTreeNode should exist", "not"), (function () {
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

function dragedTreeNodeToTargetTreeNode(targetId, param) {
  var dragedTreeNode = param[1];
  return param[0].map((function (treeNode) {
                var children = treeNode[/* children */3];
                var match = treeNode[/* uid */1] === targetId;
                if (match) {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* isShowChildren */treeNode[/* isShowChildren */2],
                          /* children */ArrayService$WonderEditor.push(dragedTreeNode, children.slice())
                        ];
                } else {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* isShowChildren */treeNode[/* isShowChildren */2],
                          /* children */dragedTreeNodeToTargetTreeNode(targetId, /* tuple */[
                                children,
                                dragedTreeNode
                              ])
                        ];
                }
              }));
}

function getDragedSceneGraphData(targetId, dragedUid, sceneGraphArray) {
  return dragedTreeNodeToTargetTreeNode(targetId, removeDragedTreeNode(dragedUid, sceneGraphArray));
}

export {
  getWidge ,
  isWidge ,
  _isDragedGameObjectBeTargetGameObjectParent ,
  _isTargetGameObjectBeRemovedGameObjectParent ,
  isGameObjectRelationError ,
  _buildTreeNode ,
  _buildSceneGraphData ,
  getSceneGraphDataFromEngine ,
  setSpecificSceneTreeNodeIsShowChildren ,
  renameSceneGraphData ,
  buildSceneGraphDataWithNewGameObject ,
  _checkDragedTreeNodeShouldExist ,
  removeDragedTreeNode ,
  dragedTreeNodeToTargetTreeNode ,
  getDragedSceneGraphData ,
  
}
/* Log-WonderLog Not a pure module */
