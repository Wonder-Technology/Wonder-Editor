'use strict';

import * as MainEditorMainBuss$WonderEditor from "../bussiness/MainEditorMainBuss.js";

function prepareState() {
  return /* tuple */[
          MainEditorMainBuss$WonderEditor.getEditorState(/* () */0),
          MainEditorMainBuss$WonderEditor.getEngineState(/* () */0)
        ];
}

function finishState(param) {
  MainEditorMainBuss$WonderEditor.setEditorState(param[0]);
  MainEditorMainBuss$WonderEditor.setEngineState(param[1]);
  return /* () */0;
}

var getEditorState = MainEditorMainBuss$WonderEditor.getEditorState;

var getEngineState = MainEditorMainBuss$WonderEditor.getEngineState;

var setEngineState = MainEditorMainBuss$WonderEditor.setEngineState;

var setEditorState = MainEditorMainBuss$WonderEditor.setEditorState;

export {
  getEditorState ,
  getEngineState ,
  setEngineState ,
  setEditorState ,
  prepareState   ,
  finishState    ,
  
}
/* MainEditorMainBuss-WonderEditor Not a pure module */
