'use strict';

import * as EditorStateLogicService$WonderEditor from "../service/logic_service/editorState/EditorStateLogicService.js";

var getEditorState = EditorStateLogicService$WonderEditor.getState;

var setEditorState = EditorStateLogicService$WonderEditor.setState;

var undo = EditorStateLogicService$WonderEditor.undo;

var redo = EditorStateLogicService$WonderEditor.redo;

var storeEditorState = EditorStateLogicService$WonderEditor.storeEditorState;

export {
  getEditorState   ,
  setEditorState   ,
  undo             ,
  redo             ,
  storeEditorState ,
  
}
/* EditorStateLogicService-WonderEditor Not a pure module */
