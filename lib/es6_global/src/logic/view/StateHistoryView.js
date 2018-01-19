'use strict';

import * as Curry                        from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor        from "../../ui/store/AppStore.js";
import * as UIStateHistory$WonderEditor  from "../../ui/history/UIStateHistory.js";
import * as EditorStateView$WonderEditor from "./EditorStateView.js";
import * as EngineStateView$WonderEditor from "./EngineStateView.js";

function storeAllState(uiState, editorState, engineState) {
  UIStateHistory$WonderEditor.storeUIState(uiState);
  EditorStateView$WonderEditor.storeEditorState(editorState);
  return EngineStateView$WonderEditor.storeEngineState(engineState);
}

function allStateGoBack(store, dispatch) {
  EngineStateView$WonderEditor.setEngineState(EngineStateView$WonderEditor.goBack(EngineStateView$WonderEditor.getEngineState(/* () */0)));
  EditorStateView$WonderEditor.setEditorState(EditorStateView$WonderEditor.goBack(EditorStateView$WonderEditor.getEditorState(/* () */0)));
  return Curry._1(dispatch, [
              AppStore$WonderEditor.ReplaceState,
              UIStateHistory$WonderEditor.goBack(store)
            ]);
}

function allStateGoForward(store, dispatch) {
  EngineStateView$WonderEditor.setEngineState(EngineStateView$WonderEditor.goForward(EngineStateView$WonderEditor.getEngineState(/* () */0)));
  EditorStateView$WonderEditor.setEditorState(EditorStateView$WonderEditor.goForward(EditorStateView$WonderEditor.getEditorState(/* () */0)));
  return Curry._1(dispatch, [
              AppStore$WonderEditor.ReplaceState,
              UIStateHistory$WonderEditor.goForward(store)
            ]);
}

export {
  storeAllState     ,
  allStateGoBack    ,
  allStateGoForward ,
  
}
/* UIStateHistory-WonderEditor Not a pure module */
