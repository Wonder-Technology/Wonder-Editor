

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../core/ui/store/AppStore.js";
import * as AllStateData$WonderEditor from "../data/AllStateData.js";
import * as UIHistoryService$WonderEditor from "./UIHistoryService.js";
import * as EditorHistoryService$WonderEditor from "./EditorHistoryService.js";
import * as EngineForRunHistoryService$WonderEditor from "./EngineForRunHistoryService.js";
import * as EngineForEditHistoryService$WonderEditor from "./EngineForEditHistoryService.js";

function storeCopiedEngineHistoryState(store, param, historyState) {
  return EngineForRunHistoryService$WonderEditor.storeHasCopyState(param[2], EngineForEditHistoryService$WonderEditor.storeHasCopyState(param[1], EditorHistoryService$WonderEditor.storeState(param[0], UIHistoryService$WonderEditor.storeUIState(store, historyState))));
}

function storeHistoryState(store, param, historyState) {
  return EngineForRunHistoryService$WonderEditor.storeNoCopyState(param[2], EngineForEditHistoryService$WonderEditor.storeNoCopyState(param[1], EditorHistoryService$WonderEditor.storeState(param[0], UIHistoryService$WonderEditor.storeUIState(store, historyState))));
}

function undoHistoryState(store, dispatchFunc, param) {
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.ReplaceState,
        UIHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */0]]
      ]);
  return /* tuple */[
          EditorHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineForEditHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1]),
          EngineForRunHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[2])
        ];
}

function redoHistoryState(store, dispatchFunc, param) {
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.ReplaceState,
        UIHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */0]]
      ]);
  return /* tuple */[
          EditorHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineForEditHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1]),
          EngineForRunHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[2])
        ];
}

export {
  storeCopiedEngineHistoryState ,
  storeHistoryState ,
  undoHistoryState ,
  redoHistoryState ,
  
}
/* AppStore-WonderEditor Not a pure module */
