

import * as ResizeUtils$WonderEditor from "../ui/ResizeUtils.js";
import * as AllStateData$WonderEditor from "../../../service/stateTuple/data/AllStateData.js";
import * as InitScriptJobUtils$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/job/utils/InitScriptJobUtils.js";
import * as LoopEditorService$WonderEditor from "../../../service/state/editor/LoopEditorService.js";
import * as LoopEngineService$WonderEditor from "../../../service/state/engine/LoopEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as StateHistoryService$WonderEditor from "../../../service/stateTuple/history/StateHistoryService.js";
import * as GameViewEditorService$WonderEditor from "../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as ControllerHistoryUtils$WonderEditor from "./ControllerHistoryUtils.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as ScriptEventFunctionEngineService$WonderEditor from "../../../service/state/engine/script/ScriptEventFunctionEngineService.js";
import * as ArcballCameraControllerLogicService$WonderEditor from "../../../service/stateTuple/logic/ArcballCameraControllerLogicService.js";

function _runInitScriptJob(engineState) {
  return ScriptEventFunctionEngineService$WonderEditor.disableScriptEventFunction(InitScriptJobUtils$Wonderjs.exec(ScriptEventFunctionEngineService$WonderEditor.enableScriptEventFunction(engineState)));
}

function run(uiState) {
  StateEditorService$WonderEditor.setIsRun(true);
  ControllerHistoryUtils$WonderEditor.copyHistoryStack(uiState, StateHistoryService$WonderEditor.getStateForHistory(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
  var engineState = ArcballCameraControllerLogicService$WonderEditor.bindGameViewActiveCameraArcballCameraControllerEvent(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  StateEngineService$WonderEditor.setState(ScriptEventFunctionEngineService$WonderEditor.disableScriptEventFunction(InitScriptJobUtils$Wonderjs.exec(ScriptEventFunctionEngineService$WonderEditor.enableScriptEventFunction(engineState))));
  LoopEngineService$WonderEditor.loop(/* () */0);
  return /* () */0;
}

function _restoreScreen(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = SceneViewEditorService$WonderEditor.hasViewRect(editorState);
  if (match) {
    var match$1 = ResizeUtils$WonderEditor.isViewSizeChange(SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState), GameViewEditorService$WonderEditor.unsafeGetViewRect(editorState), ResizeUtils$WonderEditor.getCanvasSize(/* () */0));
    if (match$1) {
      return ResizeUtils$WonderEditor.resizeMainCanvasScreen(/* () */0);
    } else {
      return /* () */0;
    }
  } else {
    return /* () */0;
  }
}

function stop(dispatchFunc) {
  StateEditorService$WonderEditor.setIsRun(false);
  LoopEngineService$WonderEditor.stopLoop(LoopEditorService$WonderEditor.getLoopId(StateEditorService$WonderEditor.getState(/* () */0)));
  ControllerHistoryUtils$WonderEditor.restoreHistoryStack(dispatchFunc, /* tuple */[
        StateEditorService$WonderEditor.getState(/* () */0),
        StateEngineService$WonderEditor.unsafeGetState(/* () */0),
        AllStateData$WonderEditor.getHistoryState(/* () */0)
      ]);
  StateEngineService$WonderEditor.setState(ArcballCameraControllerLogicService$WonderEditor.unbindGameViewActiveCameraArcballCameraControllerEvent(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return _restoreScreen(/* () */0);
}

export {
  _runInitScriptJob ,
  run ,
  _restoreScreen ,
  stop ,
  
}
/* ResizeUtils-WonderEditor Not a pure module */
