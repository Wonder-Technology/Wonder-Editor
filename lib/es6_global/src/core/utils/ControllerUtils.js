'use strict';

import * as Log$WonderLog                       from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AllStateData$WonderEditor           from "../../service/stateTuple/data/AllStateData.js";
import * as LoopEditorService$WonderEditor      from "../../service/state/editor/LoopEditorService.js";
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
          return SceneEditorService$WonderEditor.setIsRun(/* false */0, param);
        }));
  ControllerHistoryUtils$WonderEditor.restoreHistoryStack(dispatch, StateLogicService$WonderEditor.getEditEngineState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0), AllStateData$WonderEditor.getHistoryState(/* () */0));
  return StateLogicService$WonderEditor.getEditorState((function (editorState) {
                return LoopEngineService$WonderEditor.stopLoop(Log$WonderLog.print(LoopEditorService$WonderEditor.getLoopId(editorState)));
              }));
}

export {
  run  ,
  stop ,
  
}
/* Log-WonderLog Not a pure module */
