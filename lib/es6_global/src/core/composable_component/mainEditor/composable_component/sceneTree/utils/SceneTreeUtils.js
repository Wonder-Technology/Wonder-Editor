

import * as Caml_obj from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../../service/primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectUtils$WonderEditor from "../../../../../utils/GameObjectUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/CameraEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function getFlag() {
  return /* SceneTree */0;
}

function handleFlag(startFlag) {
  if (startFlag) {
    return startFlag[0] === /* SceneTree */0;
  } else {
    return false;
  }
}

function unsafeGetSceneGraphDataFromStore(store) {
  return OptionService$WonderEditor.unsafeGet(store[/* sceneTreeState */3][/* sceneGraphData */0]);
}

function _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, engineState) {
  var _targetTransform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(targetGameObject, engineState);
  var dragedTransform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(dragedGameObject, engineState);
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
  var match = TransformEngineService$WonderEditor.getParent(GameObjectComponentEngineService$WonderEditor.getTransformComponent(dragedGameObject, engineState), engineState);
  if (match !== undefined) {
    var match$1 = match === GameObjectComponentEngineService$WonderEditor.getTransformComponent(targetGameObject, engineState);
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

function _getGameObjectName(gameObject, engineState) {
  var match = CameraEngineService$WonderEditor.isCamera(gameObject, engineState);
  if (match) {
    return "camera";
  } else {
    return "gameObject" + (String(gameObject) + "");
  }
}

function _buildTreeNode(gameObject, engineState) {
  return /* record */[
          /* name */_getGameObjectName(gameObject, engineState),
          /* uid */gameObject,
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
                            /* children */ArrayService$WonderEditor.push(_buildSceneGraphDataRec(child, _buildTreeNode(child, engineState), engineState), treeNode[/* children */2].slice())
                          ];
                  }), treeNode, GameObjectUtils$WonderEditor.getChildren(gameObject, engineState));
    } else {
      return treeNode;
    }
  };
  return _buildSceneGraphDataRec(gameObject, _buildTreeNode(gameObject, engineState), engineState);
}

function getSceneGraphDataFromEngine(param) {
  return /* array */[_buildSceneGraphData(SceneEditorService$WonderEditor.unsafeGetScene(param[0]), param[1])];
}

function buildSceneGraphDataWithNewGameObject(newGameObject, oldSceneGraphData, engineState) {
  var scene = ArrayService$WonderEditor.getFirst(oldSceneGraphData);
  return Contract$WonderLog.ensureCheck((function (sceneGraphArray) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the draged scene graph data == scene data from engine", "not"), (function () {
                              return Contract$WonderLog.assertTrue(Caml_obj.caml_equal(StateLogicService$WonderEditor.getStateToGetData(getSceneGraphDataFromEngine), sceneGraphArray));
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), /* array */[/* record */[
                /* name */scene[/* name */0],
                /* uid */scene[/* uid */1],
                /* children */ArrayService$WonderEditor.push(_buildTreeNode(newGameObject, engineState), scene[/* children */2].slice())
              ]]);
}

function _removeDragedTreeNodeFromSceneGrahph(dragedUid, sceneGraphArrayData) {
  var _iterateSceneGraph = function (dragedUid, sceneGraphArray, newSceneGraphArray, dragedTreeNode) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (param, treeNode) {
                  var newSceneGraphArray = param[0];
                  var match = treeNode[/* uid */1] === dragedUid;
                  if (match) {
                    return /* tuple */[
                            newSceneGraphArray,
                            /* Some */[treeNode]
                          ];
                  } else {
                    var match$1 = _iterateSceneGraph(dragedUid, treeNode[/* children */2], /* array */[], param[1]);
                    return /* tuple */[
                            ArrayService$WonderEditor.push(/* record */[
                                  /* name */treeNode[/* name */0],
                                  /* uid */treeNode[/* uid */1],
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
  var match = _iterateSceneGraph(dragedUid, sceneGraphArrayData, /* array */[], /* None */0);
  var match$1 = match[1];
  if (match$1) {
    return /* tuple */[
            match[0],
            match$1[0]
          ];
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_removeDragedTreeNodeFromSceneGrahph", "the draged treeNode " + (String(dragedUid) + " is not exist"), "", "", "dragedUid:" + (String(dragedUid) + "")));
  }
}

function _insertRemovedTreeNodeToTargetTreeNode(targetUid, param) {
  var dragedTreeNode = param[1];
  return param[0].map((function (treeNode) {
                var children = treeNode[/* children */2];
                var match = treeNode[/* uid */1] === targetUid;
                if (match) {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* children */ArrayService$WonderEditor.push(dragedTreeNode, children.slice())
                        ];
                } else {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* children */_insertRemovedTreeNodeToTargetTreeNode(targetUid, /* tuple */[
                                children,
                                dragedTreeNode
                              ])
                        ];
                }
              }));
}

function getDragedSceneGraphData(targetUid, dragedUid, sceneGraphArrayData) {
  return Contract$WonderLog.ensureCheck((function (dragedSceneGraph) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the draged scene graph data == scene data from engine", "not"), (function () {
                              return Contract$WonderLog.assertTrue(Caml_obj.caml_equal(StateLogicService$WonderEditor.getStateToGetData(getSceneGraphDataFromEngine), dragedSceneGraph));
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), _insertRemovedTreeNodeToTargetTreeNode(targetUid, _removeDragedTreeNodeFromSceneGrahph(dragedUid, sceneGraphArrayData)));
}

export {
  getFlag ,
  handleFlag ,
  unsafeGetSceneGraphDataFromStore ,
  _isDragedGameObjectBeTargetGameObjectParent ,
  _isTargetGameObjectBeRemovedGameObjectParent ,
  isGameObjectRelationError ,
  _getGameObjectName ,
  _buildTreeNode ,
  _buildSceneGraphData ,
  getSceneGraphDataFromEngine ,
  buildSceneGraphDataWithNewGameObject ,
  _removeDragedTreeNodeFromSceneGrahph ,
  _insertRemovedTreeNodeToTargetTreeNode ,
  getDragedSceneGraphData ,
  
}
/* Log-WonderLog Not a pure module */
