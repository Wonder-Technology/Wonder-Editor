'use strict';

import * as Immutable                      from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as EditorStateData$WonderEditor   from "../data/EditorStateData.js";
import * as HistoryStateUtils$WonderEditor from "../../../core/state/utils/HistoryStateUtils.js";

function getStateIsDebug() {
  return EditorStateData$WonderEditor.editorStateData[/* isDebug */1];
}

function getState() {
  return EditorStateData$WonderEditor.editorStateData[/* state */0];
}

function setState(state) {
  EditorStateData$WonderEditor.editorStateData[/* state */0] = state;
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

function storeState(currentState, historyState) {
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
  getStateIsDebug ,
  getState        ,
  setState        ,
  undo            ,
  redo            ,
  storeState      ,
  
}
/* Immutable Not a pure module */
