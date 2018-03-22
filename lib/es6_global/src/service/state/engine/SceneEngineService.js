'use strict';

import * as CameraEngineService$WonderEditor    from "./CameraEngineService.js";
import * as PrimitiveEngineService$WonderEditor from "./PrimitiveEngineService.js";

function createDefaultSceneGameObjects(state) {
  var match = PrimitiveEngineService$WonderEditor.createBox(state);
  var match$1 = PrimitiveEngineService$WonderEditor.createBox(match[0]);
  var match$2 = CameraEngineService$WonderEditor.createCamera(match$1[0]);
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
/* CameraEngineService-WonderEditor Not a pure module */
