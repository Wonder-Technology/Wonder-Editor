'use strict';

import * as AllStateData$WonderEditor           from "../../service/stateTuple/data/AllStateData.js";
import * as LoopEngineService$WonderEditor      from "../../service/state/engine/LoopEngineService.js";
import * as StateLogicService$WonderEditor      from "../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor     from "../../service/state/editor/SceneEditorService.js";
import * as StateHistoryService$WonderEditor    from "../../service/stateTuple/history/StateHistoryService.js";
import * as ControllerHistoryUtils$WonderEditor from "./ControllerHistoryUtils.js";

function run(store, _) {
  StateLogicService$WonderEditor.getEditorState((function (param) {
          return SceneEditorService$WonderEditor.setIsRun(/* true */1, param);
        }));
  ControllerHistoryUtils$WonderEditor.copyHistoryStack(store, StateHistoryService$WonderEditor.getStateForHistory(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
  LoopEngineService$WonderEditor.loop(/* () */0);
  return /* () */0;
}

function stop(dispatch, _) {
  StateLogicService$WonderEditor.getEditorState((function (param) {
          return SceneEditorService$WonderEditor.setIsRun(/* true */1, param);
        }));
  return ControllerHistoryUtils$WonderEditor.restoreHistoryStack(dispatch, StateLogicService$WonderEditor.getEditEngineState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
}

export {
  run  ,
  stop ,
  
}
/* AllStateData-WonderEditor Not a pure module */
