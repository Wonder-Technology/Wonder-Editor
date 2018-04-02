'use strict';

import * as Log$WonderLog                                       from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AllStateData$WonderEditor                           from "../../service/stateTuple/data/AllStateData.js";
import * as LoopEngineService$WonderEditor                      from "../../service/state/engine/LoopEngineService.js";
import * as StateLogicService$WonderEditor                      from "../../service/stateTuple/logic/StateLogicService.js";
import * as EngineStateDataEditorService$WonderEditor           from "../../service/state/editor/EngineStateDataEditorService.js";
import * as RedoUndoForRunAndStopEventHandlerUtils$WonderEditor from "../ui/eventHandler/utils/redoUndoForRunAndStopEventHandlerUtils.js";

function run(store) {
  Log$WonderLog.print("it's start run");
  EngineStateDataEditorService$WonderEditor.setIsRun(/* true */1);
  RedoUndoForRunAndStopEventHandlerUtils$WonderEditor.storeRedoUndoForRunAndStop(store, StateLogicService$WonderEditor.getStateForHistory(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
  LoopEngineService$WonderEditor.loop(/* () */0);
  return /* () */0;
}

function stop(dispatch) {
  EngineStateDataEditorService$WonderEditor.setIsRun(/* false */0);
  return RedoUndoForRunAndStopEventHandlerUtils$WonderEditor.undo(dispatch, StateLogicService$WonderEditor.getEngineStateForEdit(/* () */0), StateLogicService$WonderEditor.getEngineStateForRun(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
}

export {
  run  ,
  stop ,
  
}
/* Log-WonderLog Not a pure module */
