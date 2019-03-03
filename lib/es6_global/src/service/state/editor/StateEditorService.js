

import * as CreateEditorStateDataEditorService$WonderEditor from "../data/CreateEditorStateDataEditorService.js";

function getStateIsDebug(param) {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* isDebug */1];
}

function setStateIsDebug(isDebug) {
  CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* isDebug */1] = isDebug;
  return /* () */0;
}

function getIsRun(param) {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* isRun */2];
}

function setIsRun(isRun) {
  CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* isRun */2] = isRun;
  return /* () */0;
}

function getState(param) {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* editorState */0];
}

function setState(state) {
  CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* editorState */0] = state;
  return state;
}

export {
  getStateIsDebug ,
  setStateIsDebug ,
  getIsRun ,
  setIsRun ,
  getState ,
  setState ,
  
}
/* CreateEditorStateDataEditorService-WonderEditor Not a pure module */
