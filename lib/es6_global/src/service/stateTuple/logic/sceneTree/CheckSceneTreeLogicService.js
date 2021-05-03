

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as TransformEngineService$WonderEditor from "../../../state/engine/TransformEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectComponentEngineService.js";

function _judgeAllParents(_targetTransform, draggedTransform, engineState) {
  while(true) {
    var targetTransform = _targetTransform;
    var match = TransformEngineService$WonderEditor.getParent(targetTransform, engineState);
    if (match !== undefined) {
      var transformParent = match;
      var match$1 = transformParent === draggedTransform;
      if (match$1) {
        return true;
      } else {
        _targetTransform = transformParent;
        continue ;
      }
    } else {
      return false;
    }
  };
}

function _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, draggedGameObject, engineState) {
  return _judgeAllParents(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState), GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(draggedGameObject, engineState), engineState);
}

function _checkTargetGameObjectBeDragedGameObjectParent(draggedGameObject, targetGameObject, engineState) {
  var match = TransformEngineService$WonderEditor.getParent(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(draggedGameObject, engineState), engineState);
  if (match !== undefined) {
    var match$1 = match === GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState);
    if (match$1) {
      return /* Fail */Block.__(1, ["target gameObject shouldn't be the parent of source gameObject"]);
    } else {
      return /* Success */Block.__(0, [/* () */0]);
    }
  } else {
    return /* Success */Block.__(0, [/* () */0]);
  }
}

function checkGameObjectRelation(draggedGameObject, targetGameObject, param) {
  var engineState = param[1];
  var match = targetGameObject === draggedGameObject;
  if (match) {
    return /* Fail */Block.__(1, ["source and target gameObject shouldn't be the same"]);
  } else {
    var match$1 = _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, draggedGameObject, engineState);
    if (match$1) {
      return /* Fail */Block.__(1, ["source gameObject shouldn't be the parent of the target gameObject"]);
    } else {
      return _checkTargetGameObjectBeDragedGameObjectParent(draggedGameObject, targetGameObject, engineState);
    }
  }
}

export {
  _judgeAllParents ,
  _isDragedGameObjectBeTargetGameObjectParent ,
  _checkTargetGameObjectBeDragedGameObjectParent ,
  checkGameObjectRelation ,
  
}
/* TransformEngineService-WonderEditor Not a pure module */
