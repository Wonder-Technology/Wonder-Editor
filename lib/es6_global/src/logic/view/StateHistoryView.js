'use strict';

import * as Curry                        from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor        from "../../ui/store/AppStore.js";
import * as AllStateData$WonderEditor    from "../../state/AllStateData.js";
import * as UIStateHistory$WonderEditor  from "../../ui/history/UIStateHistory.js";
import * as EditorStateView$WonderEditor from "./EditorStateView.js";
import * as EngineStateView$WonderEditor from "./EngineStateView.js";

function storeAllState(uiState, editorState, engineState) {
  return AllStateData$WonderEditor.setAllState(EngineStateView$WonderEditor.storeEngineState(engineState, EditorStateView$WonderEditor.storeEditorState(editorState, UIStateHistory$WonderEditor.storeUIState(uiState, AllStateData$WonderEditor.getAllState(/* () */0)))));
}

function allStateGoBack(store, dispatch) {
  EngineStateView$WonderEditor.setEngineState(EngineStateView$WonderEditor.goBack(AllStateData$WonderEditor.getAllState(/* () */0), EngineStateView$WonderEditor.getEngineState(/* () */0)));
  EditorStateView$WonderEditor.setEditorState(EditorStateView$WonderEditor.goBack(AllStateData$WonderEditor.getAllState(/* () */0), EditorStateView$WonderEditor.getEditorState(/* () */0)));
  return Curry._1(dispatch, [
              AppStore$WonderEditor.ReplaceState,
              UIStateHistory$WonderEditor.goBack(AllStateData$WonderEditor.getAllState(/* () */0), store)
            ]);
}

function allStateGoForward(store, dispatch) {
  EngineStateView$WonderEditor.setEngineState(EngineStateView$WonderEditor.goForward(AllStateData$WonderEditor.getAllState(/* () */0), EngineStateView$WonderEditor.getEngineState(/* () */0)));
  EditorStateView$WonderEditor.setEditorState(EditorStateView$WonderEditor.goForward(AllStateData$WonderEditor.getAllState(/* () */0), EditorStateView$WonderEditor.getEditorState(/* () */0)));
  return Curry._1(dispatch, [
              AppStore$WonderEditor.ReplaceState,
              UIStateHistory$WonderEditor.goForward(AllStateData$WonderEditor.getAllState(/* () */0), store)
            ]);
}

export {
  storeAllState     ,
  allStateGoBack    ,
  allStateGoForward ,
  
}
/* AllStateData-WonderEditor Not a pure module */
