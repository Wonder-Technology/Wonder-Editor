'use strict';

import * as Curry                        from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor        from "../../ui/store/AppStore.js";
import * as AllStateData$WonderEditor    from "../../state/AllStateData.js";
import * as UIStateHistory$WonderEditor  from "../../ui/history/UIStateHistory.js";
import * as EditorStateView$WonderEditor from "./EditorStateView.js";
import * as EngineStateView$WonderEditor from "./EngineStateView.js";

function storeHistoryState(uiState, editorState, engineState, historyState) {
  return EngineStateView$WonderEditor.storeEngineState(engineState, EditorStateView$WonderEditor.storeEditorState(editorState, UIStateHistory$WonderEditor.storeUIState(uiState, historyState)));
}

function undoHistoryState(store, dispatch) {
  EngineStateView$WonderEditor.setEngineState(EngineStateView$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), EngineStateView$WonderEditor.getEngineState(/* () */0)));
  EditorStateView$WonderEditor.setEditorState(EditorStateView$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), EditorStateView$WonderEditor.getEditorState(/* () */0)));
  return Curry._1(dispatch, [
              AppStore$WonderEditor.ReplaceState,
              UIStateHistory$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
            ]);
}

function redoHistoryState(store, dispatch) {
  EngineStateView$WonderEditor.setEngineState(EngineStateView$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), EngineStateView$WonderEditor.getEngineState(/* () */0)));
  EditorStateView$WonderEditor.setEditorState(EditorStateView$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), EditorStateView$WonderEditor.getEditorState(/* () */0)));
  return Curry._1(dispatch, [
              AppStore$WonderEditor.ReplaceState,
              UIStateHistory$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
            ]);
}

export {
  storeHistoryState ,
  undoHistoryState  ,
  redoHistoryState  ,
  
}
/* AllStateData-WonderEditor Not a pure module */
