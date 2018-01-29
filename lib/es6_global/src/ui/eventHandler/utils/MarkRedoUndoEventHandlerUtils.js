'use strict';

import * as Curry                            from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable                        from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as AllStateData$WonderEditor        from "../../../state/AllStateData.js";
import * as EngineStateView$WonderEditor     from "../../../logic/view/EngineStateView.js";
import * as StateHistoryView$WonderEditor    from "../../../logic/view/StateHistoryView.js";
import * as MainEditorStateView$WonderEditor from "../../../component/mainEditor/logic/view/MainEditorStateView.js";

function _storeMarkRedoUndoState(uiState, historyState) {
  var match = MainEditorStateView$WonderEditor.prepareState(/* () */0);
  var newEngineState = EngineStateView$WonderEditor.deepCopyStateForRestore(match[1]);
  var newrecord = historyState.slice();
  return AllStateData$WonderEditor.setHistoryState((newrecord[/* markRedoUndoStack */0] = Immutable.Stack[/* addFirst */17](/* tuple */[
                    uiState,
                    match[0],
                    newEngineState
                  ], historyState[/* markRedoUndoStack */0]), newrecord));
}

function _removeMarkRedoUndoFirst(historyState) {
  var newrecord = historyState.slice();
  newrecord[/* markRedoUndoStack */0] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* markRedoUndoStack */0]);
  return newrecord;
}

function _clearMarkRedoUndoStack(historyState) {
  var newrecord = historyState.slice();
  return AllStateData$WonderEditor.setHistoryState((newrecord[/* markRedoUndoStack */0] = Immutable.Stack[/* empty */20](/* () */0), newrecord));
}

function markRedoUndoChangeUI(store) {
  _clearMarkRedoUndoStack(AllStateData$WonderEditor.getHistoryState(/* () */0));
  var match = MainEditorStateView$WonderEditor.prepareState(/* () */0);
  return AllStateData$WonderEditor.setHistoryState(StateHistoryView$WonderEditor.storeHistoryState(store, match[0], match[1], AllStateData$WonderEditor.getHistoryState(/* () */0)));
}

function markRedoUndoChangeNothing(historyState, uiState) {
  var match = Curry._1(Immutable.Stack[/* first */14], historyState[/* markRedoUndoStack */0]);
  if (match) {
    var match$1 = match[0];
    return _storeMarkRedoUndoState(uiState, StateHistoryView$WonderEditor.storeHistoryState(match$1[0], match$1[1], match$1[2], _removeMarkRedoUndoFirst(historyState)));
  } else {
    return _storeMarkRedoUndoState(uiState, historyState);
  }
}

export {
  _storeMarkRedoUndoState   ,
  _removeMarkRedoUndoFirst  ,
  _clearMarkRedoUndoStack   ,
  markRedoUndoChangeUI      ,
  markRedoUndoChangeNothing ,
  
}
/* Immutable Not a pure module */
