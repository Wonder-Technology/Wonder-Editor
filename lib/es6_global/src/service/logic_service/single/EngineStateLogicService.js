'use strict';

import * as Immutable                      from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as State$Wonderjs                 from "../../../../../../node_modules/wonder.js/lib/es6_global/src/core/api/State.js";
import * as StateData$Wonderjs             from "../../../../../../node_modules/wonder.js/lib/es6_global/src/core/StateData.js";
import * as StateSystem$Wonderjs           from "../../../../../../node_modules/wonder.js/lib/es6_global/src/core/StateSystem.js";
import * as HistoryStateUtils$WonderEditor from "../../../core/state/utils/HistoryStateUtils.js";

function getStateData() {
  return StateData$Wonderjs.stateData;
}

function getState() {
  return StateSystem$Wonderjs.getState(StateData$Wonderjs.stateData);
}

function setState(state) {
  return StateSystem$Wonderjs.setState(StateData$Wonderjs.stateData, state);
}

function undo(historyState, currentState) {
  return HistoryStateUtils$WonderEditor.operateHistory(currentState, historyState[/* engineUndoStack */6], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* uiRedoStack */historyState[/* uiRedoStack */1],
                        /* uiUndoStack */historyState[/* uiUndoStack */2],
                        /* editorRedoStack */historyState[/* editorRedoStack */3],
                        /* editorUndoStack */historyState[/* editorUndoStack */4],
                        /* engineRedoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* engineRedoStack */5]),
                        /* engineUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineUndoStack */6])
                      ];
              }));
}

function redo(historyState, currentState) {
  return HistoryStateUtils$WonderEditor.operateHistory(currentState, historyState[/* engineRedoStack */5], (function () {
                return /* record */[
                        /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
                        /* uiRedoStack */historyState[/* uiRedoStack */1],
                        /* uiUndoStack */historyState[/* uiUndoStack */2],
                        /* editorRedoStack */historyState[/* editorRedoStack */3],
                        /* editorUndoStack */historyState[/* editorUndoStack */4],
                        /* engineRedoStack */Immutable.Stack[/* removeFirstOrRaise */19](historyState[/* engineRedoStack */5]),
                        /* engineUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* engineUndoStack */6])
                      ];
              }));
}

function storeEngineState(currentState, historyState) {
  return /* record */[
          /* markRedoUndoStack */historyState[/* markRedoUndoStack */0],
          /* uiRedoStack */historyState[/* uiRedoStack */1],
          /* uiUndoStack */historyState[/* uiUndoStack */2],
          /* editorRedoStack */historyState[/* editorRedoStack */3],
          /* editorUndoStack */historyState[/* editorUndoStack */4],
          /* engineRedoStack */Immutable.Stack[/* empty */20](/* () */0),
          /* engineUndoStack */Immutable.Stack[/* addFirst */17](currentState, historyState[/* engineUndoStack */6])
        ];
}

var deepCopyStateForRestore = State$Wonderjs.deepCopyStateForRestore;

var restoreState = State$Wonderjs.restoreState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getStateData            ,
  getState                ,
  setState                ,
  undo                    ,
  redo                    ,
  storeEngineState        ,
  
}
/* Immutable Not a pure module */
