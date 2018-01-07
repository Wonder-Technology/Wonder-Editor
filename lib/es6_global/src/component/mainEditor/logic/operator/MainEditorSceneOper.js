'use strict';

import * as MainEditorCameraOper$WonderEditor    from "./MainEditorCameraOper.js";
import * as MainEditorPrimitiveOper$WonderEditor from "./MainEditorPrimitiveOper.js";

function createDefaultSceneGameObjects(state) {
  var match = MainEditorPrimitiveOper$WonderEditor.createBox(state);
  var match$1 = MainEditorPrimitiveOper$WonderEditor.createBox(match[0]);
  var match$2 = MainEditorCameraOper$WonderEditor.createCamera(match$1[0]);
  return /* tuple */[
          match$2[0],
          match$2[1],
          match[1],
          match$1[1]
        ];
}

export {
  createDefaultSceneGameObjects ,
  
}
/* MainEditorCameraOper-WonderEditor Not a pure module */
