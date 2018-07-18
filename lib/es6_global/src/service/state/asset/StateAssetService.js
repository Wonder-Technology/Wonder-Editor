

import * as CreateEditorStateDataEditorService$WonderEditor from "../data/CreateEditorStateDataEditorService.js";

function getState() {
  return CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* assetState */1];
}

function setState(state) {
  CreateEditorStateDataEditorService$WonderEditor.editorStateData[/* assetState */1] = state;
  return state;
}

export {
  getState ,
  setState ,
  
}
/* CreateEditorStateDataEditorService-WonderEditor Not a pure module */
