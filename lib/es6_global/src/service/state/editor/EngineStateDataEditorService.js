'use strict';

import * as EditorStateData$WonderEditor from "./data/EditorStateData.js";

function getEditEngineStateData() {
  return EditorStateData$WonderEditor.editorStateData[/* engineStateDataForEdit */2];
}

function getRunEngineStateData() {
  return EditorStateData$WonderEditor.editorStateData[/* engineStateDataForRun */3];
}

export {
  getEditEngineStateData ,
  getRunEngineStateData  ,
  
}
/* EditorStateData-WonderEditor Not a pure module */
