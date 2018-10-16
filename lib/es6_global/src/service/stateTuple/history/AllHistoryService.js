

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../core/ui/store/AppStore.js";
import * as AllStateData$WonderEditor from "../data/AllStateData.js";
import * as UIHistoryService$WonderEditor from "./UIHistoryService.js";
import * as EditorHistoryService$WonderEditor from "./EditorHistoryService.js";
import * as EngineHistoryService$WonderEditor from "./EngineHistoryService.js";

function storeCopiedEngineHistoryState(store, param, historyState) {
  return EngineHistoryService$WonderEditor.storeHasCopyState(param[1], EditorHistoryService$WonderEditor.storeState(param[0], UIHistoryService$WonderEditor.storeUIState(store, historyState)));
}

function storeHistoryState(store, param, historyState) {
  return EngineHistoryService$WonderEditor.storeNoCopyState(param[1], EditorHistoryService$WonderEditor.storeState(param[0], UIHistoryService$WonderEditor.storeUIState(store, historyState)));
}

function undoHistoryState(store, dispatchFunc, param) {
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.ReplaceState,
        UIHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */1]]
      ]);
  return /* tuple */[
          EditorHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1])
        ];
}

function redoHistoryState(store, dispatchFunc, param) {
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.ReplaceState,
        UIHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */1]]
      ]);
  return /* tuple */[
          EditorHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1])
        ];
}

export {
  storeCopiedEngineHistoryState ,
  storeHistoryState ,
  undoHistoryState ,
  redoHistoryState ,
  
}
/* AppStore-WonderEditor Not a pure module */
