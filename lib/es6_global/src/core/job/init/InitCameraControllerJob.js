

import * as TransformUtils$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as ManageEventEngineService$WonderEditor from "../../../service/state/engine/event/ManageEventEngineService.js";
import * as GameViewEventEditorService$WonderEditor from "../../../service/state/editor/event/GameViewEventEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function _isCurrentSceneTreeNodeHasArcballCameraControllerComponent(engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
  if (match !== undefined) {
    return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(match, engineState);
  } else {
    return false;
  }
}

function _handleTriggerRefreshInspectorEvent(engineState) {
  var match = _isCurrentSceneTreeNodeHasArcballCameraControllerComponent(engineState);
  if (match) {
    StateEngineService$WonderEditor.setState(engineState);
    StateLogicService$WonderEditor.getAndSetState(TransformUtils$WonderEditor.refreshTransform);
    return StateLogicService$WonderEditor.renderWhenStop(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  } else {
    return engineState;
  }
}

function initJob(param, engineState) {
  var engineState$1 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(GameViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0), (function ($$event, engineState) {
          return /* tuple */[
                  _handleTriggerRefreshInspectorEvent(engineState),
                  $$event
                ];
        }), engineState, undefined, /* () */0);
  var engineState$2 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(GameViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), (function ($$event, engineState) {
          return /* tuple */[
                  _handleTriggerRefreshInspectorEvent(engineState),
                  $$event
                ];
        }), engineState$1, undefined, /* () */0);
  return ManageEventEngineService$WonderEditor.onKeyboardEvent(/* KeyDown_GameView */10, (function ($$event, engineState) {
                return _handleTriggerRefreshInspectorEvent(engineState);
              }), engineState$2, undefined, /* () */0);
}

export {
  _isCurrentSceneTreeNodeHasArcballCameraControllerComponent ,
  _handleTriggerRefreshInspectorEvent ,
  initJob ,
  
}
/* TransformUtils-WonderEditor Not a pure module */
