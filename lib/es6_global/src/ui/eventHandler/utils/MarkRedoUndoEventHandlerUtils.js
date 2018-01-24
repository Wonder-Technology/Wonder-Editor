'use strict';

import * as Curry                            from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable                        from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as EngineStateView$WonderEditor     from "../../../logic/view/EngineStateView.js";
import * as StateHistoryView$WonderEditor    from "../../../logic/view/StateHistoryView.js";
import * as MainEditorStateView$WonderEditor from "../../../component/mainEditor/logic/view/MainEditorStateView.js";

var markRedoUndoStack = [Immutable.Stack[/* empty */20](/* () */0)];

function _storeMarkRedoUndoState(uiState) {
  var match = MainEditorStateView$WonderEditor.prepareState(/* () */0);
  var newEngineState = EngineStateView$WonderEditor.deepCopyStateForRestore(match[1]);
  markRedoUndoStack[0] = Immutable.Stack[/* addFirst */17](/* tuple */[
        uiState,
        match[0],
        newEngineState
      ], markRedoUndoStack[0]);
  return /* () */0;
}

function markRedoUndoEventHandler(uiState) {
  var match = Curry._1(Immutable.Stack[/* first */14], markRedoUndoStack[0]);
  if (match) {
    var match$1 = match[0];
    markRedoUndoStack[0] = Immutable.Stack[/* removeFirstOrRaise */19](markRedoUndoStack[0]);
    StateHistoryView$WonderEditor.storeAllState(match$1[0], match$1[1], match$1[2]);
    return _storeMarkRedoUndoState(uiState);
  } else {
    return _storeMarkRedoUndoState(uiState);
  }
}

function clearMarkRedoUndoStack() {
  markRedoUndoStack[0] = Immutable.Stack[/* empty */20](/* () */0);
  return /* () */0;
}

export {
  markRedoUndoStack        ,
  _storeMarkRedoUndoState  ,
  markRedoUndoEventHandler ,
  clearMarkRedoUndoStack   ,
  
}
/* markRedoUndoStack Not a pure module */
