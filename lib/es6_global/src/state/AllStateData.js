'use strict';

import * as Immutable from "../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";

var historyStateData_000 = /* markRedoUndoStack */Immutable.Stack[/* empty */20](/* () */0);

var historyStateData_001 = /* uiRedoStack */Immutable.Stack[/* empty */20](/* () */0);

var historyStateData_002 = /* uiUndoStack */Immutable.Stack[/* empty */20](/* () */0);

var historyStateData_003 = /* editorRedoStack */Immutable.Stack[/* empty */20](/* () */0);

var historyStateData_004 = /* editorUndoStack */Immutable.Stack[/* empty */20](/* () */0);

var historyStateData_005 = /* engineRedoStack */Immutable.Stack[/* empty */20](/* () */0);

var historyStateData_006 = /* engineUndoStack */Immutable.Stack[/* empty */20](/* () */0);

var historyStateData = /* record */[
  historyStateData_000,
  historyStateData_001,
  historyStateData_002,
  historyStateData_003,
  historyStateData_004,
  historyStateData_005,
  historyStateData_006
];

var allStateData = /* record */[/* historyStateData */historyStateData];

function getHistoryState() {
  return allStateData[/* historyStateData */0];
}

function setHistoryState(state) {
  allStateData[/* historyStateData */0] = state;
  return /* () */0;
}

export {
  historyStateData ,
  allStateData     ,
  getHistoryState  ,
  setHistoryState  ,
  
}
/* historyStateData Not a pure module */
