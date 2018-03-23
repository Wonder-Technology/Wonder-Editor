'use strict';

import * as Immutable                               from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as StateEngineService$WonderEditor         from "../../state/engine/StateEngineService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineForRunUndoStack */8], (function () {
                    var newrecord = historyState.slice();
                    newrecord[/* engineForRunRedoStack */7] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* engineForRunRedoStack */7]);
                    newrecord[/* engineForRunUndoStack */8] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineForRunUndoStack */8]);
                    return newrecord;
                  })));
}

function redo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineForRunRedoStack */7], (function () {
                    var newrecord = historyState.slice();
                    newrecord[/* engineForRunRedoStack */7] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineForRunRedoStack */7]);
                    newrecord[/* engineForRunUndoStack */8] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* engineForRunUndoStack */8]);
                    return newrecord;
                  })));
}

function storeState(currentState, historyState) {
  var newrecord = historyState.slice();
  newrecord[/* engineForRunRedoStack */7] = Immutable.Stack[/* empty */20](/* () */0);
  newrecord[/* engineForRunUndoStack */8] = Immutable.Stack[/* addFirst */17](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForRunUndoStack */8]);
  return newrecord;
}

export {
  undo       ,
  redo       ,
  storeState ,
  
}
/* Immutable Not a pure module */
