

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as RayUtils$WonderEditor from "../../../rayCaster/RayUtils.js";
import * as AngleService$WonderEditor from "../../../../../../../service/primitive/AngleService.js";
import * as CoordinateUtils$WonderEditor from "../../../coordinate/CoordinateUtils.js";
import * as RayIntersectUtils$WonderEditor from "../../../rayCaster/RayIntersectUtils.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../service/state/engine/TransformEngineService.js";
import * as CircleRotationGizmosUtils$WonderEditor from "./CircleRotationGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as AngleRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/AngleRotationGizmoSceneViewEditorService.js";
import * as SelectRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/SelectRotationGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";
import * as CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/CoordinateSystemTransformGizmoSceneViewEditorService.js";

function _computeXYPlaneTotalAngle(param, param$1) {
  return Math.atan2(param$1[1], param$1[0]) * AngleService$WonderEditor.getRadToDeg(/* () */0) - Math.atan2(param[1], param[0]) * AngleService$WonderEditor.getRadToDeg(/* () */0);
}

function _computeXZPlaneTotalAngle(param, param$1) {
  return Math.atan2(param$1[0], param$1[2]) * AngleService$WonderEditor.getRadToDeg(/* () */0) - Math.atan2(param[0], param[2]) * AngleService$WonderEditor.getRadToDeg(/* () */0);
}

function _computeYZPlaneTotalAngle(param, param$1) {
  return Math.atan2(param$1[2], param$1[1]) * AngleService$WonderEditor.getRadToDeg(/* () */0) - Math.atan2(param[2], param[1]) * AngleService$WonderEditor.getRadToDeg(/* () */0);
}

function _computeNeedRotateAngle(totalAngle, editorState) {
  var match = AngleRotationGizmoSceneViewEditorService$WonderEditor.getLastTotalAngle(editorState);
  return totalAngle - (
          match !== undefined ? match : 0
        );
}

function _rotateCurrentSceneTreeNode(param, rotateOnAxisFunc, editorState, engineState) {
  return Curry._3(rotateOnAxisFunc, GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), /* tuple */[
              param[0],
              param[1]
            ], engineState);
}

function _affectGizmo(ray, param, computeTotalAngleFunc, param$1) {
  var engineState = param$1[1];
  var editorState = param$1[0];
  var match = RayIntersectUtils$WonderEditor.checkIntersectPlane(param[0], ray);
  var match$1;
  if (match !== undefined) {
    var localToWorldMatrixTypeArray = TransformGameObjectEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState), engineState);
    var dragStartPoint = AngleRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetDragStartPoint(editorState);
    var totalAngle = Curry._2(computeTotalAngleFunc, CoordinateUtils$WonderEditor.convertPosFromWorldToLocalCoordSystem(dragStartPoint, localToWorldMatrixTypeArray, engineState), CoordinateUtils$WonderEditor.convertPosFromWorldToLocalCoordSystem(match, localToWorldMatrixTypeArray, engineState));
    match$1 = /* tuple */[
      totalAngle,
      _computeNeedRotateAngle(totalAngle, editorState)
    ];
  } else {
    match$1 = /* tuple */[
      AngleRotationGizmoSceneViewEditorService$WonderEditor.getLastTotalAngle(editorState),
      0
    ];
  }
  var editorState$1 = AngleRotationGizmoSceneViewEditorService$WonderEditor.setLastTotalAngle(match$1[0], editorState);
  var match$2 = CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor.getCoordinateSystem(editorState$1);
  _rotateCurrentSceneTreeNode(/* tuple */[
        match$1[1],
        param[1]
      ], match$2 ? TransformEngineService$WonderEditor.rotateLocalOnAxis : TransformEngineService$WonderEditor.rotateWorldOnAxis, editorState$1, engineState);
  return /* tuple */[
          editorState$1,
          engineState
        ];
}

function affectRotationGizmo($$event, param) {
  var engineState = param[1];
  var editorState = param[0];
  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var ray = RayUtils$WonderEditor.createPerspectiveCameraRayFromEvent($$event, cameraGameObject, /* tuple */[
        editorState,
        engineState
      ]);
  var match = SelectRotationGizmoSceneViewEditorService$WonderEditor.isXYCircleGizmoSelected(editorState);
  if (match) {
    return _affectGizmo(ray, /* tuple */[
                CircleRotationGizmosUtils$WonderEditor.buildXYPlane(editorState, engineState),
                CircleRotationGizmosUtils$WonderEditor.getXYPlaneLocalAxis(/* () */0)
              ], _computeXYPlaneTotalAngle, /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    var match$1 = SelectRotationGizmoSceneViewEditorService$WonderEditor.isXZCircleGizmoSelected(editorState);
    if (match$1) {
      return _affectGizmo(ray, /* tuple */[
                  CircleRotationGizmosUtils$WonderEditor.buildXZPlane(editorState, engineState),
                  CircleRotationGizmosUtils$WonderEditor.getXZPlaneLocalAxis(/* () */0)
                ], _computeXZPlaneTotalAngle, /* tuple */[
                  editorState,
                  engineState
                ]);
    } else {
      var match$2 = SelectRotationGizmoSceneViewEditorService$WonderEditor.isYZCircleGizmoSelected(editorState);
      if (match$2) {
        return _affectGizmo(ray, /* tuple */[
                    CircleRotationGizmosUtils$WonderEditor.buildYZPlane(editorState, engineState),
                    CircleRotationGizmosUtils$WonderEditor.getYZPlaneLocalAxis(/* () */0)
                  ], _computeYZPlaneTotalAngle, /* tuple */[
                    editorState,
                    engineState
                  ]);
      } else {
        return /* tuple */[
                editorState,
                engineState
              ];
      }
    }
  }
}

export {
  _computeXYPlaneTotalAngle ,
  _computeXZPlaneTotalAngle ,
  _computeYZPlaneTotalAngle ,
  _computeNeedRotateAngle ,
  _rotateCurrentSceneTreeNode ,
  _affectGizmo ,
  affectRotationGizmo ,
  
}
/* RayUtils-WonderEditor Not a pure module */
