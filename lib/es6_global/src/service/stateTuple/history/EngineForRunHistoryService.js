

import * as StackService$WonderEditor from "../../atom/StackService.js";
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
                            /* engineForRunRedoStack */StackService$WonderEditor.addFirst(StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForRunRedoStack */8]),
                            /* engineForRunUndoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* engineForRunUndoStack */9])
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
                            /* engineForRunRedoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* engineForRunRedoStack */8]),
                            /* engineForRunUndoStack */StackService$WonderEditor.addFirst(StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForRunUndoStack */9])
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
          /* engineForRunRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* engineForRunUndoStack */StackService$WonderEditor.addFirst(StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForRunUndoStack */9])
        ];
}

export {
  undo ,
  redo ,
  storeState ,
  
}
/* StateEngineService-WonderEditor Not a pure module */
