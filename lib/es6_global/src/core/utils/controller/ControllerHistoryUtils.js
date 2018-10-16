

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../ui/store/AppStore.js";
import * as AllStateData$WonderEditor from "../../../service/stateTuple/data/AllStateData.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as StateHistoryService$WonderEditor from "../../../service/stateTuple/history/StateHistoryService.js";

function copyHistoryStack(store, param, historyState) {
  var engineState = StateEngineService$WonderEditor.deepCopyForRestore(param[1]);
  return AllStateData$WonderEditor.setHistoryState(/* record */[
              /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
              /* copiedRedoUndoStackRecord : record */[
                /* uiRedoStack */historyState[/* uiRedoStack */2],
                /* uiUndoStack */Immutable.Stack[/* addFirst */17](store, historyState[/* uiUndoStack */3]),
                /* editorRedoStack */historyState[/* editorRedoStack */4],
                /* editorUndoStack */Immutable.Stack[/* addFirst */17](param[0], historyState[/* editorUndoStack */5]),
                /* engineRedoStack */historyState[/* engineRedoStack */6],
                /* engineUndoStack */Immutable.Stack[/* addFirst */17](engineState, historyState[/* engineUndoStack */7])
              ],
              /* uiRedoStack */historyState[/* uiRedoStack */2],
              /* uiUndoStack */historyState[/* uiUndoStack */3],
              /* editorRedoStack */historyState[/* editorRedoStack */4],
              /* editorUndoStack */historyState[/* editorUndoStack */5],
              /* engineRedoStack */historyState[/* engineRedoStack */6],
              /* engineUndoStack */historyState[/* engineUndoStack */7]
            ]);
}

function restoreHistoryStack(dispatchFunc, engineState, historyState) {
  var match = Curry._1(Immutable.Stack[/* first */14], historyState[/* copiedRedoUndoStackRecord */1][/* uiUndoStack */1]);
  var match$1 = Curry._1(Immutable.Stack[/* first */14], historyState[/* copiedRedoUndoStackRecord */1][/* editorUndoStack */3]);
  var match$2 = Curry._1(Immutable.Stack[/* first */14], historyState[/* copiedRedoUndoStackRecord */1][/* engineUndoStack */5]);
  var exit = 0;
  if (match !== undefined && match$1 !== undefined && match$2 !== undefined) {
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.ReplaceState,
          match
        ]);
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.UpdateAction,
          /* Update */[/* array */[/* All */1]]
        ]);
    StateHistoryService$WonderEditor.refreshStateForHistory(/* tuple */[
          match$1,
          StateEngineService$WonderEditor.restoreState(engineState, match$2)
        ]);
    return AllStateData$WonderEditor.setHistoryState(/* record */[
                /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                /* uiRedoStack */historyState[/* copiedRedoUndoStackRecord */1][/* uiRedoStack */0],
                /* uiUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* copiedRedoUndoStackRecord */1][/* uiUndoStack */1]),
                /* editorRedoStack */historyState[/* copiedRedoUndoStackRecord */1][/* editorRedoStack */2],
                /* editorUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* copiedRedoUndoStackRecord */1][/* editorUndoStack */3]),
                /* engineRedoStack */historyState[/* copiedRedoUndoStackRecord */1][/* engineRedoStack */4],
                /* engineUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* copiedRedoUndoStackRecord */1][/* engineUndoStack */5])
              ]);
  } else {
    exit = 1;
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("restoreHistoryStack", "expect history copiedRedoUndoStackRecord undo stack have value, but not", "", "check history copiedRedoUndoStackRecord undo stack", "historyState:" + (String(historyState) + "")));
  }
  
}

export {
  copyHistoryStack ,
  restoreHistoryStack ,
  
}
/* Immutable Not a pure module */
