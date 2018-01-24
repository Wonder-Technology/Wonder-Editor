'use strict';

import * as Curry                           from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable                       from "../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as AllStateData$WonderEditor       from "../../state/AllStateData.js";
import * as EngineStateAdaptor$WonderEditor from "../adaptor/EngineStateAdaptor.js";

function getState() {
  return EngineStateAdaptor$WonderEditor.getState(EngineStateAdaptor$WonderEditor.getStateData(/* () */0));
}

function setState(state) {
  return EngineStateAdaptor$WonderEditor.setState(EngineStateAdaptor$WonderEditor.getStateData(/* () */0), state);
}

function goBack(allState, currentState) {
  var match = Curry._1(Immutable.Stack[/* first */14], allState[/* engineState */3][/* undoStack */1]);
  if (match) {
    AllStateData$WonderEditor.setAllState(/* record */[
          /* eventState */allState[/* eventState */0],
          /* uiState */allState[/* uiState */1],
          /* editorState */allState[/* editorState */2],
          /* engineState : record */[
            /* redoStack */Immutable.Stack[/* addFirst */17](currentState, allState[/* engineState */3][/* redoStack */0]),
            /* undoStack */Immutable.Stack[/* removeFirstOrRaise */19](allState[/* engineState */3][/* undoStack */1])
          ]
        ]);
    return match[0];
  } else {
    return currentState;
  }
}

function goForward(allState, currentState) {
  var match = Curry._1(Immutable.Stack[/* first */14], allState[/* engineState */3][/* redoStack */0]);
  if (match) {
    AllStateData$WonderEditor.setAllState(/* record */[
          /* eventState */allState[/* eventState */0],
          /* uiState */allState[/* uiState */1],
          /* editorState */allState[/* editorState */2],
          /* engineState : record */[
            /* redoStack */Immutable.Stack[/* removeFirstOrRaise */19](allState[/* engineState */3][/* redoStack */0]),
            /* undoStack */Immutable.Stack[/* addFirst */17](currentState, allState[/* engineState */3][/* undoStack */1])
          ]
        ]);
    return match[0];
  } else {
    return currentState;
  }
}

function storeEngineState(currentState, allState) {
  return /* record */[
          /* eventState */allState[/* eventState */0],
          /* uiState */allState[/* uiState */1],
          /* editorState */allState[/* editorState */2],
          /* engineState : record */[
            /* redoStack */Immutable.Stack[/* empty */20](/* () */0),
            /* undoStack */Immutable.Stack[/* addFirst */17](currentState, allState[/* engineState */3][/* undoStack */1])
          ]
        ];
}

var deepCopyStateForRestore = EngineStateAdaptor$WonderEditor.deepCopyStateForRestore;

var restoreState = EngineStateAdaptor$WonderEditor.restoreState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getState                ,
  setState                ,
  goBack                  ,
  goForward               ,
  storeEngineState        ,
  
}
/* Immutable Not a pure module */
