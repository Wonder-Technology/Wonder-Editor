

import * as Immutable from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as StateEngineService$WonderEditor from "../../state/engine/StateEngineService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineForEditUndoStack */7], (function () {
                    return /* record */[
                            /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                            /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                            /* uiRedoStack */historyState[/* uiRedoStack */2],
                            /* uiUndoStack */historyState[/* uiUndoStack */3],
                            /* editorRedoStack */historyState[/* editorRedoStack */4],
                            /* editorUndoStack */historyState[/* editorUndoStack */5],
                            /* engineForEditRedoStack */Immutable.Stack[/* addFirst */17](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForEditRedoStack */6]),
                            /* engineForEditUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineForEditUndoStack */7]),
                            /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
                            /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
                          ];
                  })));
}

function redo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineForEditRedoStack */6], (function () {
                    return /* record */[
                            /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                            /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                            /* uiRedoStack */historyState[/* uiRedoStack */2],
                            /* uiUndoStack */historyState[/* uiUndoStack */3],
                            /* editorRedoStack */historyState[/* editorRedoStack */4],
                            /* editorUndoStack */historyState[/* editorUndoStack */5],
                            /* engineForEditRedoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineForEditRedoStack */6]),
                            /* engineForEditUndoStack */Immutable.Stack[/* addFirst */17](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForEditUndoStack */7]),
                            /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
                            /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
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
          /* engineForEditRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForEditUndoStack */Immutable.Stack[/* addFirst */17](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForEditUndoStack */7]),
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
