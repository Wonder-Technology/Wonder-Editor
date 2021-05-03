

import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../service/state/engine/TransformEngineService.js";
import * as ComputeTransformGizmoScaleUtils$WonderEditor from "../../utils/engine/job/transform_gizmo/ComputeTransformGizmoScaleUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";
import * as IsTransformGizmoRenderSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/IsTransformGizmoRenderSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";
import * as CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/CoordinateSystemTransformGizmoSceneViewEditorService.js";

function _moveWholeGizmoToCurrentSceneTreeNode(currentSceneTreeNode, wholeGizmo, engineState) {
  var currentSceneTreeNodeTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(currentSceneTreeNode, engineState);
  var wholeGizmoTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(wholeGizmo, engineState);
  return TransformEngineService$WonderEditor.setPosition(wholeGizmoTransform, TransformEngineService$WonderEditor.getPosition(currentSceneTreeNodeTransform, engineState), engineState);
}

function _scaleWholeGizmo(currentSceneTreeNode, cameraGameObject, wholeGizmo, engineState) {
  var scaleComponent = ComputeTransformGizmoScaleUtils$WonderEditor.computeScaleComponentBasedOnDistanceToCamera(TransformGameObjectEngineService$WonderEditor.getPosition(cameraGameObject, engineState), TransformGameObjectEngineService$WonderEditor.getPosition(currentSceneTreeNode, engineState));
  return TransformGameObjectEngineService$WonderEditor.setLocalScale(wholeGizmo, /* tuple */[
              scaleComponent,
              scaleComponent,
              scaleComponent
            ], engineState);
}

function _setWholeGizmoRotation(wholeGizmo, param, editorState, engineState) {
  var currentSceneTreeNode = param[0];
  var wholeGizmoTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(wholeGizmo, engineState);
  if (param[1] >= 2) {
    var currentSceneTreeNodeTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(currentSceneTreeNode, engineState);
    return TransformEngineService$WonderEditor.setEulerAngles(wholeGizmoTransform, TransformEngineService$WonderEditor.getEulerAngles(currentSceneTreeNodeTransform, engineState), engineState);
  } else if (param[2]) {
    var currentSceneTreeNodeTransform$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(currentSceneTreeNode, engineState);
    return TransformEngineService$WonderEditor.setEulerAngles(wholeGizmoTransform, TransformEngineService$WonderEditor.getEulerAngles(currentSceneTreeNodeTransform$1, engineState), engineState);
  } else {
    return TransformEngineService$WonderEditor.setEulerAngles(wholeGizmoTransform, /* tuple */[
                0,
                0,
                0
              ], engineState);
  }
}

function updateTransformJob(param, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = IsTransformGizmoRenderSceneViewEditorService$WonderEditor.isTransformGizmoRender(editorState, engineState);
  if (match) {
    var currentSceneTreeNode = SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
    var currentGizmoType = CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(editorState);
    var wholeGizmo;
    switch (currentGizmoType) {
      case 0 : 
          wholeGizmo = OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationWholeGizmo(editorState);
          break;
      case 1 : 
          wholeGizmo = OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationWholeGizmo(editorState);
          break;
      case 2 : 
          wholeGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState);
          break;
      
    }
    var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
    var engineState$1 = _scaleWholeGizmo(currentSceneTreeNode, cameraGameObject, wholeGizmo, _moveWholeGizmoToCurrentSceneTreeNode(currentSceneTreeNode, wholeGizmo, engineState));
    return _setWholeGizmoRotation(wholeGizmo, /* tuple */[
                currentSceneTreeNode,
                currentGizmoType,
                CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor.getCoordinateSystem(editorState)
              ], editorState, engineState$1);
  } else {
    return engineState;
  }
}

export {
  _moveWholeGizmoToCurrentSceneTreeNode ,
  _scaleWholeGizmo ,
  _setWholeGizmoRotation ,
  updateTransformJob ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
