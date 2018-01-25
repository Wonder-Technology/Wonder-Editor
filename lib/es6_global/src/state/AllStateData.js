'use strict';

import * as Immutable from "../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";

var stateData_000 = /* historyState : record */[/* markRedoUndoStack */Immutable.Stack[/* empty */20](/* () */0)];

var stateData_001 = /* uiState : record */[
  /* redoStack */Immutable.Stack[/* empty */20](/* () */0),
  /* undoStack */Immutable.Stack[/* empty */20](/* () */0)
];

var stateData_002 = /* editorState : record */[
  /* redoStack */Immutable.Stack[/* empty */20](/* () */0),
  /* undoStack */Immutable.Stack[/* empty */20](/* () */0)
];

var stateData_003 = /* engineState : record */[
  /* redoStack */Immutable.Stack[/* empty */20](/* () */0),
  /* undoStack */Immutable.Stack[/* empty */20](/* () */0)
];

var stateData = /* record */[
  stateData_000,
  stateData_001,
  stateData_002,
  stateData_003
];

var allStateData = /* record */[/* allState */stateData];

function getAllState() {
  return allStateData[/* allState */0];
}

function setAllState(state) {
  allStateData[/* allState */0] = state;
  return /* () */0;
}

export {
  stateData    ,
  allStateData ,
  getAllState  ,
  setAllState  ,
  
}
/* stateData Not a pure module */
