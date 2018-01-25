'use strict';

import * as Curry                     from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable                 from "../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as AllStateData$WonderEditor from "../../state/AllStateData.js";

function goBack(allState, currentState) {
  var match = Curry._1(Immutable.Stack[/* first */14], allState[/* uiState */1][/* undoStack */1]);
  if (match) {
    AllStateData$WonderEditor.setAllState(/* record */[
          /* historyState */allState[/* historyState */0],
          /* uiState : record */[
            /* redoStack */Immutable.Stack[/* addFirst */17](currentState, allState[/* uiState */1][/* redoStack */0]),
            /* undoStack */Immutable.Stack[/* removeFirstOrRaise */19](allState[/* uiState */1][/* undoStack */1])
          ],
          /* editorState */allState[/* editorState */2],
          /* engineState */allState[/* engineState */3]
        ]);
    return match[0];
  } else {
    return currentState;
  }
}

function goForward(allState, currentState) {
  var match = Curry._1(Immutable.Stack[/* first */14], allState[/* uiState */1][/* redoStack */0]);
  if (match) {
    AllStateData$WonderEditor.setAllState(/* record */[
          /* historyState */allState[/* historyState */0],
          /* uiState : record */[
            /* redoStack */Immutable.Stack[/* removeFirstOrRaise */19](allState[/* uiState */1][/* redoStack */0]),
            /* undoStack */Immutable.Stack[/* addFirst */17](currentState, allState[/* uiState */1][/* undoStack */1])
          ],
          /* editorState */allState[/* editorState */2],
          /* engineState */allState[/* engineState */3]
        ]);
    return match[0];
  } else {
    return currentState;
  }
}

function storeUIState(currentState, allState) {
  return /* record */[
          /* historyState */allState[/* historyState */0],
          /* uiState : record */[
            /* redoStack */Immutable.Stack[/* empty */20](/* () */0),
            /* undoStack */Immutable.Stack[/* addFirst */17](currentState, allState[/* uiState */1][/* undoStack */1])
          ],
          /* editorState */allState[/* editorState */2],
          /* engineState */allState[/* engineState */3]
        ];
}

export {
  goBack       ,
  goForward    ,
  storeUIState ,
  
}
/* Immutable Not a pure module */
