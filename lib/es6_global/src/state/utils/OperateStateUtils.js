'use strict';

import * as Curry                            from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as MainEditorStateView$WonderEditor from "../../component/mainEditor/logic/view/MainEditorStateView.js";

function getState(handleFunc) {
  return Curry._1(handleFunc, MainEditorStateView$WonderEditor.prepareState(/* () */0));
}

var setState = MainEditorStateView$WonderEditor.finishState;

function getAndSetState(handleFunc) {
  return MainEditorStateView$WonderEditor.finishState(Curry._1(handleFunc, MainEditorStateView$WonderEditor.prepareState(/* () */0)));
}

export {
  getState       ,
  setState       ,
  getAndSetState ,
  
}
/* MainEditorStateView-WonderEditor Not a pure module */
