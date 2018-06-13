

import * as Immutable from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";

function _createCopiedRedoUndoStackRecord() {
  return /* record */[
          /* uiRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* uiUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* editorRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* editorUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForEditRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForEditUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForRunRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForRunUndoStack */Immutable.Stack[/* empty */20](/* () */0)
        ];
}

function _createHistoryState() {
  return /* record */[
          /* markRedoUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* copiedRedoUndoStackRecord */_createCopiedRedoUndoStackRecord(/* () */0),
          /* uiRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* uiUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* editorRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* editorUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForEditRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForEditUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForRunRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineForRunUndoStack */Immutable.Stack[/* empty */20](/* () */0)
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
