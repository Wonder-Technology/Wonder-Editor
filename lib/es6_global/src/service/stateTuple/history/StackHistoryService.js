

import * as Immutable$WonderEditor from "../../../core/external/Immutable.js";
import * as AllStateData$WonderEditor from "../data/AllStateData.js";

function limitStackMaxSize(maxStackSize, stack) {
  return Immutable$WonderEditor.Stack[/* sliceToFirst */7](maxStackSize, stack);
}

function clearAllStack(historyState) {
  return AllStateData$WonderEditor.setHistoryState(/* record */[
              /* copiedRedoUndoStackRecord */undefined,
              /* uiRedoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0),
              /* uiUndoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0),
              /* editorRedoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0),
              /* editorUndoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0),
              /* engineRedoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0),
              /* engineUndoStack */Immutable$WonderEditor.Stack[/* empty */0](/* () */0)
            ]);
}

export {
  limitStackMaxSize ,
  clearAllStack ,
  
}
/* No side effect */
