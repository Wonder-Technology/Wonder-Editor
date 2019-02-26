

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../ui/store/AppStore.js";
import * as LogUtils$WonderEditor from "../console/LogUtils.js";
import * as Immutable$WonderEditor from "../../external/Immutable.js";
import * as AllStateData$WonderEditor from "../../../service/stateTuple/data/AllStateData.js";
import * as ConsoleUtils$WonderEditor from "../ui/ConsoleUtils.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as StateHistoryService$WonderEditor from "../../../service/stateTuple/history/StateHistoryService.js";
import * as RestoreStateEngineService$WonderEditor from "../../../service/state/engine/state/RestoreStateEngineService.js";

function copyHistoryStack(uiState, param, historyState) {
  var engineState = StateEngineService$WonderEditor.deepCopyForRestore(param[1]);
  return AllStateData$WonderEditor.setHistoryState(/* record */[
              /* copiedRedoUndoStackRecord *//* record */[
                /* uiRedoStack */historyState[/* uiRedoStack */1],
                /* uiUndoStack */Immutable$WonderEditor.Stack[/* addFirst */2](uiState, historyState[/* uiUndoStack */2]),
                /* editorRedoStack */historyState[/* editorRedoStack */3],
                /* editorUndoStack */Immutable$WonderEditor.Stack[/* addFirst */2](param[0], historyState[/* editorUndoStack */4]),
                /* engineRedoStack */historyState[/* engineRedoStack */5],
                /* engineUndoStack */Immutable$WonderEditor.Stack[/* addFirst */2](engineState, historyState[/* engineUndoStack */6])
              ],
              /* uiRedoStack */historyState[/* uiRedoStack */1],
              /* uiUndoStack */historyState[/* uiUndoStack */2],
              /* editorRedoStack */historyState[/* editorRedoStack */3],
              /* editorUndoStack */historyState[/* editorUndoStack */4],
              /* engineRedoStack */historyState[/* engineRedoStack */5],
              /* engineUndoStack */historyState[/* engineUndoStack */6]
            ]);
}

function restoreHistoryStack(dispatchFunc, param) {
  var historyState = param[2];
  var copiedRedoUndoStackRecord = OptionService$WonderEditor.unsafeGet(historyState[/* copiedRedoUndoStackRecord */0]);
  var match = Immutable$WonderEditor.Stack[/* first */4](copiedRedoUndoStackRecord[/* uiUndoStack */1]);
  var match$1 = Immutable$WonderEditor.Stack[/* first */4](copiedRedoUndoStackRecord[/* editorUndoStack */3]);
  var match$2 = Immutable$WonderEditor.Stack[/* first */4](copiedRedoUndoStackRecord[/* engineUndoStack */5]);
  var exit = 0;
  if (match !== undefined && match$1 !== undefined && match$2 !== undefined) {
    Curry._1(dispatchFunc, [
          AppStore$WonderEditor.ReplaceState,
          match
        ]);
    StateHistoryService$WonderEditor.refreshStateForHistory(/* tuple */[
          match$1,
          RestoreStateEngineService$WonderEditor.restoreState(param[1], match$2)
        ]);
    return AllStateData$WonderEditor.setHistoryState(/* record */[
                /* copiedRedoUndoStackRecord */undefined,
                /* uiRedoStack */copiedRedoUndoStackRecord[/* uiRedoStack */0],
                /* uiUndoStack */Immutable$WonderEditor.Stack[/* removeFirstOrRaise */5](copiedRedoUndoStackRecord[/* uiUndoStack */1]),
                /* editorRedoStack */copiedRedoUndoStackRecord[/* editorRedoStack */2],
                /* editorUndoStack */Immutable$WonderEditor.Stack[/* removeFirstOrRaise */5](copiedRedoUndoStackRecord[/* editorUndoStack */3]),
                /* engineRedoStack */copiedRedoUndoStackRecord[/* engineRedoStack */4],
                /* engineUndoStack */Immutable$WonderEditor.Stack[/* removeFirstOrRaise */5](copiedRedoUndoStackRecord[/* engineUndoStack */5])
              ]);
  } else {
    exit = 1;
  }
  if (exit === 1) {
    ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("expect history copiedRedoUndoStackRecord undo stack have value, but not", "", "check history copiedRedoUndoStackRecord undo stack", "historyState:" + (String(historyState) + "")), param[0]);
    return /* () */0;
  }
  
}

export {
  copyHistoryStack ,
  restoreHistoryStack ,
  
}
/* AppStore-WonderEditor Not a pure module */
