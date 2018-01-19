'use strict';

import * as EditorStateBuss$WonderEditor       from "../buss/EditorStateBuss.js";
import * as EditorStateDataEdit$WonderEditor   from "../edit/EditorStateDataEdit.js";
import * as EditorStateSystemEdit$WonderEditor from "../edit/EditorStateSystemEdit.js";

function getEditorState() {
  return EditorStateSystemEdit$WonderEditor.getState(EditorStateDataEdit$WonderEditor.stateData);
}

function setEditorState(editorState) {
  return EditorStateSystemEdit$WonderEditor.setState(EditorStateDataEdit$WonderEditor.stateData, editorState);
}

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
