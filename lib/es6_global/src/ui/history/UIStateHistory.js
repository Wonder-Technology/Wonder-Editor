'use strict';

import * as Immutable                      from "../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as HistoryStateUtils$WonderEditor from "../../state/utils/HistoryStateUtils.js";

function undo(historyState, currentState) {
  return HistoryStateUtils$WonderEditor.operateHistory(currentState, historyState[/* uiUndoStack */2], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* uiRedoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* uiRedoStack */1]),
                        /* uiUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* uiUndoStack */2]),
                        /* editorRedoStack */historyState[/* editorRedoStack */3],
                        /* editorUndoStack */historyState[/* editorUndoStack */4],
                        /* engineRedoStack */historyState[/* engineRedoStack */5],
                        /* engineUndoStack */historyState[/* engineUndoStack */6]
                      ];
              }));
}

function redo(historyState, currentState) {
  return HistoryStateUtils$WonderEditor.operateHistory(currentState, historyState[/* uiRedoStack */1], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* uiRedoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* uiRedoStack */1]),
                        /* uiUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* uiUndoStack */2]),
                        /* editorRedoStack */historyState[/* editorRedoStack */3],
                        /* editorUndoStack */historyState[/* editorUndoStack */4],
                        /* engineRedoStack */historyState[/* engineRedoStack */5],
                        /* engineUndoStack */historyState[/* engineUndoStack */6]
                      ];
              }));
}

function storeUIState(currentState, historyState) {
  return /* record */[
          /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
          /* uiRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* uiUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* uiUndoStack */2]),
          /* editorRedoStack */historyState[/* editorRedoStack */3],
          /* editorUndoStack */historyState[/* editorUndoStack */4],
          /* engineRedoStack */historyState[/* engineRedoStack */5],
          /* engineUndoStack */historyState[/* engineUndoStack */6]
        ];
}

export {
  undo         ,
  redo         ,
  storeUIState ,
  
}
/* Immutable Not a pure module */
