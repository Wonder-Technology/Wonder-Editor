

import * as Immutable$WonderEditor from "../../../core/external/Immutable.js";
import * as StackHistoryService$WonderEditor from "./StackHistoryService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* uiUndoStack */2], (function (param) {
                return /* record */[
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
                        /* uiRedoStack */Immutable$WonderEditor.Stack[/* addFirst */2](currentState, historyState[/* uiRedoStack */1]),
                        /* uiUndoStack */Immutable$WonderEditor.Stack[/* removeFirstOrRaise */5](historyState[/* uiUndoStack */2]),
                        /* editorRedoStack */historyState[/* editorRedoStack */3],
                        /* editorUndoStack */historyState[/* editorUndoStack */4],
                        /* engineRedoStack */historyState[/* engineRedoStack */5],
                        /* engineUndoStack */historyState[/* engineUndoStack */6]
                      ];
              }));
}

function redo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* uiRedoStack */1], (function (param) {
                return /* record */[
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
                        /* uiRedoStack */Immutable$WonderEditor.Stack[/* removeFirstOrRaise */5](historyState[/* uiRedoStack */1]),
                        /* uiUndoStack */Immutable$WonderEditor.Stack[/* addFirst */2](currentState, historyState[/* uiUndoStack */2]),
                        /* editorRedoStack */historyState[/* editorRedoStack */3],
                        /* editorUndoStack */historyState[/* editorUndoStack */4],
                        /* engineRedoStack */historyState[/* engineRedoStack */5],
                        /* engineUndoStack */historyState[/* engineUndoStack */6]
                      ];
              }));
}

function storeUIState(maxStackSize, currentState, historyState) {
  return /* record */[
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
          /* uiRedoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0),
          /* uiUndoStack */StackHistoryService$WonderEditor.limitStackMaxSize(maxStackSize, Immutable$WonderEditor.Stack[/* addFirst */2](currentState, historyState[/* uiUndoStack */2])),
          /* editorRedoStack */historyState[/* editorRedoStack */3],
          /* editorUndoStack */historyState[/* editorUndoStack */4],
          /* engineRedoStack */historyState[/* engineRedoStack */5],
          /* engineUndoStack */historyState[/* engineUndoStack */6]
        ];
}

export {
  undo ,
  redo ,
  storeUIState ,
  
}
/* OperateStateHistoryService-WonderEditor Not a pure module */
