'use strict';

import * as Immutable                               from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* editorUndoStack */5], (function () {
                var newrecord = historyState.slice();
                newrecord[/* editorRedoStack */4] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* editorRedoStack */4]);
                newrecord[/* editorUndoStack */5] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* editorUndoStack */5]);
                return newrecord;
              }));
}

function redo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* editorRedoStack */4], (function () {
                var newrecord = historyState.slice();
                newrecord[/* editorRedoStack */4] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* editorRedoStack */4]);
                newrecord[/* editorUndoStack */5] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* editorUndoStack */5]);
                return newrecord;
              }));
}

function storeState(currentState, historyState) {
  var newrecord = historyState.slice();
  newrecord[/* editorRedoStack */4] = Immutable.Stack[/* empty */20](/* () */0);
  newrecord[/* editorUndoStack */5] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* editorUndoStack */5]);
  return newrecord;
}

export {
  undo       ,
  redo       ,
  storeState ,
  
}
/* Immutable Not a pure module */
