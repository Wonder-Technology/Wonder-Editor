'use strict';

import * as Curry                             from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor             from "../../../core/ui/store/AppStore.js";
import * as AllStateData$WonderEditor         from "../data/AllStateData.js";
import * as UIHistoryService$WonderEditor     from "./UIHistoryService.js";
import * as EditorHistoryService$WonderEditor from "./EditorHistoryService.js";
import * as EngineHistoryService$WonderEditor from "./EngineHistoryService.js";

function storeHistoryState(store, editorState, engineState, historyState) {
  return EngineHistoryService$WonderEditor.storeState(engineState, EditorHistoryService$WonderEditor.storeState(editorState, UIHistoryService$WonderEditor.storeUIState(store, historyState)));
}

function undoHistoryState(store, dispatch, param) {
  Curry._1(dispatch, [
        AppStore$WonderEditor.ReplaceState,
        UIHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  return /* tuple */[
          EditorHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1])
        ];
}

function redoHistoryState(store, dispatch, param) {
  Curry._1(dispatch, [
        AppStore$WonderEditor.ReplaceState,
        UIHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
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
