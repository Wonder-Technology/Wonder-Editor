'use strict';

import * as Immutable from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";

function _createHistoryState() {
  return /* record */[
          /* markRedoUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* uiRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* uiUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* editorRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* editorUndoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineUndoStack */Immutable.Stack[/* empty */20](/* () */0)
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
  _createHistoryState ,
  allStateData        ,
  getHistoryState     ,
  setHistoryState     ,
  
}
/* allStateData Not a pure module */
