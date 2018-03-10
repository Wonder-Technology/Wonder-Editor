'use strict';

import * as ArrayService$WonderEditor                     from "../../atom/ArrayService.js";
import * as SceneService$WonderEditor                     from "../../primitive/SceneService.js";
import * as TransformEngineService$WonderEditor           from "./TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor          from "./GameObjectEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

function _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, engineState) {
  var _targetTransform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(targetGameObject, engineState);
  var dragedTransform = GameObjectComponentEngineService$WonderEditor.getTransformComponent(dragedGameObject, engineState);
  var engineState$1 = engineState;
  while(true) {
    var targetTransform = _targetTransform;
    var match = TransformEngineService$WonderEditor.getParent(targetTransform, engineState$1);
    if (match == null) {
      return /* false */0;
    } else {
      var match$1 = +(match === dragedTransform);
      if (match$1 !== 0) {
        return /* true */1;
      } else {
        _targetTransform = match;
        continue ;
        
      }
    }
  };
}

function isGameObjectRelationError(targetGameObject, dragedGameObject, param) {
  var match = +(targetGameObject === dragedGameObject);
  if (match !== 0) {
    return /* true */1;
  } else {
    return _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, param[1]);
  }
}

function _getGameObjectName(gameObject, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.hasCameraControllerComponent(gameObject, engineState);
  if (match !== 0) {
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
    var match = GameObjectEngineService$WonderEditor.hasChildren(gameObject, engineState);
    if (match !== 0) {
      return GameObjectEngineService$WonderEditor.getChildren(gameObject, engineState).reduce((function (treeNode, child) {
                    return /* record */[
                            /* name */treeNode[/* name */0],
                            /* uid */treeNode[/* uid */1],
                            /* children */ArrayService$WonderEditor.push(_buildSceneGraphDataRec(child, _buildTreeNode(child, engineState), engineState), treeNode[/* children */2].slice())
                          ];
                  }), treeNode);
    } else {
      return treeNode;
    }
  };
  return _buildSceneGraphDataRec(gameObject, _buildTreeNode(gameObject, engineState), engineState);
}

function getSceneGraphDataFromEngine(param) {
  return /* array */[_buildSceneGraphData(SceneService$WonderEditor.unsafeGetScene(param[0]), param[1])];
}

function buildSceneGraphDataWithNewGameObject(newGameObject, oldSceneGraphData, param) {
  var scene = ArrayService$WonderEditor.getFirst(oldSceneGraphData);
  return /* array */[/* record */[
            /* name */scene[/* name */0],
            /* uid */scene[/* uid */1],
            /* children */ArrayService$WonderEditor.push(_buildTreeNode(newGameObject, param[1]), scene[/* children */2].slice())
          ]];
}

export {
  _isDragedGameObjectBeTargetGameObjectParent ,
  isGameObjectRelationError                   ,
  _getGameObjectName                          ,
  _buildTreeNode                              ,
  _buildSceneGraphData                        ,
  getSceneGraphDataFromEngine                 ,
  buildSceneGraphDataWithNewGameObject        ,
  
}
/* ArrayService-WonderEditor Not a pure module */
