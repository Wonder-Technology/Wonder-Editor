

import * as Immutable from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* uiUndoStack */3], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                        /* uiRedoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* uiRedoStack */2]),
                        /* uiUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* uiUndoStack */3]),
                        /* editorRedoStack */historyState[/* editorRedoStack */4],
                        /* editorUndoStack */historyState[/* editorUndoStack */5],
                        /* engineRedoStack */historyState[/* engineRedoStack */6],
                        /* engineUndoStack */historyState[/* engineUndoStack */7]
                      ];
              }));
}

function redo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* uiRedoStack */2], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                        /* uiRedoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* uiRedoStack */2]),
                        /* uiUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* uiUndoStack */3]),
                        /* editorRedoStack */historyState[/* editorRedoStack */4],
                        /* editorUndoStack */historyState[/* editorUndoStack */5],
                        /* engineRedoStack */historyState[/* engineRedoStack */6],
                        /* engineUndoStack */historyState[/* engineUndoStack */7]
                      ];
              }));
}

function storeUIState(currentState, historyState) {
  return /* record */[
          /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
          /* uiRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* uiUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* uiUndoStack */3]),
          /* editorRedoStack */historyState[/* editorRedoStack */4],
          /* editorUndoStack */historyState[/* editorUndoStack */5],
          /* engineRedoStack */historyState[/* engineRedoStack */6],
          /* engineUndoStack */historyState[/* engineUndoStack */7]
        ];
}

export {
  undo ,
  redo ,
  storeUIState ,
  
}
/* Immutable Not a pure module */
