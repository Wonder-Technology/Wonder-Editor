

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as RenderScaleGizmosUtils$WonderEditor from "../../utils/engine/job/loop/renderTransformGizmosJob/RenderScaleGizmosUtils.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as RenderRotationGizmosUtils$WonderEditor from "../../utils/engine/job/loop/renderTransformGizmosJob/RenderRotationGizmosUtils.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../service/state/engine/DeviceManagerEngineService.js";
import * as RenderTranslationGizmosUtils$WonderEditor from "../../utils/engine/job/loop/renderTransformGizmosJob/RenderTranslationGizmosUtils.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";
import * as IsTransformGizmoRenderSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/IsTransformGizmoRenderSceneViewEditorService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

function _getTranslationAxisGameObjects(editorState, engineState) {
  return ArrayService$WonderEditor.fastMutableConcatArrays(/* array */[
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXAxisGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYAxisGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationZAxisGizmo(editorState), engineState)
            ]);
}

function _getTranslationPlaneGameObjects(editorState, engineState) {
  return ArrayService$WonderEditor.fastMutableConcatArrays(/* array */[
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXYPlaneGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationXZPlaneGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetTranslationYZPlaneGizmo(editorState), engineState)
            ]);
}

function _renderTransformGameObjects(param, engineState) {
  var gl = DeviceManagerEngineService$WonderEditor.unsafeGetGl(engineState);
  var engineState$1 = Curry._1(param[0], engineState);
  return Curry._1(param[2], Curry._2(param[1], gl, engineState$1));
}

function _renderTranslationGizmos(editorState, engineState) {
  var translationAxisGameObjects = _getTranslationAxisGameObjects(editorState, engineState);
  var translationPlaneGameObjects = _getTranslationPlaneGameObjects(editorState, engineState);
  var partial_arg = RenderTranslationGizmosUtils$WonderEditor.getRenderDataArr(translationPlaneGameObjects, engineState);
  var partial_arg$1 = RenderTranslationGizmosUtils$WonderEditor.getRenderDataArr(translationAxisGameObjects, engineState);
  return _renderTransformGameObjects(/* tuple */[
              RenderTranslationGizmosUtils$WonderEditor.prepareTranslationPlaneGlState,
              (function (param, param$1) {
                  return RenderTranslationGizmosUtils$WonderEditor.render(partial_arg, param, param$1);
                }),
              RenderTranslationGizmosUtils$WonderEditor.restoreTranslationPlaneGlState
            ], _renderTransformGameObjects(/* tuple */[
                  RenderTranslationGizmosUtils$WonderEditor.prepareTranslationAxisGlState,
                  (function (param, param$1) {
                      return RenderTranslationGizmosUtils$WonderEditor.render(partial_arg$1, param, param$1);
                    }),
                  RenderTranslationGizmosUtils$WonderEditor.restoreTranslationAxisGlState
                ], engineState));
}

function _getRotationGameObjectData(editorState) {
  return /* array */[
          /* tuple */[
            OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXYCircleGizmo(editorState),
            /* XYCircle */0
          ],
          /* tuple */[
            OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationXZCircleGizmo(editorState),
            /* XZCircle */1
          ],
          /* tuple */[
            OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetRotationYZCircleGizmo(editorState),
            /* YZCircle */2
          ]
        ];
}

function _renderRotationGizmos(editorState, engineState) {
  var partial_arg = RenderRotationGizmosUtils$WonderEditor.getRenderDataArr(_getRotationGameObjectData(editorState), engineState);
  return _renderTransformGameObjects(/* tuple */[
              RenderRotationGizmosUtils$WonderEditor.prepareRotationGlState,
              (function (param, param$1) {
                  return RenderRotationGizmosUtils$WonderEditor.render(editorState, partial_arg, param, param$1);
                }),
              RenderRotationGizmosUtils$WonderEditor.restoreRotationGlState
            ], engineState);
}

function _getScaleGameObjects(editorState, engineState) {
  return ArrayService$WonderEditor.fastMutableConcatArrays(/* array */[
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleXAxisGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleYAxisGizmo(editorState), engineState),
              HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleZAxisGizmo(editorState), engineState),
              /* array */[OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleCenterBoxGizmo(editorState)]
            ]);
}

function _renderScaleGizmos(editorState, engineState) {
  var scaleGameObjects = _getScaleGameObjects(editorState, engineState);
  var partial_arg = RenderScaleGizmosUtils$WonderEditor.getRenderDataArr(scaleGameObjects, engineState);
  return _renderTransformGameObjects(/* tuple */[
              RenderScaleGizmosUtils$WonderEditor.prepareScaleGlState,
              (function (param, param$1) {
                  return RenderScaleGizmosUtils$WonderEditor.render(partial_arg, param, param$1);
                }),
              RenderScaleGizmosUtils$WonderEditor.restoreScaleGlState
            ], engineState);
}

function renderJob(param, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = IsTransformGizmoRenderSceneViewEditorService$WonderEditor.isTransformGizmoRender(editorState, engineState);
  if (match) {
    SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
    var match$1 = CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(editorState);
    switch (match$1) {
      case 0 : 
          return _renderTranslationGizmos(editorState, engineState);
      case 1 : 
          return _renderRotationGizmos(editorState, engineState);
      case 2 : 
          return _renderScaleGizmos(editorState, engineState);
      
    }
  } else {
    return engineState;
  }
}

export {
  _getTranslationAxisGameObjects ,
  _getTranslationPlaneGameObjects ,
  _renderTransformGameObjects ,
  _renderTranslationGizmos ,
  _getRotationGameObjectData ,
  _renderRotationGizmos ,
  _getScaleGameObjects ,
  _renderScaleGizmos ,
  renderJob ,
  
}
/* ArrayService-WonderEditor Not a pure module */
