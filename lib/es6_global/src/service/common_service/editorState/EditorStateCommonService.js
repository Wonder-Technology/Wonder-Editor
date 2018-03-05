'use strict';

import * as Immutable                      from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as HistoryStateUtils$WonderEditor from "../../../core/state/utils/HistoryStateUtils.js";

function getState(data) {
  return data[/* state */0];
}

function setState(data, state) {
  data[/* state */0] = state;
  return state;
}

function undo(historyState, currentState) {
  return HistoryStateUtils$WonderEditor.operateHistory(currentState, historyState[/* editorUndoStack */4], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* uiRedoStack */historyState[/* uiRedoStack */1],
                        /* uiUndoStack */historyState[/* uiUndoStack */2],
                        /* editorRedoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* editorRedoStack */3]),
                        /* editorUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* editorUndoStack */4]),
                        /* engineRedoStack */historyState[/* engineRedoStack */5],
                        /* engineUndoStack */historyState[/* engineUndoStack */6]
                      ];
              }));
}

function redo(historyState, currentState) {
  return HistoryStateUtils$WonderEditor.operateHistory(currentState, historyState[/* editorRedoStack */3], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* uiRedoStack */historyState[/* uiRedoStack */1],
                        /* uiUndoStack */historyState[/* uiUndoStack */2],
                        /* editorRedoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* editorRedoStack */3]),
                        /* editorUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* editorUndoStack */4]),
                        /* engineRedoStack */historyState[/* engineRedoStack */5],
                        /* engineUndoStack */historyState[/* engineUndoStack */6]
                      ];
              }));
}

function storeEditorState(currentState, historyState) {
  return /* record */[
          /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
          /* uiRedoStack */historyState[/* uiRedoStack */1],
          /* uiUndoStack */historyState[/* uiUndoStack */2],
          /* editorRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* editorUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* editorUndoStack */4]),
          /* engineRedoStack */historyState[/* engineRedoStack */5],
          /* engineUndoStack */historyState[/* engineUndoStack */6]
        ];
}

export {
  getState         ,
  setState         ,
  undo             ,
  redo             ,
  storeEditorState ,
  
}
/* Immutable Not a pure module */
