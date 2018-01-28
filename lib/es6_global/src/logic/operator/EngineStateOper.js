'use strict';

import * as Immutable                       from "../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as HistoryStateUtils$WonderEditor  from "../../state/utils/HistoryStateUtils.js";
import * as EngineStateAdaptor$WonderEditor from "../adaptor/EngineStateAdaptor.js";

function getState() {
  return EngineStateAdaptor$WonderEditor.getState(EngineStateAdaptor$WonderEditor.getStateData(/* () */0));
}

function setState(state) {
  return EngineStateAdaptor$WonderEditor.setState(EngineStateAdaptor$WonderEditor.getStateData(/* () */0), state);
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

var deepCopyStateForRestore = EngineStateAdaptor$WonderEditor.deepCopyStateForRestore;

var restoreState = EngineStateAdaptor$WonderEditor.restoreState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getState                ,
  setState                ,
  undo                    ,
  redo                    ,
  storeEngineState        ,
  
}
/* Immutable Not a pure module */
