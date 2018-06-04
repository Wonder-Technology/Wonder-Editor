

import * as StackService$WonderEditor from "../../atom/StackService.js";

function _createCopiedRedoUndoStackRecord() {
  return /* record */[
          /* uiRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* uiUndoStack */StackService$WonderEditor.empty(/* () */0),
          /* editorRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* editorUndoStack */StackService$WonderEditor.empty(/* () */0),
          /* engineForEditRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* engineForEditUndoStack */StackService$WonderEditor.empty(/* () */0),
          /* engineForRunRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* engineForRunUndoStack */StackService$WonderEditor.empty(/* () */0)
        ];
}

function _createHistoryState() {
  return /* record */[
          /* markRedoUndoStack */StackService$WonderEditor.empty(/* () */0),
          /* copiedRedoUndoStackRecord */_createCopiedRedoUndoStackRecord(/* () */0),
          /* uiRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* uiUndoStack */StackService$WonderEditor.empty(/* () */0),
          /* editorRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* editorUndoStack */StackService$WonderEditor.empty(/* () */0),
          /* engineForEditRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* engineForEditUndoStack */StackService$WonderEditor.empty(/* () */0),
          /* engineForRunRedoStack */StackService$WonderEditor.empty(/* () */0),
          /* engineForRunUndoStack */StackService$WonderEditor.empty(/* () */0)
        ];
}

var allStateData = /* record */[/* historyState */_createHistoryState(/* () */0)];

function getHistoryState() {
  return allStateData[/* historyState */0];
}

function setHistoryState(state) {
  allStateData[/* historyState */0] = state;
  return /* () */0;
}

export {
  _createCopiedRedoUndoStackRecord ,
  _createHistoryState ,
  allStateData ,
  getHistoryState ,
  setHistoryState ,
  
}
/* allStateData Not a pure module */
