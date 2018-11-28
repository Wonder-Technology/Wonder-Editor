

import * as Immutable$WonderEditor from "../../../core/external/Immutable.js";
import * as StackHistoryService$WonderEditor from "./StackHistoryService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* editorUndoStack */4], (function () {
                return /* record */[
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
                        /* uiRedoStack */historyState[/* uiRedoStack */1],
                        /* uiUndoStack */historyState[/* uiUndoStack */2],
                        /* editorRedoStack */Immutable$WonderEditor.Stack[/* addFirst */2](currentState, historyState[/* editorRedoStack */3]),
                        /* editorUndoStack */Immutable$WonderEditor.Stack[/* removeFirstOrRaise */5](historyState[/* editorUndoStack */4]),
                        /* engineRedoStack */historyState[/* engineRedoStack */5],
                        /* engineUndoStack */historyState[/* engineUndoStack */6]
                      ];
              }));
}

function redo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* editorRedoStack */3], (function () {
                return /* record */[
                        /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
                        /* uiRedoStack */historyState[/* uiRedoStack */1],
                        /* uiUndoStack */historyState[/* uiUndoStack */2],
                        /* editorRedoStack */Immutable$WonderEditor.Stack[/* removeFirstOrRaise */5](historyState[/* editorRedoStack */3]),
                        /* editorUndoStack */Immutable$WonderEditor.Stack[/* addFirst */2](currentState, historyState[/* editorUndoStack */4]),
                        /* engineRedoStack */historyState[/* engineRedoStack */5],
                        /* engineUndoStack */historyState[/* engineUndoStack */6]
                      ];
              }));
}

function storeState(maxStackSize, currentState, historyState) {
  return /* record */[
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
          /* uiRedoStack */historyState[/* uiRedoStack */1],
          /* uiUndoStack */historyState[/* uiUndoStack */2],
          /* editorRedoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0),
          /* editorUndoStack */StackHistoryService$WonderEditor.limitStackMaxSize(maxStackSize, Immutable$WonderEditor.Stack[/* addFirst */2](currentState, historyState[/* editorUndoStack */4])),
          /* engineRedoStack */historyState[/* engineRedoStack */5],
          /* engineUndoStack */historyState[/* engineUndoStack */6]
        ];
}

export {
  undo ,
  redo ,
  storeState ,
  
}
/* OperateStateHistoryService-WonderEditor Not a pure module */
