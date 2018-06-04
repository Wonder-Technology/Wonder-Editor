

import * as StackService$WonderEditor from "../../atom/StackService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* editorUndoStack */5], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                        /* uiRedoStack */historyState[/* uiRedoStack */2],
                        /* uiUndoStack */historyState[/* uiUndoStack */3],
                        /* editorRedoStack */StackService$WonderEditor.addFirst(currentState, historyState[/* editorRedoStack */4]),
                        /* editorUndoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* editorUndoStack */5]),
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
                        /* editorRedoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* editorRedoStack */4]),
                        /* editorUndoStack */StackService$WonderEditor.addFirst(currentState, historyState[/* editorUndoStack */5]),
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
          /* editorRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* editorUndoStack */StackService$WonderEditor.addFirst(currentState, historyState[/* editorUndoStack */5]),
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
/* OperateStateHistoryService-WonderEditor Not a pure module */
