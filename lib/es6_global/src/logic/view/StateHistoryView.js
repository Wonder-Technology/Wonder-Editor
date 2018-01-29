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

function _historyEngineState(operateHistoryFunc) {
  EngineStateView$WonderEditor.setEngineState(Curry._1(operateHistoryFunc, EngineStateView$WonderEditor.getEngineState(/* () */0)));
  return /* () */0;
}

function _historyEditorState(operateHistoryFunc) {
  EditorStateView$WonderEditor.setEditorState(Curry._1(operateHistoryFunc, EditorStateView$WonderEditor.getEditorState(/* () */0)));
  return /* () */0;
}

function undoHistoryState(store, dispatch) {
  var partial_arg = AllStateData$WonderEditor.getHistoryState(/* () */0);
  _historyEngineState((function (param) {
          return EngineStateView$WonderEditor.undo(partial_arg, param);
        }));
  var partial_arg$1 = AllStateData$WonderEditor.getHistoryState(/* () */0);
  _historyEditorState((function (param) {
          return EditorStateView$WonderEditor.undo(partial_arg$1, param);
        }));
  return Curry._1(dispatch, [
              AppStore$WonderEditor.ReplaceState,
              UIStateHistory$WonderEditor.undo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
            ]);
}

function redoHistoryState(store, dispatch) {
  var partial_arg = AllStateData$WonderEditor.getHistoryState(/* () */0);
  _historyEngineState((function (param) {
          return EngineStateView$WonderEditor.redo(partial_arg, param);
        }));
  var partial_arg$1 = AllStateData$WonderEditor.getHistoryState(/* () */0);
  _historyEditorState((function (param) {
          return EditorStateView$WonderEditor.redo(partial_arg$1, param);
        }));
  return Curry._1(dispatch, [
              AppStore$WonderEditor.ReplaceState,
              UIStateHistory$WonderEditor.redo(AllStateData$WonderEditor.getHistoryState(/* () */0), store)
            ]);
}

export {
  storeHistoryState   ,
  _historyEngineState ,
  _historyEditorState ,
  undoHistoryState    ,
  redoHistoryState    ,
  
}
/* AllStateData-WonderEditor Not a pure module */
