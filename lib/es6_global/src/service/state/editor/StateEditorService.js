'use strict';

import * as EditorStateData$WonderEditor from "../data/EditorStateData.js";

function getStateIsDebug() {
  return EditorStateData$WonderEditor.editorStateData[/* isDebug */1];
}

function getState() {
  return EditorStateData$WonderEditor.editorStateData[/* state */0];
}

function setState(state) {
  EditorStateData$WonderEditor.editorStateData[/* state */0] = state;
  return state;
}

export {
  getStateIsDebug ,
  getState        ,
  setState        ,
  
}
/* No side effect */
