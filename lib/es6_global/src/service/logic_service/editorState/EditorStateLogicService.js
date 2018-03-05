'use strict';

import * as EditorStateBuss$WonderEditor from "../../../core/logic/buss/EditorStateBuss.js";

var getEditorState = EditorStateBuss$WonderEditor.getEditorState;

var setEditorState = EditorStateBuss$WonderEditor.setEditorState;

var undo = EditorStateBuss$WonderEditor.undo;

var redo = EditorStateBuss$WonderEditor.redo;

var storeEditorState = EditorStateBuss$WonderEditor.storeEditorState;

export {
  getEditorState   ,
  setEditorState   ,
  undo             ,
  redo             ,
  storeEditorState ,
  
}
/* EditorStateBuss-WonderEditor Not a pure module */
