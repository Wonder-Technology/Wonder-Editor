'use strict';

import * as Immutable                               from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* uiUndoStack */3], (function () {
                var newrecord = historyState.slice();
                newrecord[/* uiRedoStack */2] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* uiRedoStack */2]);
                newrecord[/* uiUndoStack */3] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* uiUndoStack */3]);
                return newrecord;
              }));
}

function redo(historyState, currentState) {
  return OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* uiRedoStack */2], (function () {
                var newrecord = historyState.slice();
                newrecord[/* uiRedoStack */2] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* uiRedoStack */2]);
                newrecord[/* uiUndoStack */3] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* uiUndoStack */3]);
                return newrecord;
              }));
}

function storeUIState(currentState, historyState) {
  var newrecord = historyState.slice();
  newrecord[/* uiRedoStack */2] = Immutable.Stack[/* empty */20](/* () */0);
  newrecord[/* uiUndoStack */3] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* uiUndoStack */3]);
  return newrecord;
}

export {
  undo         ,
  redo         ,
  storeUIState ,
  
}
/* Immutable Not a pure module */
