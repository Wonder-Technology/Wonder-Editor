'use strict';

import * as Curry                            from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Immutable                        from "../../../../../../node_modules/immutable-re/lib/es6_global/src/Immutable.js";
import * as EngineStateView$WonderEditor     from "../../../logic/view/EngineStateView.js";
import * as StateHistoryView$WonderEditor    from "../../../logic/view/StateHistoryView.js";
import * as MainEditorStateView$WonderEditor from "../../../component/mainEditor/logic/view/MainEditorStateView.js";

var finishStack = [Immutable.Stack[/* empty */20](/* () */0)];

function _storeFinishState(uiState) {
  var match = MainEditorStateView$WonderEditor.prepareState(/* () */0);
  var newEngineState = EngineStateView$WonderEditor.deepCopyStateForRestore(match[1]);
  finishStack[0] = Immutable.Stack[/* addFirst */17](/* tuple */[
        uiState,
        match[0],
        newEngineState
      ], finishStack[0]);
  return /* () */0;
}

function finishEventHandler(uiState) {
  var match = Curry._1(Immutable.Stack[/* first */14], finishStack[0]);
  if (match) {
    var match$1 = match[0];
    finishStack[0] = Immutable.Stack[/* removeFirstOrRaise */19](finishStack[0]);
    StateHistoryView$WonderEditor.storeAllState(match$1[0], match$1[1], match$1[2]);
    return _storeFinishState(uiState);
  } else {
    return _storeFinishState(uiState);
  }
}

export {
  finishStack        ,
  _storeFinishState  ,
  finishEventHandler ,
  
}
/* finishStack Not a pure module */
