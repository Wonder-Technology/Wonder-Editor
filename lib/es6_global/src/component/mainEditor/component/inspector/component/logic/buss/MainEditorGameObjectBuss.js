'use strict';

import * as MainEditorGameObjectOper$WonderEditor from "../../../../../logic/operator/MainEditorGameObjectOper.js";

function hasMaterialComponent(gameObject, param) {
  return MainEditorGameObjectOper$WonderEditor.hasMaterialComponent(gameObject, param[1]);
}

export {
  hasMaterialComponent ,
  
}
/* MainEditorGameObjectOper-WonderEditor Not a pure module */
