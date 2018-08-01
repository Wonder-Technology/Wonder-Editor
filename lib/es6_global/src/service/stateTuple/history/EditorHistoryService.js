

import * as Immutable from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* editorUndoStack */5], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                        /* uiRedoStack */historyState[/* uiRedoStack */2],
                        /* uiUndoStack */historyState[/* uiUndoStack */3],
                        /* editorRedoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* editorRedoStack */4]),
                        /* editorUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* editorUndoStack */5]),
                        /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
                        /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
                        /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
                        /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
                      ];
              }));
}

function redo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* editorRedoStack */4], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                        /* uiRedoStack */historyState[/* uiRedoStack */2],
                        /* uiUndoStack */historyState[/* uiUndoStack */3],
                        /* editorRedoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* editorRedoStack */4]),
                        /* editorUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* editorUndoStack */5]),
                        /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
                        /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
                        /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
                        /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
                      ];
              }));
}

function storeState(currentState, historyState) {
  return /* record */[
          /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
          /* uiRedoStack */historyState[/* uiRedoStack */2],
          /* uiUndoStack */historyState[/* uiUndoStack */3],
          /* editorRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* editorUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* editorUndoStack */5]),
          /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
          /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
          /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
          /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
        ];
}

export {
  undo ,
  redo ,
  storeState ,
  
}
/* Immutable Not a pure module */
