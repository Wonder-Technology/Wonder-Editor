

import * as Immutable$WonderEditor from "../../../core/external/Immutable.js";
import * as StateEngineService$WonderEditor from "../../state/engine/StateEngineService.js";
import * as StackHistoryService$WonderEditor from "./StackHistoryService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineUndoStack */6], (function (param) {
                    return /* record */[
                            /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
                            /* uiRedoStack */historyState[/* uiRedoStack */1],
                            /* uiUndoStack */historyState[/* uiUndoStack */2],
                            /* editorRedoStack */historyState[/* editorRedoStack */3],
                            /* editorUndoStack */historyState[/* editorUndoStack */4],
                            /* engineRedoStack */Immutable$WonderEditor.Stack[/* addFirst */2](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineRedoStack */5]),
                            /* engineUndoStack */Immutable$WonderEditor.Stack[/* removeFirstOrRaise */5](historyState[/* engineUndoStack */6])
                          ];
                  })));
}

function redo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineRedoStack */5], (function (param) {
                    return /* record */[
                            /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
                            /* uiRedoStack */historyState[/* uiRedoStack */1],
                            /* uiUndoStack */historyState[/* uiUndoStack */2],
                            /* editorRedoStack */historyState[/* editorRedoStack */3],
                            /* editorUndoStack */historyState[/* editorUndoStack */4],
                            /* engineRedoStack */Immutable$WonderEditor.Stack[/* removeFirstOrRaise */5](historyState[/* engineRedoStack */5]),
                            /* engineUndoStack */Immutable$WonderEditor.Stack[/* addFirst */2](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineUndoStack */6])
                          ];
                  })));
}

function storeHasCopyState(maxStackSize, currentState, historyState) {
  return /* record */[
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
          /* uiRedoStack */historyState[/* uiRedoStack */1],
          /* uiUndoStack */historyState[/* uiUndoStack */2],
          /* editorRedoStack */historyState[/* editorRedoStack */3],
          /* editorUndoStack */historyState[/* editorUndoStack */4],
          /* engineRedoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0),
          /* engineUndoStack */StackHistoryService$WonderEditor.limitStackMaxSize(maxStackSize, Immutable$WonderEditor.Stack[/* addFirst */2](currentState, historyState[/* engineUndoStack */6]))
        ];
}

function storeNoCopyState(maxStackSize, currentState, historyState) {
  return /* record */[
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */0],
          /* uiRedoStack */historyState[/* uiRedoStack */1],
          /* uiUndoStack */historyState[/* uiUndoStack */2],
          /* editorRedoStack */historyState[/* editorRedoStack */3],
          /* editorUndoStack */historyState[/* editorUndoStack */4],
          /* engineRedoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0),
          /* engineUndoStack */StackHistoryService$WonderEditor.limitStackMaxSize(maxStackSize, Immutable$WonderEditor.Stack[/* addFirst */2](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineUndoStack */6]))
        ];
}

export {
  undo ,
  redo ,
  storeHasCopyState ,
  storeNoCopyState ,
  
}
/* StateEngineService-WonderEditor Not a pure module */
