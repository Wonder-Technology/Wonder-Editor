

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as AABBShapeUtils$WonderEditor from "../initPickingJob/AABBShapeUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../service/state/engine/GeometryEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";

function _setArcballCameraControllerFocusRelatedAttribute(arcballCameraController, param, engineState) {
  return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(param[0], arcballCameraController, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTarget(arcballCameraController, param[1], engineState));
}

function _buildAllPointsAndLocalToWolrdMatrices(targetGameObject, engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(targetGameObject, engineState).filter((function (gameObject) {
                  return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState);
                })).map((function (gameObject) {
                var geometry = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
                return /* tuple */[
                        GeometryEngineService$WonderEditor.getGeometryVertices(geometry, engineState),
                        TransformGameObjectEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(gameObject, engineState)
                      ];
              }));
}

function _getFixedDistance(param) {
  return 3;
}

function _calcCenterAndDistance(targetGameObject, engineState) {
  var allPointsAndLocalToWolrdMatrices = _buildAllPointsAndLocalToWolrdMatrices(targetGameObject, engineState);
  if (allPointsAndLocalToWolrdMatrices.length === 0) {
    return /* tuple */[
            TransformGameObjectEngineService$WonderEditor.getPosition(targetGameObject, engineState),
            3
          ];
  } else {
    var aabb = AABBShapeUtils$WonderEditor.setFromAllPointsAndLocalToWolrdMatrices(_buildAllPointsAndLocalToWolrdMatrices(targetGameObject, engineState));
    var center = AABBShapeUtils$WonderEditor.getCenter(aabb);
    return /* tuple */[
            center,
            AABBShapeUtils$WonderEditor.calcRadiusOfAABB(aabb, center) * 2.5
          ];
  }
}

function setEditorCameraFocusTargetGameObject(editCamera, targetGameObject, editorState, engineState) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the editor camera should has arcballCameraController component", "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(editCamera, engineState));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var editorCameraArcballControllerComponent = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(editCamera, engineState);
  GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState);
  var match = _calcCenterAndDistance(targetGameObject, engineState);
  return _setArcballCameraControllerFocusRelatedAttribute(editorCameraArcballControllerComponent, /* tuple */[
              match[1],
              match[0]
            ], engineState);
}

export {
  _setArcballCameraControllerFocusRelatedAttribute ,
  _buildAllPointsAndLocalToWolrdMatrices ,
  _getFixedDistance ,
  _calcCenterAndDistance ,
  setEditorCameraFocusTargetGameObject ,
  
}
/* Log-WonderLog Not a pure module */
