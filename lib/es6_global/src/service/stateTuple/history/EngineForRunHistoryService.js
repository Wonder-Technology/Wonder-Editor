

import * as Immutable from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as StateEngineService$WonderEditor from "../../state/engine/StateEngineService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineForRunUndoStack */9], (function () {
                    return /* record */[
                            /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                            /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                            /* uiRedoStack */historyState[/* uiRedoStack */2],
                            /* uiUndoStack */historyState[/* uiUndoStack */3],
                            /* editorRedoStack */historyState[/* editorRedoStack */4],
                            /* editorUndoStack */historyState[/* editorUndoStack */5],
                            /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
                            /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
                            /* engineForRunRedoStack */Immutable.Stack[/* addFirst */17](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForRunRedoStack */8]),
                            /* engineForRunUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineForRunUndoStack */9])
                          ];
                  })));
}

function redo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineForRunRedoStack */8], (function () {
                    return /* record */[
                            /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                            /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                            /* uiRedoStack */historyState[/* uiRedoStack */2],
                            /* uiUndoStack */historyState[/* uiUndoStack */3],
                            /* editorRedoStack */historyState[/* editorRedoStack */4],
                            /* editorUndoStack */historyState[/* editorUndoStack */5],
                            /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
                            /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
                            /* engineForRunRedoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineForRunRedoStack */8]),
                            /* engineForRunUndoStack */Immutable.Stack[/* addFirst */17](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForRunUndoStack */9])
                          ];
                  })));
}

function storeState(currentState, historyState) {
  return /* record */[
          /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
          /* uiRedoStack */historyState[/* uiRedoStack */2],
          /* uiUndoStack */historyState[/* uiUndoStack */3],
          /* editorRedoStack */historyState[/* editorRedoStack */4],
          /* editorUndoStack */historyState[/* editorUndoStack */5],
          /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
          /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
          /* engineForRunRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForRunUndoStack */Immutable.Stack[/* addFirst */17](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForRunUndoStack */9])
        ];
}

export {
  undo ,
  redo ,
  storeState ,
  
}
/* Immutable Not a pure module */
