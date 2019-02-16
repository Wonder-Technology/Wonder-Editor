

import * as Matrix4Service$Wonderjs from "../../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Matrix4Service.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as ScaleBlurEventHandler$WonderEditor from "../../../../../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/eventHandler/ScaleBlurEventHandler.js";
import * as SelectScaleGizmoUtils$WonderEditor from "./SelectScaleGizmoUtils.js";
import * as AffectScaleGizmosUtils$WonderEditor from "./AffectScaleGizmosUtils.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as CurrentScaleGizmosUtils$WonderEditor from "./CurrentScaleGizmosUtils.js";
import * as InitTransformGizmosUtils$WonderEditor from "../InitTransformGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as AxisScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/AxisScaleGizmoSceneViewEditorService.js";
import * as OperateScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/scale/OperateScaleGizmoSceneViewEditorService.js";

function handleDragStartEvent($$event, param) {
  var engineState = param[1];
  var editorState = param[0];
  var __x = TransformGameObjectEngineService$WonderEditor.getLocalToWorldMatrixTypeArray(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetScaleWholeGizmo(editorState), engineState);
  var editorState$1 = OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartZAxisNormalizedVec(AxisScaleGizmoSceneViewEditorService$WonderEditor.getZAxisNormalizedVec(editorState, engineState), OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartYAxisNormalizedVec(AxisScaleGizmoSceneViewEditorService$WonderEditor.getYAxisNormalizedVec(editorState, engineState), OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartXAxisNormalizedVec(AxisScaleGizmoSceneViewEditorService$WonderEditor.getXAxisNormalizedVec(editorState, engineState), OperateScaleGizmoSceneViewEditorService$WonderEditor.setDragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray(Matrix4Service$Wonderjs.invert(__x, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)), OperateScaleGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartLocalScale(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodeLocalScale(editorState, engineState), editorState)))));
  var editorState$2 = SelectScaleGizmoUtils$WonderEditor.selectScaleGizmo($$event, engineState, editorState$1);
  return /* tuple */[
          editorState$2,
          engineState
        ];
}

function handleDragOverEvent($$event, param) {
  var match = AffectScaleGizmosUtils$WonderEditor.affectScaleGizmo($$event, /* tuple */[
        param[0],
        param[1]
      ]);
  var match$1 = InitTransformGizmosUtils$WonderEditor.refreshInspector(match[0], match[1]);
  var engineState = StateLogicService$WonderEditor.renderWhenStop(match$1[1]);
  return /* tuple */[
          match$1[0],
          engineState
        ];
}

function handleDragDropEvent($$event, param) {
  var engineState = param[1];
  var editorState = param[0];
  var currentSceneTreeNode = SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
  GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(currentSceneTreeNode, engineState);
  var engineState$1 = CurrentScaleGizmosUtils$WonderEditor.restoreScaleGizmoColor(editorState, engineState);
  var engineState$2 = StateLogicService$WonderEditor.renderWhenStop(InitTransformGizmosUtils$WonderEditor.pushUndoStack(OperateScaleGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalScale(editorState), ScaleBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], editorState, engineState$1));
  return /* tuple */[
          engineState$2,
          $$event
        ];
}

export {
  handleDragStartEvent ,
  handleDragOverEvent ,
  handleDragDropEvent ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
