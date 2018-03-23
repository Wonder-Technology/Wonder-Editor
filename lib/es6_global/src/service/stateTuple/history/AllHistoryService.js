'use strict';

import * as Curry                                    from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                    from "../../../core/ui/store/AppStore.js";
import * as AllStateData$WonderEditor                from "../data/AllStateData.js";
import * as UIHistoryService$WonderEditor            from "./UIHistoryService.js";
import * as EditorHistoryService$WonderEditor        from "./EditorHistoryService.js";
import * as EngineForRunHistoryService$WonderEditor  from "./EngineForRunHistoryService.js";
import * as EngineForEditHistoryService$WonderEditor from "./EngineForEditHistoryService.js";

function storeHistoryState(store, editorState, engineStateForEdit, engineStateForRun, historyState) {
  return EngineForRunHistoryService$WonderEditor.storeState(engineStateForRun, EngineForEditHistoryService$WonderEditor.storeState(engineStateForEdit, EditorHistoryService$WonderEditor.storeState(editorState, UIHistoryService$WonderEditor.storeUIState(store, historyState))));
}

function undoHistoryState(store, dispatch, param) {
  Curry._1(dispatch, [
        AppStore$WonderEditor.ReplaceState,
        UIHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  return /* tuple */[
          EditorHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineForEditHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1]),
          EngineForRunHistoryService$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[2])
        ];
}

function redoHistoryState(store, dispatch, param) {
  Curry._1(dispatch, [
        AppStore$WonderEditor.ReplaceState,
        UIHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  return /* tuple */[
          EditorHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineForEditHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1]),
          EngineForRunHistoryService$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[2])
        ];
}

export {
  storeHistoryState ,
  undoHistoryState  ,
  redoHistoryState  ,
  
}
/* AllStateData-WonderEditor Not a pure module */
