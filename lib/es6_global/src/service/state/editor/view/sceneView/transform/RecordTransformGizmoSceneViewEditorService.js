

import * as OptionService$WonderEditor from "../../../../../primitive/OptionService.js";

function getData(param) {
  return param[/* sceneViewRecord */6][/* transformGizmoData */3];
}

function unsafeGetData(editorState) {
  return OptionService$WonderEditor.unsafeGet(getData(editorState));
}

export {
  getData ,
  unsafeGetData ,
  
}
/* OptionService-WonderEditor Not a pure module */
