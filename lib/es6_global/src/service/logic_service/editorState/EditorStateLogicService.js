'use strict';

import * as EditorStateDataEdit$WonderEditor      from "../../../core/logic/edit/EditorStateDataEdit.js";
import * as EditorStateCommonService$WonderEditor from "../../common_service/editorState/EditorStateCommonService.js";

function getState() {
  return EditorStateCommonService$WonderEditor.getState(EditorStateDataEdit$WonderEditor.stateData);
}

function setState(editorState) {
  return EditorStateCommonService$WonderEditor.setState(EditorStateDataEdit$WonderEditor.stateData, editorState);
}

var undo = EditorStateCommonService$WonderEditor.undo;

var redo = EditorStateCommonService$WonderEditor.redo;

var storeEditorState = EditorStateCommonService$WonderEditor.storeEditorState;

export {
  getState         ,
  setState         ,
  undo             ,
  redo             ,
  storeEditorState ,
  
}
/* EditorStateCommonService-WonderEditor Not a pure module */
