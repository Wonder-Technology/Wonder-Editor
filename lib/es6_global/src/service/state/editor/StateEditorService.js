

import * as CreateEditorStateDataEditorService$WonderEditor from "../data/CreateEditorStateDataEditorService.js";

function getStateIsDebug() {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* isDebug */1];
}

function getState() {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* editorState */0];
}

function setState(state) {
  CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* editorState */0] = state;
  return state;
}

export {
  getStateIsDebug ,
  getState ,
  setState ,
  
}
/* CreateEditorStateDataEditorService-WonderEditor Not a pure module */
