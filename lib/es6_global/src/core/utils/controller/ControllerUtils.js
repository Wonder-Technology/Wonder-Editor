

import * as AllStateData$WonderEditor from "../../../service/stateTuple/data/AllStateData.js";
import * as LoopEditorService$WonderEditor from "../../../service/state/editor/LoopEditorService.js";
import * as LoopEngineService$WonderEditor from "../../../service/state/engine/LoopEngineService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../service/state/editor/scene/SceneEditorService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as StateHistoryService$WonderEditor from "../../../service/stateTuple/history/StateHistoryService.js";
import * as ControllerHistoryUtils$WonderEditor from "./ControllerHistoryUtils.js";
import * as ArcballCameraControllerLogicService$WonderEditor from "../../../service/stateTuple/logic/ArcballCameraControllerLogicService.js";

function run(store) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return SceneEditorService$WonderEditor.setIsRun(true, param);
        }));
  ControllerHistoryUtils$WonderEditor.copyHistoryStack(store, StateHistoryService$WonderEditor.getStateForHistory(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
  StateEngineService$WonderEditor.setState(ArcballCameraControllerLogicService$WonderEditor.bindGameViewActiveCameraArcballCameraControllerEvent(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  LoopEngineService$WonderEditor.loop(/* () */0);
  return /* () */0;
}

function stop(dispatchFunc) {
  LoopEngineService$WonderEditor.stopLoop(LoopEditorService$WonderEditor.getLoopId(StateEditorService$WonderEditor.getState(/* () */0)));
  ControllerHistoryUtils$WonderEditor.restoreHistoryStack(dispatchFunc, StateEngineService$WonderEditor.unsafeGetState(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
  StateEngineService$WonderEditor.setState(ArcballCameraControllerLogicService$WonderEditor.unbindGameViewActiveCameraArcballCameraControllerEvent(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return SceneEditorService$WonderEditor.setIsRun(false, param);
        }));
  return /* () */0;
}

export {
  run ,
  stop ,
  
}
/* AllStateData-WonderEditor Not a pure module */
