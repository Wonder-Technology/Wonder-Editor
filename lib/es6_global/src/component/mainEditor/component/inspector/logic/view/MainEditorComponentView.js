'use strict';

import * as MainEditorComponentBuss$WonderEditor  from "../buss/MainEditorComponentBuss.js";
import * as MainEditorGameObjectBuss$WonderEditor from "../buss/MainEditorGameObjectBuss.js";

function addComponentByType(_, currentGameObject, stateTuple) {
  var match = MainEditorComponentBuss$WonderEditor.createSourceInstanceComponent(stateTuple);
  return MainEditorGameObjectBuss$WonderEditor.addSourceInstanceComponent(currentGameObject, match[0], match[1]);
}

export {
  addComponentByType ,
  
}
/* MainEditorComponentBuss-WonderEditor Not a pure module */
