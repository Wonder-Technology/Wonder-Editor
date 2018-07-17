

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable from "../../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as AllStateData$WonderEditor from "../../../../service/stateTuple/data/AllStateData.js";
import * as AllHistoryService$WonderEditor from "../../../../service/stateTuple/history/AllHistoryService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";

function _storeMarkRedoUndoState(store, param, historyState) {
  var newEngineStateForEdit = StateEngineService$WonderEditor.deepCopyForRestore(param[1]);
  var newEngineStateForRun = StateEngineService$WonderEditor.deepCopyForRestore(param[2]);
  return AllStateData$WonderEditor.setHistoryState(/* record */[
              /* markRedoUndoStack */Immutable.Stack[/* addFirst */17](/* tuple */[
                    store,
                    param[0],
                    newEngineStateForEdit,
                    newEngineStateForRun
                  ], historyState[/* markRedoUndoStack */0]),
              /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
              /* uiRedoStack */historyState[/* uiRedoStack */2],
              /* uiUndoStack */historyState[/* uiUndoStack */3],
              /* editorRedoStack */historyState[/* editorRedoStack */4],
              /* editorUndoStack */historyState[/* editorUndoStack */5],
              /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
              /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
              /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
              /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
            ]);
}

function _removeMarkRedoUndoFirst(historyState) {
  return /* record */[
          /* markRedoUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* markRedoUndoStack */0]),
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
          /* uiRedoStack */historyState[/* uiRedoStack */2],
          /* uiUndoStack */historyState[/* uiUndoStack */3],
          /* editorRedoStack */historyState[/* editorRedoStack */4],
          /* editorUndoStack */historyState[/* editorUndoStack */5],
          /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
          /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
          /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
          /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
        ];
}

function clearMarkRedoUndoStack(historyState) {
  return AllStateData$WonderEditor.setHistoryState(/* record */[
              /* markRedoUndoStack */Immutable.Stack[/* empty */20](/* () */0),
              /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
              /* uiRedoStack */historyState[/* uiRedoStack */2],
              /* uiUndoStack */historyState[/* uiUndoStack */3],
              /* editorRedoStack */historyState[/* editorRedoStack */4],
              /* editorUndoStack */historyState[/* editorUndoStack */5],
              /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
              /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
              /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
              /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
            ]);
}

function storeCopiedEngineStateHistory(store, param) {
  return AllStateData$WonderEditor.setHistoryState(AllHistoryService$WonderEditor.storeCopiedEngineHistoryState(store, /* tuple */[
                  param[0],
                  param[1],
                  param[2]
                ], AllStateData$WonderEditor.getHistoryState(/* () */0)));
}

function markRedoUndoChangeUI(store, param) {
  return AllStateData$WonderEditor.setHistoryState(AllHistoryService$WonderEditor.storeHistoryState(store, /* tuple */[
                  param[0],
                  param[1],
                  param[2]
                ], AllStateData$WonderEditor.getHistoryState(/* () */0)));
}

function markRedoUndoChangeNothing(historyState, store, stateTuple) {
  var match = Curry._1(Immutable.Stack[/* first */14], historyState[/* markRedoUndoStack */0]);
  if (match) {
    var match$1 = match[0];
    return _storeMarkRedoUndoState(store, stateTuple, AllHistoryService$WonderEditor.storeHistoryState(match$1[0], /* tuple */[
                    match$1[1],
                    match$1[2],
                    match$1[3]
                  ], _removeMarkRedoUndoFirst(historyState)));
  } else {
    return _storeMarkRedoUndoState(store, stateTuple, historyState);
  }
}

export {
  _storeMarkRedoUndoState ,
  _removeMarkRedoUndoFirst ,
  clearMarkRedoUndoStack ,
  storeCopiedEngineStateHistory ,
  markRedoUndoChangeUI ,
  markRedoUndoChangeNothing ,
  
}
/* Immutable Not a pure module */
