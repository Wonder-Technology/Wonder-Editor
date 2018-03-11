'use strict';

import * as Curry                             from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor             from "../../core/ui/store/AppStore.js";
import * as AllStateData$WonderEditor         from "../../core/state/AllStateData.js";
import * as UIStateHistory$WonderEditor       from "../../core/ui/history/UIStateHistory.js";
import * as EditorHistoryService$WonderEditor from "./EditorHistoryService.js";
import * as EngineHistoryService$WonderEditor from "./EngineHistoryService.js";

function storeHistoryState(uiState, editorState, engineState, historyState) {
  return EngineHistoryService$WonderEditor.storeState(engineState, EditorHistoryService$WonderEditor.storeState(editorState, UIStateHistory$WonderEditor.storeUIState(uiState, historyState)));
}

function undoHistoryState(store, dispatch, param) {
  Curry._1(dispatch, [
        AppStore$WonderEditor.ReplaceState,
        UIStateHistory$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  return /* tuple */[
          EditorHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1])
        ];
}

function redoHistoryState(store, dispatch, param) {
  Curry._1(dispatch, [
        AppStore$WonderEditor.ReplaceState,
        UIStateHistory$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  return /* tuple */[
          EditorHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1])
        ];
}

export {
  storeHistoryState ,
  undoHistoryState  ,
  redoHistoryState  ,
  
}
/* AllStateData-WonderEditor Not a pure module */
