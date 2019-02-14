

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as RayUtils$WonderEditor from "../../../rayCaster/RayUtils.js";
import * as CenterBoxUtils$WonderEditor from "./CenterBoxUtils.js";
import * as AxisScaleGizmoUtils$WonderEditor from "./AxisScaleGizmoUtils.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CurrentTransformGizmosUtils$WonderEditor from "../CurrentTransformGizmosUtils.js";
import * as SelectTranslationGizmoUtils$WonderEditor from "../translation/SelectTranslationGizmoUtils.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as AxisScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/AxisScaleGizmoSceneViewEditorService.js";
import * as SelectScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/SelectScaleGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as CenterBoxScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/CenterBoxScaleGizmoSceneViewEditorService.js";

var _isSelectScaleAxisGizmo = SelectTranslationGizmoUtils$WonderEditor.isSelectTranslationAxisGizmo;

function _isSelectScaleCenterBoxGizmo(scaleCenterBoxGizmo, ray, engineState, _) {
  return SelectTranslationGizmoUtils$WonderEditor.isIntersectMesh(scaleCenterBoxGizmo, ray, engineState);
}

function _selectAxisGizmo(ray, param, param$1) {
  var editorState = Curry._1(param[1], param$1[0]);
  var engineState = Curry._2(param[0], editorState, param$1[1]);
  var dragStartPointInLocalCoordinateSystem = Curry._2(param[2], ray, /* tuple */[
        editorState,
        engineState
      ]);
  return AxisScaleGizmoSceneViewEditorService$WonderEditor.setDragStartPointInLocalCoordinateSystem(dragStartPointInLocalCoordinateSystem, editorState);
}

function _selectCenterBoxGizmo($$event, setCurrentGizmoColorFunc, param) {
  var editorState = SelectScaleGizmoSceneViewEditorService$WonderEditor.onlySelectScaleCenterBoxGizmo(param[0]);
  Curry._2(setCurrentGizmoColorFunc, editorState, param[1]);
  return CenterBoxScaleGizmoSceneViewEditorService$WonderEditor.setDragStartMouseLocation(CenterBoxUtils$WonderEditor.getDragStartMouseLocationInViewForCenterBox($$event), editorState);
}

function _handleSelectAxisGizmo(ray, editorState, engineState) {
  var match = _isSelectScaleAxisGizmo(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo(editorState), ray, engineState, editorState);
  if (match) {
    var partial_arg = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo(editorState), engineState), engineState);
    return _selectAxisGizmo(ray, /* tuple */[
                (function (param, param$1) {
                    return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg, param, param$1);
                  }),
                SelectScaleGizmoSceneViewEditorService$WonderEditor.onlySelectScaleXAxisGizmo,
                AxisScaleGizmoUtils$WonderEditor.getIntersectedPointWithAxisInLocalCoordinateSystemForXAxis
              ], /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    var match$1 = _isSelectScaleAxisGizmo(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState), ray, engineState, editorState);
    if (match$1) {
      var partial_arg$1 = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState), engineState), engineState);
      return _selectAxisGizmo(ray, /* tuple */[
                  (function (param, param$1) {
                      return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg$1, param, param$1);
                    }),
                  SelectScaleGizmoSceneViewEditorService$WonderEditor.onlySelectScaleYAxisGizmo,
                  AxisScaleGizmoUtils$WonderEditor.getIntersectedPointWithAxisInLocalCoordinateSystemForYAxis
                ], /* tuple */[
                  editorState,
                  engineState
                ]);
    } else {
      var match$2 = _isSelectScaleAxisGizmo(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleZAxisGizmo(editorState), ray, engineState, editorState);
      if (match$2) {
        var partial_arg$2 = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleZAxisGizmo(editorState), engineState), engineState);
        return _selectAxisGizmo(ray, /* tuple */[
                    (function (param, param$1) {
                        return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg$2, param, param$1);
                      }),
                    SelectScaleGizmoSceneViewEditorService$WonderEditor.onlySelectScaleZAxisGizmo,
                    AxisScaleGizmoUtils$WonderEditor.getIntersectedPointWithAxisInLocalCoordinateSystemForZAxis
                  ], /* tuple */[
                    editorState,
                    engineState
                  ]);
      } else {
        return SelectScaleGizmoSceneViewEditorService$WonderEditor.markNotSelectAnyScaleGizmo(editorState);
      }
    }
  }
}

function _handleSelectCenterBoxGizmo($$event, ray, handleSelectAxisGizmoFunc, editorState, engineState) {
  var scaleCenterBoxGizmo = OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState);
  var match = SelectTranslationGizmoUtils$WonderEditor.isIntersectMesh(scaleCenterBoxGizmo, ray, engineState);
  if (match) {
    var partial_arg = GameObjectEngineService$WonderEditor.getAllBasicMaterials(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState), engineState), engineState);
    return _selectCenterBoxGizmo($$event, (function (param, param$1) {
                  return CurrentTransformGizmosUtils$WonderEditor.setCurrentGizmoColor(partial_arg, param, param$1);
                }), /* tuple */[
                editorState,
                engineState
              ]);
  } else {
    return Curry._3(handleSelectAxisGizmoFunc, ray, editorState, engineState);
  }
}

function selectScaleGizmo($$event, engineState, editorState) {
  var cameraGameObject = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var ray = RayUtils$WonderEditor.createPerspectiveCameraRayFromEvent($$event, cameraGameObject, /* tuple */[
        editorState,
        engineState
      ]);
  return _handleSelectCenterBoxGizmo($$event, ray, _handleSelectAxisGizmo, editorState, engineState);
}

export {
  _isSelectScaleAxisGizmo ,
  _isSelectScaleCenterBoxGizmo ,
  _selectAxisGizmo ,
  _selectCenterBoxGizmo ,
  _handleSelectAxisGizmo ,
  _handleSelectCenterBoxGizmo ,
  selectScaleGizmo ,
  
}
/* RayUtils-WonderEditor Not a pure module */
