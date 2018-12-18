

import * as TransformEngineService$WonderEditor from "../../../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function getWidget(param) {
  return /* SceneTree */0;
}

function isWidget(startWidget) {
  if (startWidget !== undefined) {
    return startWidget === /* SceneTree */0;
  } else {
    return false;
  }
}

function _judgeAllParents(_targetTransform, dragedTransform, engineState) {
  while(true) {
    var targetTransform = _targetTransform;
    var match = TransformEngineService$WonderEditor.getParent(targetTransform, engineState);
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

function _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, engineState) {
  return _judgeAllParents(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState), GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(dragedGameObject, engineState), engineState);
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

export {
  getWidget ,
  isWidget ,
  _judgeAllParents ,
  _isDragedGameObjectBeTargetGameObjectParent ,
  _isTargetGameObjectBeRemovedGameObjectParent ,
  isGameObjectRelationError ,
  
}
/* TransformEngineService-WonderEditor Not a pure module */
