

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../core/ui/store/AppStore.js";
import * as AllStateData$WonderEditor from "../data/AllStateData.js";
import * as UIHistoryService$WonderEditor from "./UIHistoryService.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../state/engine/state/StateEngineService.js";
import * as StateHistoryService$WonderEditor from "./StateHistoryService.js";
import * as EditorHistoryService$WonderEditor from "./EditorHistoryService.js";
import * as EngineHistoryService$WonderEditor from "./EngineHistoryService.js";
import * as OperateStateHistoryService$WonderEditor from "./OperateStateHistoryService.js";
import * as RedoUndoSettingEditorService$WonderEditor from "../../state/editor/setting/RedoUndoSettingEditorService.js";

function _storeEngineHistoryState(uiState, param, storeEngineStateFunc, historyState) {
  var editorState = param[0];
  var maxStackSize = RedoUndoSettingEditorService$WonderEditor.unsafeGetMaxStackSize(editorState);
  return Curry._3(storeEngineStateFunc, maxStackSize, param[1], EditorHistoryService$WonderEditor.storeState(maxStackSize, editorState, UIHistoryService$WonderEditor.storeUIState(maxStackSize, uiState, historyState)));
}

function storeCopiedEngineHistoryState(uiState, param, historyState) {
  return _storeEngineHistoryState(uiState, /* tuple */[
              param[0],
              param[1]
            ], EngineHistoryService$WonderEditor.storeHasCopyState, historyState);
}

function storeHistoryState(uiState, param, historyState) {
  return _storeEngineHistoryState(uiState, /* tuple */[
              param[0],
              param[1]
            ], EngineHistoryService$WonderEditor.storeNoCopyState, historyState);
}

function _operateHistoryState(uiState, dispatchFunc, param, param$1) {
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.ReplaceState,
        Curry._2(param[0], AllStateData$WonderEditor.getHistoryState(/* () */0), uiState)
      ]);
  var editorState = Curry._2(param[1], AllStateData$WonderEditor.getHistoryState(/* () */0), param$1[0]);
  var engineState = Curry._2(param[2], AllStateData$WonderEditor.getHistoryState(/* () */0), param$1[1]);
  StateEditorService$WonderEditor.setState(editorState);
  StateEngineService$WonderEditor.setState(engineState);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* All */1]]
      ]);
  return /* tuple */[
          editorState,
          engineState
        ];
}

function undoHistoryState(uiState, dispatchFunc, param) {
  return _operateHistoryState(uiState, dispatchFunc, /* tuple */[
              UIHistoryService$WonderEditor.undo,
              EditorHistoryService$WonderEditor.undo,
              EngineHistoryService$WonderEditor.undo
            ], /* tuple */[
              param[0],
              param[1]
            ]);
}

function redoHistoryState(uiState, dispatchFunc, param) {
  return _operateHistoryState(uiState, dispatchFunc, /* tuple */[
              UIHistoryService$WonderEditor.redo,
              EditorHistoryService$WonderEditor.redo,
              EngineHistoryService$WonderEditor.redo
            ], /* tuple */[
              param[0],
              param[1]
            ]);
}

function handleUndo(uiState, dispatchFunc) {
  var match = OperateStateHistoryService$WonderEditor.hasUndoState(AllStateData$WonderEditor.getHistoryState(/* () */0));
  if (match) {
    return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                  return undoHistoryState(uiState, dispatchFunc, param);
                }));
  } else {
    return /* () */0;
  }
}

export {
  _storeEngineHistoryState ,
  storeCopiedEngineHistoryState ,
  storeHistoryState ,
  _operateHistoryState ,
  undoHistoryState ,
  redoHistoryState ,
  handleUndo ,
  
}
/* AppStore-WonderEditor Not a pure module */
