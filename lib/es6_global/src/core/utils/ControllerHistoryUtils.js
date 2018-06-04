

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../ui/store/AppStore.js";
import * as AllStateData$WonderEditor from "../../service/stateTuple/data/AllStateData.js";
import * as StackService$WonderEditor from "../../service/atom/StackService.js";
import * as StateEngineService$WonderEditor from "../../service/state/engine/StateEngineService.js";
import * as StateHistoryService$WonderEditor from "../../service/stateTuple/history/StateHistoryService.js";

function copyHistoryStack(store, param, historyState) {
  var engineStateForEdit = StateEngineService$WonderEditor.deepCopyForRestore(param[1]);
  var engineStateForRun = StateEngineService$WonderEditor.deepCopyForRestore(param[2]);
  return AllStateData$WonderEditor.setHistoryState(/* record */[
              /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
              /* copiedRedoUndoStackRecord : record */[
                /* uiRedoStack */historyState[/* uiRedoStack */2],
                /* uiUndoStack */StackService$WonderEditor.addFirst(store, historyState[/* uiUndoStack */3]),
                /* editorRedoStack */historyState[/* editorRedoStack */4],
                /* editorUndoStack */StackService$WonderEditor.addFirst(param[0], historyState[/* editorUndoStack */5]),
                /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
                /* engineForEditUndoStack */StackService$WonderEditor.addFirst(engineStateForEdit, historyState[/* engineForEditUndoStack */7]),
                /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
                /* engineForRunUndoStack */StackService$WonderEditor.addFirst(engineStateForRun, historyState[/* engineForRunUndoStack */9])
              ],
              /* uiRedoStack */historyState[/* uiRedoStack */2],
              /* uiUndoStack */historyState[/* uiUndoStack */3],
              /* editorRedoStack */historyState[/* editorRedoStack */4],
              /* editorUndoStack */historyState[/* editorUndoStack */5],
              /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
              /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
              /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
              /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
            ]);
}

function restoreHistoryStack(dispatchFunc, engineStateForEdit, engineStateForRun, historyState) {
  var match = StackService$WonderEditor.first(historyState[/* copiedRedoUndoStackRecord */1][/* uiUndoStack */1]);
  var match$1 = StackService$WonderEditor.first(historyState[/* copiedRedoUndoStackRecord */1][/* editorUndoStack */3]);
  var match$2 = StackService$WonderEditor.first(historyState[/* copiedRedoUndoStackRecord */1][/* engineForEditUndoStack */5]);
  var match$3 = StackService$WonderEditor.first(historyState[/* copiedRedoUndoStackRecord */1][/* engineForRunUndoStack */7]);
  var exit = 0;
  if (match && match$1 && match$2 && match$3) {
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.ReplaceState,
          match[0]
        ]);
    StateHistoryService$WonderEditor.refreshStateForHistory(/* tuple */[
          match$1[0],
          StateEngineService$WonderEditor.restoreState(engineStateForEdit, match$2[0]),
          StateEngineService$WonderEditor.restoreState(engineStateForRun, match$3[0])
        ]);
    return AllStateData$WonderEditor.setHistoryState(/* record */[
                /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
                /* uiRedoStack */historyState[/* copiedRedoUndoStackRecord */1][/* uiRedoStack */0],
                /* uiUndoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* copiedRedoUndoStackRecord */1][/* uiUndoStack */1]),
                /* editorRedoStack */historyState[/* copiedRedoUndoStackRecord */1][/* editorRedoStack */2],
                /* editorUndoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* copiedRedoUndoStackRecord */1][/* editorUndoStack */3]),
                /* engineForEditRedoStack */historyState[/* copiedRedoUndoStackRecord */1][/* engineForEditRedoStack */4],
                /* engineForEditUndoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* copiedRedoUndoStackRecord */1][/* engineForEditUndoStack */5]),
                /* engineForRunRedoStack */historyState[/* copiedRedoUndoStackRecord */1][/* engineForRunRedoStack */6],
                /* engineForRunUndoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* copiedRedoUndoStackRecord */1][/* engineForRunUndoStack */7])
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
/* Log-WonderLog Not a pure module */
