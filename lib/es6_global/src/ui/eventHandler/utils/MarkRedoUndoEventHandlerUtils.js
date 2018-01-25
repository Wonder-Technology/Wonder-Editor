'use strict';

import * as Curry                            from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable                        from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as Log$WonderLog                    from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AllStateData$WonderEditor        from "../../../state/AllStateData.js";
import * as EngineStateView$WonderEditor     from "../../../logic/view/EngineStateView.js";
import * as StateHistoryView$WonderEditor    from "../../../logic/view/StateHistoryView.js";
import * as MainEditorStateView$WonderEditor from "../../../component/mainEditor/logic/view/MainEditorStateView.js";

function _storeMarkRedoUndoState(uiState, allState) {
  var match = MainEditorStateView$WonderEditor.prepareState(/* () */0);
  var newEngineState = EngineStateView$WonderEditor.deepCopyStateForRestore(match[1]);
  return AllStateData$WonderEditor.setAllState(/* record */[
              /* historyState : record */[/* markRedoUndoStack */Immutable.Stack[/* addFirst */17](/* tuple */[
                      uiState,
                      match[0],
                      newEngineState
                    ], allState[/* historyState */0][/* markRedoUndoStack */0])],
              /* uiState */allState[/* uiState */1],
              /* editorState */allState[/* editorState */2],
              /* engineState */allState[/* engineState */3]
            ]);
}

function _removeMarkRedoUndoFirst(allState) {
  return /* record */[
          /* historyState : record */[/* markRedoUndoStack */Immutable.Stack[/* removeFirstOrRaise */19](allState[/* historyState */0][/* markRedoUndoStack */0])],
          /* uiState */allState[/* uiState */1],
          /* editorState */allState[/* editorState */2],
          /* engineState */allState[/* engineState */3]
        ];
}

function markRedoUndoEventHandler(allState, uiState) {
  var match = Curry._1(Immutable.Stack[/* first */14], allState[/* historyState */0][/* markRedoUndoStack */0]);
  if (match) {
    var match$1 = match[0];
    Log$WonderLog.print(allState[/* historyState */0][/* markRedoUndoStack */0]);
    return _storeMarkRedoUndoState(uiState, StateHistoryView$WonderEditor.storeAllState(match$1[0], match$1[1], match$1[2], _removeMarkRedoUndoFirst(allState)));
  } else {
    return _storeMarkRedoUndoState(uiState, allState);
  }
}

function clearMarkRedoUndoStack(allState) {
  return AllStateData$WonderEditor.setAllState(/* record */[
              /* historyState : record */[/* markRedoUndoStack */Immutable.Stack[/* empty */20](/* () */0)],
              /* uiState */allState[/* uiState */1],
              /* editorState */allState[/* editorState */2],
              /* engineState */allState[/* engineState */3]
            ]);
}

export {
  _storeMarkRedoUndoState  ,
  _removeMarkRedoUndoFirst ,
  markRedoUndoEventHandler ,
  clearMarkRedoUndoStack   ,
  
}
/* Immutable Not a pure module */
