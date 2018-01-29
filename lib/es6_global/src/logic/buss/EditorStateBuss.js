'use strict';

import * as EditorStateDataEdit$WonderEditor   from "../edit/EditorStateDataEdit.js";
import * as EditorStateSystemEdit$WonderEditor from "../edit/EditorStateSystemEdit.js";

function getEditorState() {
  return EditorStateSystemEdit$WonderEditor.getState(EditorStateDataEdit$WonderEditor.stateData);
}

function setEditorState(editorState) {
  return EditorStateSystemEdit$WonderEditor.setState(EditorStateDataEdit$WonderEditor.stateData, editorState);
}

var undo = EditorStateSystemEdit$WonderEditor.undo;

var redo = EditorStateSystemEdit$WonderEditor.redo;

var storeEditorState = EditorStateSystemEdit$WonderEditor.storeEditorState;

export {
  getEditorState   ,
  setEditorState   ,
  undo             ,
  redo             ,
  storeEditorState ,
  
}
/* EditorStateSystemEdit-WonderEditor Not a pure module */
