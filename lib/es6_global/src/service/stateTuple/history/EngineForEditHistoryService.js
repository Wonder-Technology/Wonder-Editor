'use strict';

import * as Immutable                               from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as StateEngineService$WonderEditor         from "../../state/engine/StateEngineService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";

function undo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineForEditUndoStack */6], (function () {
                    var newrecord = historyState.slice();
                    newrecord[/* engineForEditRedoStack */5] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* engineForEditRedoStack */5]);
                    newrecord[/* engineForEditUndoStack */6] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineForEditUndoStack */6]);
                    return newrecord;
                  })));
}

function redo(historyState, currentState) {
  return StateEngineService$WonderEditor.restoreState(currentState, OperateStateHistoryService$WonderEditor.operateHistory(currentState, historyState[/* engineForEditRedoStack */5], (function () {
                    var newrecord = historyState.slice();
                    newrecord[/* engineForEditRedoStack */5] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineForEditRedoStack */5]);
                    newrecord[/* engineForEditUndoStack */6] = Immutable.Stack[/* addFirst */17](currentState, historyState[/* engineForEditUndoStack */6]);
                    return newrecord;
                  })));
}

function storeState(currentState, historyState) {
  var newrecord = historyState.slice();
  newrecord[/* engineForEditRedoStack */5] = Immutable.Stack[/* empty */20](/* () */0);
  newrecord[/* engineForEditUndoStack */6] = Immutable.Stack[/* addFirst */17](StateEngineService$WonderEditor.deepCopyForRestore(currentState), historyState[/* engineForEditUndoStack */6]);
  return newrecord;
}

export {
  undo       ,
  redo       ,
  storeState ,
  
}
/* Immutable Not a pure module */
