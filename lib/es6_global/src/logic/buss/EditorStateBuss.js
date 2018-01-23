'use strict';

import * as EditorStateDataEdit$WonderEditor   from "../edit/EditorStateDataEdit.js";
import * as EditorStateSystemEdit$WonderEditor from "../edit/EditorStateSystemEdit.js";

function getEditorState() {
  return EditorStateSystemEdit$WonderEditor.getState(EditorStateDataEdit$WonderEditor.stateData);
}

function setEditorState(editorState) {
  return EditorStateSystemEdit$WonderEditor.setState(EditorStateDataEdit$WonderEditor.stateData, editorState);
}

var goBack = EditorStateSystemEdit$WonderEditor.goBack;

var goForward = EditorStateSystemEdit$WonderEditor.goForward;

var storeEditorState = EditorStateSystemEdit$WonderEditor.storeEditorState;

export {
  getEditorState   ,
  setEditorState   ,
  goBack           ,
  goForward        ,
  storeEditorState ,
  
}
/* EditorStateSystemEdit-WonderEditor Not a pure module */
