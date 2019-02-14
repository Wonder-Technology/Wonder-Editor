

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as RayUtils$WonderEditor from "../../../rayCaster/RayUtils.js";
import * as Vector3Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as OptionService$WonderEditor from "../../../../../../../service/primitive/OptionService.js";
import * as CameraPosUtils$WonderEditor from "./CameraPosUtils.js";
import * as Vector3Service$WonderEditor from "../../../../../../../service/primitive/Vector3Service.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CircleRotationGizmosUtils$WonderEditor from "./CircleRotationGizmosUtils.js";
import * as ComputeRotationGizmosUtils$WonderEditor from "./ComputeRotationGizmosUtils.js";
import * as CurrentTransformGizmosUtils$WonderEditor from "../CurrentTransformGizmosUtils.js";
import * as ComputeTransformGizmoScaleUtils$WonderEditor from "../../../transform_gizmo/ComputeTransformGizmoScaleUtils.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as DataRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/DataRotationGizmoSceneViewEditorService.js";
import * as AngleRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/AngleRotationGizmoSceneViewEditorService.js";
import * as SelectRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/SelectRotationGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";

function _isSelectCircleNotVisiblePart(intersectPointInCircle, centerPoint, cameraPos) {
  return Vector3Service$WonderEditor.dot(Vector3Service$Wonderjs.normalize(Vector3Service$Wonderjs.sub(/* Float */0, centerPoint, intersectPointInCircle)), Vector3Service$Wonderjs.sub(/* Float */0, cameraPos, intersectPointInCircle)) >= 0.0;
}

function _isSelectCircle(intersectXYPlanePoint, editorState, engineState) {
  if (intersectXYPlanePoint !== undefined) {
    var intersectPoint = intersectXYPlanePoint;
    var match = _isSelectCircleNotVisiblePart(intersectPoint, CircleRotationGizmosUtils$WonderEditor.getCenterPoint(editorState, engineState), CameraPosUtils$WonderEditor.getCameraPos(editorState, engineState));
    if (match) {
      return false;
    } else {
      var radius = DataRotationGizmoSceneViewEditorService$WonderEditor.getRadius(/* () */0) * ComputeTransformGizmoScaleUtils$WonderEditor.getScaleFactor(editorState, engineState);
      var lengthToCenter = Vector3Service$WonderEditor.length(Vector3Service$Wonderjs.sub(/* Float */0, intersectPoint, CircleRotationGizmosUtils$WonderEditor.getCenterPoint(editorState, engineState)));
      if (lengthToCenter <= radius * (1 + 0.2)) {
        return lengthToCenter >= radius * (1 - 0.2);
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
}

function _selectCircle(intersectPlanePoint, param, editorState, engineState) {
  var editorState$1 = AngleRotationGizmoSceneViewEditorService$WonderEditor.setDragStartPoint(intersectPlanePoint, Curry._1(param[1], editorState));
  var engineState$1 = Curry._2(param[0], editorState$1, engineState);
  return /* tuple */[
          editorState$1,
          engineState$1
        ];
}

function selectRotationGizmo($$event, editorState, engineState) {
  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var ray = RayUtils$WonderEditor.createPerspectiveCameraRayFromEvent($$event, cameraGameObject, /* tuple */[
        editorState,
        engineState
      ]);
  var intersectXYPlanePoint = RayUtils$WonderEditor.checkIntersectPlane(CircleRotationGizmosUtils$WonderEditor.buildXYPlane(editorState, engineState), ray);
  var match = !ComputeRotationGizmosUtils$WonderEditor.isGizmoUnUsed(/* XYCircle */0, editorState, engineState) && _isSelectCircle(intersectXYPlanePoint, editorState, engineState);
  if (match) {
    var partial_arg = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo(editorState), engineState), engineState);
    return _selectCircle(OptionService$WonderEditor.unsafeGet(intersectXYPlanePoint), /* tuple */[
                (function (param, param$1) {
                    return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg, param, param$1);
                  }),
                SelectRotationGizmoSceneViewEditorService$WonderEditor.onlySelectXYCircleGizmo
              ], editorState, engineState);
  } else {
    var intersectXZPlanePoint = RayUtils$WonderEditor.checkIntersectPlane(CircleRotationGizmosUtils$WonderEditor.buildXZPlane(editorState, engineState), ray);
    var match$1 = !ComputeRotationGizmosUtils$WonderEditor.isGizmoUnUsed(/* XZCircle */1, editorState, engineState) && _isSelectCircle(intersectXZPlanePoint, editorState, engineState);
    if (match$1) {
      var partial_arg$1 = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXZCircleGizmo(editorState), engineState), engineState);
      return _selectCircle(OptionService$WonderEditor.unsafeGet(intersectXZPlanePoint), /* tuple */[
                  (function (param, param$1) {
                      return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg$1, param, param$1);
                    }),
                  SelectRotationGizmoSceneViewEditorService$WonderEditor.onlySelectXZCircleGizmo
                ], editorState, engineState);
    } else {
      var intersectYZPlanePoint = RayUtils$WonderEditor.checkIntersectPlane(CircleRotationGizmosUtils$WonderEditor.buildYZPlane(editorState, engineState), ray);
      var match$2 = !ComputeRotationGizmosUtils$WonderEditor.isGizmoUnUsed(/* YZCircle */2, editorState, engineState) && _isSelectCircle(intersectYZPlanePoint, editorState, engineState);
      if (match$2) {
        var partial_arg$2 = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationYZCircleGizmo(editorState), engineState), engineState);
        return _selectCircle(OptionService$WonderEditor.unsafeGet(intersectYZPlanePoint), /* tuple */[
                    (function (param, param$1) {
                        return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg$2, param, param$1);
                      }),
                    SelectRotationGizmoSceneViewEditorService$WonderEditor.onlySelectYZCircleGizmo
                  ], editorState, engineState);
      } else {
        return /* tuple */[
                SelectRotationGizmoSceneViewEditorService$WonderEditor.markNotSelectAnyRotationGizmo(editorState),
                engineState
              ];
      }
    }
  }
}

export {
  _isSelectCircleNotVisiblePart ,
  _isSelectCircle ,
  _selectCircle ,
  selectRotationGizmo ,
  
}
/* RayUtils-WonderEditor Not a pure module */
