

import * as CreateEditorStateDataEditorService$WonderEditor from "./CreateEditorStateDataEditorService.js";

function getEditEngineStateData() {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* engineStateDataForEdit */3];
}

function getRunEngineStateData() {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* engineStateDataForRun */4];
}

export {
  getEditEngineStateData ,
  getRunEngineStateData ,
  
}
/* CreateEditorStateDataEditorService-WonderEditor Not a pure module */
