'use strict';

import * as Immutable                               from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as StateEngineService$WonderEditor         from "../../state/engine/StateEngineService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineUndoStack */6], (function () {
                    return /* record */[
                            /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                            /* uiRedoStack */historyState[/* uiRedoStack */1],
                            /* uiUndoStack */historyState[/* uiUndoStack */2],
                            /* editorRedoStack */historyState[/* editorRedoStack */3],
                            /* editorUndoStack */historyState[/* editorUndoStack */4],
                            /* engineRedoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* engineRedoStack */5]),
                            /* engineUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineUndoStack */6])
                          ];
                  })));
}

function redo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineRedoStack */5], (function () {
                    return /* record */[
                            /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                            /* uiRedoStack */historyState[/* uiRedoStack */1],
                            /* uiUndoStack */historyState[/* uiUndoStack */2],
                            /* editorRedoStack */historyState[/* editorRedoStack */3],
                            /* editorUndoStack */historyState[/* editorUndoStack */4],
                            /* engineRedoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineRedoStack */5]),
                            /* engineUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* engineUndoStack */6])
                          ];
                  })));
}

function storeState(currentState, historyState) {
  return /* record */[
          /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
          /* uiRedoStack */historyState[/* uiRedoStack */1],
          /* uiUndoStack */historyState[/* uiUndoStack */2],
          /* editorRedoStack */historyState[/* editorRedoStack */3],
          /* editorUndoStack */historyState[/* editorUndoStack */4],
          /* engineRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineUndoStack */Immutable.Stack[/* addFirst */17](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineUndoStack */6])
        ];
}

export {
  undo       ,
  redo       ,
  storeState ,
  
}
/* Immutable Not a pure module */
