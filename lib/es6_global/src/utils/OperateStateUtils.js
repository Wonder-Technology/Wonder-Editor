'use strict';

import * as Curry                            from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as MainEditorStateView$WonderEditor from "../component/mainEditor/logic/view/MainEditorStateView.js";

function operateState(handleFunc) {
  return MainEditorStateView$WonderEditor.finishState(Curry._1(handleFunc, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

function operateStateWithReduxData(handleFunc, store, dispatch) {
  return MainEditorStateView$WonderEditor.finishState(Curry._3(handleFunc, store, dispatch, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

export {
  operateState              ,
  operateStateWithReduxData ,
  
}
/* MainEditorStateView-WonderEditor Not a pure module */
