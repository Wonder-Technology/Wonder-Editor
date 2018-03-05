'use strict';

import * as Curry                          from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor          from "../../ui/store/AppStore.js";
import * as AllStateData$WonderEditor      from "../../state/AllStateData.js";
import * as UIStateHistory$WonderEditor    from "../../ui/history/UIStateHistory.js";
import * as EditorStateView$WonderEditor   from "./EditorStateView.js";
import * as EngineStateFacade$WonderEditor from "../../../facade/EngineStateFacade.js";

function storeHistoryState(uiState, editorState, engineState, historyState) {
  return EngineStateFacade$WonderEditor.storeEngineState(engineState, EditorStateView$WonderEditor.storeEditorState(editorState, UIStateHistory$WonderEditor.storeUIState(uiState, historyState)));
}

function undoHistoryState(store, dispatch, param) {
  Curry._1(dispatch, [
        AppStore$WonderEditor.ReplaceState,
        UIStateHistory$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  return /* tuple */[
          EditorStateView$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineStateFacade$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1])
        ];
}

function redoHistoryState(store, dispatch, param) {
  Curry._1(dispatch, [
        AppStore$WonderEditor.ReplaceState,
        UIStateHistory$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
      ]);
  return /* tuple */[
          EditorStateView$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]),
          EngineStateFacade$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), param[1])
        ];
}

export {
  storeHistoryState ,
  undoHistoryState  ,
  redoHistoryState  ,
  
}
/* AllStateData-WonderEditor Not a pure module */
