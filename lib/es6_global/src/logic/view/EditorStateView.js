'use strict';

import * as EditorStateBuss$WonderEditor from "../buss/EditorStateBuss.js";

var getEditorState = EditorStateBuss$WonderEditor.getEditorState;

var setEditorState = EditorStateBuss$WonderEditor.setEditorState;

var goBack = EditorStateBuss$WonderEditor.goBack;

var goForward = EditorStateBuss$WonderEditor.goForward;

var storeEditorState = EditorStateBuss$WonderEditor.storeEditorState;

export {
  getEditorState   ,
  setEditorState   ,
  goBack           ,
  goForward        ,
  storeEditorState ,
  
}
/* EditorStateBuss-WonderEditor Not a pure module */
