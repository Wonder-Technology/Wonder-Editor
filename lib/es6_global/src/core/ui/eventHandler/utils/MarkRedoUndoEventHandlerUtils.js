'use strict';

import * as Curry                          from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable                      from "../../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as AllStateData$WonderEditor      from "../../../state/AllStateData.js";
import * as StateHistoryView$WonderEditor  from "../../../logic/view/StateHistoryView.js";
import * as EngineStateFacade$WonderEditor from "../../../../facade/EngineStateFacade.js";

function _storeMarkRedoUndoState(uiState, param, historyState) {
  var newEngineState = EngineStateFacade$WonderEditor.deepCopyStateForRestore(param[1]);
  var newrecord = historyState.slice();
  return AllStateData$WonderEditor.setHistoryState((newrecord[/* markRedoUndoStack */0] = Immutable.Stack[/* addFirst */17](/* tuple */[
                    uiState,
                    param[0],
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

function markRedoUndoChangeUI(store, param) {
  _clearMarkRedoUndoStack(AllStateData$WonderEditor.getHistoryState(/* () */0));
  return AllStateData$WonderEditor.setHistoryState(StateHistoryView$WonderEditor.storeHistoryState(store, param[0], param[1], AllStateData$WonderEditor.getHistoryState(/* () */0)));
}

function markRedoUndoChangeNothing(historyState, uiState, stateTuple) {
  var match = Curry._1(Immutable.Stack[/* first */14], historyState[/* markRedoUndoStack */0]);
  if (match) {
    var match$1 = match[0];
    return _storeMarkRedoUndoState(uiState, stateTuple, StateHistoryView$WonderEditor.storeHistoryState(match$1[0], match$1[1], match$1[2], _removeMarkRedoUndoFirst(historyState)));
  } else {
    return _storeMarkRedoUndoState(uiState, stateTuple, historyState);
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
