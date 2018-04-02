'use strict';

import * as Curry                           from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable                       from "../../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as Log$WonderLog                   from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor           from "../../store/AppStore.js";
import * as AllStateData$WonderEditor       from "../../../../service/stateTuple/data/AllStateData.js";
import * as StateLogicService$WonderEditor  from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";

function storeRedoUndoForRunAndStop(store, param, historyState) {
  var newEngineStateForEdit = StateEngineService$WonderEditor.deepCopyForRestore(param[1]);
  var newEngineStateForRun = StateEngineService$WonderEditor.deepCopyForRestore(param[2]);
  Log$WonderLog.print("store run and stop");
  var newrecord = historyState.slice();
  AllStateData$WonderEditor.setHistoryState((newrecord[/* controllerRedoUndoStack */1] = Immutable.Stack[/* addFirst */17](/* tuple */[
              store,
              param[0],
              newEngineStateForEdit,
              newEngineStateForRun
            ], historyState[/* controllerRedoUndoStack */1]), newrecord));
  Log$WonderLog.print(AllStateData$WonderEditor.getHistoryState(/* () */0)[/* controllerRedoUndoStack */1]);
  return /* () */0;
}

function _removeRedoUndoForRunAndStop(historyState) {
  var newrecord = historyState.slice();
  newrecord[/* controllerRedoUndoStack */1] = Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* controllerRedoUndoStack */1]);
  return newrecord;
}

function _clearRedoUndoForRunAndStopStack(historyState) {
  var newrecord = historyState.slice();
  return AllStateData$WonderEditor.setHistoryState((newrecord[/* controllerRedoUndoStack */1] = Immutable.Stack[/* empty */20](/* () */0), newrecord));
}

function undo(dispatch, engineStateForEdit, engineStateForRun, historyState) {
  Log$WonderLog.print(AllStateData$WonderEditor.getHistoryState(/* () */0)[/* controllerRedoUndoStack */1]);
  var match = Curry._1(Immutable.Stack[/* first */14], historyState[/* controllerRedoUndoStack */1]);
  if (match) {
    var match$1 = match[0];
    Curry._1(dispatch, [
          AppStore$WonderEditor.ReplaceState,
          match$1[0]
        ]);
    StateLogicService$WonderEditor.refreshStateForHistory(/* tuple */[
          match$1[1],
          StateEngineService$WonderEditor.restoreState(engineStateForEdit, match$1[2]),
          StateEngineService$WonderEditor.restoreState(engineStateForRun, match$1[3])
        ]);
    return _clearRedoUndoForRunAndStopStack(historyState);
  } else {
    return /* () */0;
  }
}

export {
  storeRedoUndoForRunAndStop       ,
  _removeRedoUndoForRunAndStop     ,
  _clearRedoUndoForRunAndStopStack ,
  undo                             ,
  
}
/* Immutable Not a pure module */
