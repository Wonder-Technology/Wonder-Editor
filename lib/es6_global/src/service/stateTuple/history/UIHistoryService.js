

import * as StackService$WonderEditor from "../../atom/StackService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* uiUndoStack */3], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                        /* uiRedoStack */StackService$WonderEditor.addFirst(currentState, historyState[/* uiRedoStack */2]),
                        /* uiUndoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* uiUndoStack */3]),
                        /* editorRedoStack */historyState[/* editorRedoStack */4],
                        /* editorUndoStack */historyState[/* editorUndoStack */5],
                        /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
                        /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
                        /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
                        /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
                      ];
              }));
}

function redo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* uiRedoStack */2], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                        /* uiRedoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* uiRedoStack */2]),
                        /* uiUndoStack */StackService$WonderEditor.addFirst(currentState, historyState[/* uiUndoStack */3]),
                        /* editorRedoStack */historyState[/* editorRedoStack */4],
                        /* editorUndoStack */historyState[/* editorUndoStack */5],
                        /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
                        /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
                        /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
                        /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
                      ];
              }));
}

function storeUIState(currentState, historyState) {
  return /* record */[
          /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
          /* uiRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* uiUndoStack */StackService$WonderEditor.addFirst(currentState, historyState[/* uiUndoStack */3]),
          /* editorRedoStack */historyState[/* editorRedoStack */4],
          /* editorUndoStack */historyState[/* editorUndoStack */5],
          /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
          /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
          /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
          /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
        ];
}

export {
  undo ,
  redo ,
  storeUIState ,
  
}
/* OperateStateHistoryService-WonderEditor Not a pure module */
