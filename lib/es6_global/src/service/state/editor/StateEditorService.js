

import * as StateDataEditor$WonderEditor from "../data/StateDataEditor.js";

function getStateIsDebug(param) {
  return StateDataEditor$WonderEditor.editorStateData[/* isDebug */1];
}

function setStateIsDebug(isDebug) {
  StateDataEditor$WonderEditor.editorStateData[/* isDebug */1] = isDebug;
  return /* () */0;
}

function getIsRun(param) {
  return StateDataEditor$WonderEditor.editorStateData[/* isRun */2];
}

function setIsRun(isRun) {
  StateDataEditor$WonderEditor.editorStateData[/* isRun */2] = isRun;
  return /* () */0;
}

function getState(param) {
  return StateDataEditor$WonderEditor.editorStateData[/* editorState */0];
}

function setState(state) {
  StateDataEditor$WonderEditor.editorStateData[/* editorState */0] = state;
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
/* StateDataEditor-WonderEditor Not a pure module */
