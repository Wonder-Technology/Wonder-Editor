

import * as AllStateData$WonderEditor from "../../../../service/stateTuple/data/AllStateData.js";
import * as StackService$WonderEditor from "../../../../service/atom/StackService.js";
import * as AllHistoryService$WonderEditor from "../../../../service/stateTuple/history/AllHistoryService.js";
import * as StateEngineService$WonderEditor from "../../../../service/state/engine/StateEngineService.js";

function _storeMarkRedoUndoState(store, param, historyState) {
  var newEngineStateForEdit = StateEngineService$WonderEditor.deepCopyForRestore(param[1]);
  var newEngineStateForRun = StateEngineService$WonderEditor.deepCopyForRestore(param[2]);
  return AllStateData$WonderEditor.setHistoryState(/* record */[
              /* markRedoUndoStack */StackService$WonderEditor.addFirst(/* tuple */[
                    store,
                    param[0],
                    newEngineStateForEdit,
                    newEngineStateForRun
                  ], historyState[/* markRedoUndoStack */0]),
              /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
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

function _removeMarkRedoUndoFirst(historyState) {
  return /* record */[
          /* markRedoUndoStack */StackService$WonderEditor.removeFirstOrRaise(historyState[/* markRedoUndoStack */0]),
          /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
          /* uiRedoStack */historyState[/* uiRedoStack */2],
          /* uiUndoStack */historyState[/* uiUndoStack */3],
          /* editorRedoStack */historyState[/* editorRedoStack */4],
          /* editorUndoStack */historyState[/* editorUndoStack */5],
          /* engineForEditRedoStack */historyState[/* engineForEditRedoStack */6],
          /* engineForEditUndoStack */historyState[/* engineForEditUndoStack */7],
          /* engineForRunRedoStack */historyState[/* engineForRunRedoStack */8],
          /* engineForRunUndoStack */historyState[/* engineForRunUndoStack */9]
        ];
}

function _clearMarkRedoUndoStack(historyState) {
  return AllStateData$WonderEditor.setHistoryState(/* record */[
              /* markRedoUndoStack */StackService$WonderEditor.empty(/* () */0),
              /* copiedRedoUndoStackRecord */historyState[/* copiedRedoUndoStackRecord */1],
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

function markRedoUndoChangeUI(store, param) {
  _clearMarkRedoUndoStack(AllStateData$WonderEditor.getHistoryState(/* () */0));
  return AllStateData$WonderEditor.setHistoryState(AllHistoryService$WonderEditor.storeHistoryState(store, param[0], param[1], param[2], AllStateData$WonderEditor.getHistoryState(/* () */0)));
}

function markRedoUndoTest(store, param) {
  return AllStateData$WonderEditor.setHistoryState(AllHistoryService$WonderEditor.storeHistoryState(store, param[0], param[1], param[2], AllStateData$WonderEditor.getHistoryState(/* () */0)));
}

function markRedoUndoChangeNothing(historyState, store, stateTuple) {
  var match = StackService$WonderEditor.first(historyState[/* markRedoUndoStack */0]);
  if (match) {
    var match$1 = match[0];
    return _storeMarkRedoUndoState(store, stateTuple, AllHistoryService$WonderEditor.storeHistoryState(match$1[0], match$1[1], match$1[2], match$1[3], _removeMarkRedoUndoFirst(historyState)));
  } else {
    return _storeMarkRedoUndoState(store, stateTuple, historyState);
  }
}

export {
  _storeMarkRedoUndoState ,
  _removeMarkRedoUndoFirst ,
  _clearMarkRedoUndoStack ,
  markRedoUndoChangeUI ,
  markRedoUndoTest ,
  markRedoUndoChangeNothing ,
  
}
/* AllStateData-WonderEditor Not a pure module */
