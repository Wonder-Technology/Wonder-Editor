

import * as CreateEditorStateDataEditorService$WonderEditor from "./CreateEditorStateDataEditorService.js";

function getEditEngineStateData() {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* engineStateDataForEdit */2];
}

function getRunEngineStateData() {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* engineStateDataForRun */3];
}

export {
  getEditEngineStateData ,
  getRunEngineStateData ,
  
}
/* CreateEditorStateDataEditorService-WonderEditor Not a pure module */
