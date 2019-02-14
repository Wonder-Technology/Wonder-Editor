

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../ui/store/AppStore.js";
import * as UIStateService$WonderEditor from "../../../service/state/ui/UIStateService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
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

function _refreshInspector() {
  var dispatchFunc = UIStateService$WonderEditor.getDispatch(/* () */0);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Inspector */2]]
      ]);
  return /* () */0;
}

function _handleTriggerRefreshInspectorEvent(engineState) {
  var match = _isCurrentSceneTreeNodeHasArcballCameraControllerComponent(engineState);
  if (match) {
    StateEngineService$WonderEditor.setState(engineState);
    _refreshInspector(/* () */0);
    return StateLogicService$WonderEditor.renderWhenStop(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  } else {
    return engineState;
  }
}

function initJob(_, engineState) {
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
  return ManageEventEngineService$WonderEditor.onKeyboardEvent(/* KeyDown_GameView */10, (function (_, engineState) {
                return _handleTriggerRefreshInspectorEvent(engineState);
              }), engineState$2, undefined, /* () */0);
}

export {
  _isCurrentSceneTreeNodeHasArcballCameraControllerComponent ,
  _refreshInspector ,
  _handleTriggerRefreshInspectorEvent ,
  initJob ,
  
}
/* AppStore-WonderEditor Not a pure module */
