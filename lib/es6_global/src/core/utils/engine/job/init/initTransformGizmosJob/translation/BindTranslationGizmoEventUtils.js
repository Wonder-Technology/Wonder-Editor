

import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as InitTransformGizmosUtils$WonderEditor from "../InitTransformGizmosUtils.js";
import * as PositionBlurEventHandler$WonderEditor from "../../../../../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/eventHandler/PositionBlurEventHandler.js";
import * as SelectTranslationGizmoUtils$WonderEditor from "./SelectTranslationGizmoUtils.js";
import * as AffectTranslationGizmosUtils$WonderEditor from "./AffectTranslationGizmosUtils.js";
import * as CurrentTranslationGizmosUtils$WonderEditor from "./CurrentTranslationGizmosUtils.js";
import * as MoveTranslationPlaneGizmosUtils$WonderEditor from "./MoveTranslationPlaneGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as OperateTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/OperateTranslationGizmoSceneViewEditorService.js";

function handleDragStartEvent($$event, param) {
  var engineState = param[1];
  var editorState = param[0];
  var editorState$1 = OperateTranslationGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartPoint(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodePosition(editorState, engineState), editorState);
  var editorState$2 = SelectTranslationGizmoUtils$WonderEditor.selectTranslationGizmo($$event, engineState, OperateTranslationGizmoSceneViewEditorService$WonderEditor.setCurrentSceneTreeNodeStartLocalPosition(InitTransformGizmosUtils$WonderEditor.getCurrentSceneTreeNodeLocalPosition(editorState$1, engineState), editorState$1));
  return /* tuple */[
          editorState$2,
          engineState
        ];
}

function handleDragOverEvent($$event, param) {
  var match = AffectTranslationGizmosUtils$WonderEditor.affectTranslationGizmo($$event, /* tuple */[
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
  var engineState$1 = CurrentTranslationGizmosUtils$WonderEditor.restoreTranslationGizmoColor(editorState, MoveTranslationPlaneGizmosUtils$WonderEditor.moveTranslationPlaneGizmo(editorState, engineState));
  var engineState$2 = StateLogicService$WonderEditor.renderWhenStop(InitTransformGizmosUtils$WonderEditor.pushUndoStack(OperateTranslationGizmoSceneViewEditorService$WonderEditor.unsafeGetCurrentSceneTreeNodeStartLocalPosition(editorState), PositionBlurEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1], editorState, engineState$1));
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
/* StateLogicService-WonderEditor Not a pure module */
