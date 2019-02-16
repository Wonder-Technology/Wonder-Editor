

import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as TransformEditorService$WonderEditor from "../../../../../../../service/state/editor/transform/TransformEditorService.js";
import * as InitTransformGizmosUtils$WonderEditor from "../InitTransformGizmosUtils.js";
import * as RotationBlurEventHandler$WonderEditor from "../../../../../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/eventHandler/RotationBlurEventHandler.js";
import * as SelectRotationGizmoUtils$WonderEditor from "./SelectRotationGizmoUtils.js";
import * as AffectRotationGizmosUtils$WonderEditor from "./AffectRotationGizmosUtils.js";
import * as CurrentRotationGizmosUtils$WonderEditor from "./CurrentRotationGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as AngleRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/AngleRotationGizmoSceneViewEditorService.js";
import * as OperateRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/OperateRotationGizmoSceneViewEditorService.js";

function handleDragStartEvent($$event, param) {
  var engineState = param[1];
  var editorState = param[0];
  var editorState$1 = OperateRotationGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartLocalEulerAngles(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodeLocalEulerAngles(editorState, engineState), editorState);
  return SelectRotationGizmoUtils$WonderEditor.selectRotationGizmo($$event, editorState$1, engineState);
}

function _refreshInspectorForRotation(editorState, engineState) {
  var editorState$1 = TransformEditorService$WonderEditor.removeLocalEulerAngleData(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState), engineState), editorState);
  return InitTransformGizmosUtils$WonderEditor.refreshInspector(editorState$1, engineState);
}

function handleDragOverEvent($$event, param) {
  var match = AffectRotationGizmosUtils$WonderEditor.affectRotationGizmo($$event, /* tuple */[
        param[0],
        param[1]
      ]);
  var match$1 = _refreshInspectorForRotation(match[0], match[1]);
  var engineState = StateLogicService$WonderEditor.renderWhenStop(match$1[1]);
  return /* tuple */[
          match$1[0],
          engineState
        ];
}

function handleDragDropEvent($$event, param) {
  var editorState = AngleRotationGizmoSceneViewEditorService$WonderEditor.setLastTotalAngle(undefined, param[0]);
  var engineState = CurrentRotationGizmosUtils$WonderEditor.restoreRotationGizmoColor(editorState, param[1]);
  var engineState$1 = StateLogicService$WonderEditor.renderWhenStop(InitTransformGizmosUtils$WonderEditor.pushUndoStack(OperateRotationGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalEulerAngles(editorState), RotationBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], editorState, engineState));
  return /* tuple */[
          engineState$1,
          $$event
        ];
}

export {
  handleDragStartEvent ,
  _refreshInspectorForRotation ,
  handleDragOverEvent ,
  handleDragDropEvent ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
