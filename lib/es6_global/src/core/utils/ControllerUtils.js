'use strict';

import * as Log$WonderLog                             from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AllStateData$WonderEditor                 from "../../service/stateTuple/data/AllStateData.js";
import * as LoopEngineService$WonderEditor            from "../../service/state/engine/LoopEngineService.js";
import * as StateLogicService$WonderEditor            from "../../service/stateTuple/logic/StateLogicService.js";
import * as ControllerHistoryUtils$WonderEditor       from "./ControllerHistoryUtils.js";
import * as EngineStateDataEditorService$WonderEditor from "../../service/state/editor/EngineStateDataEditorService.js";

function run(store) {
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match !== 0) {
    Log$WonderLog.print("already run");
    return /* () */0;
  } else {
    EngineStateDataEditorService$WonderEditor.setIsRun(/* true */1);
    ControllerHistoryUtils$WonderEditor.copyHistoryStack(store, StateLogicService$WonderEditor.getStateForHistory(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
    LoopEngineService$WonderEditor.loop(/* () */0);
    return /* () */0;
  }
}

function stop(dispatch) {
  var match = EngineStateDataEditorService$WonderEditor.getIsRun(/* () */0);
  if (match !== 0) {
    EngineStateDataEditorService$WonderEditor.setIsRun(/* false */0);
    return ControllerHistoryUtils$WonderEditor.restoreHistoryStack(dispatch, StateLogicService$WonderEditor.getEditEngineState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
  } else {
    Log$WonderLog.print("already stop");
    return /* () */0;
  }
}

export {
  run  ,
  stop ,
  
}
/* Log-WonderLog Not a pure module */
