'use strict';

import * as CameraLogicCompositeService$WonderEditor    from "./CameraLogicCompositeService.js";
import * as PrimitiveLogicCompositeService$WonderEditor from "./PrimitiveLogicCompositeService.js";

function createDefaultSceneGameObjects(state) {
  var match = PrimitiveLogicCompositeService$WonderEditor.createBox(state);
  var match$1 = PrimitiveLogicCompositeService$WonderEditor.createBox(match[0]);
  var match$2 = CameraLogicCompositeService$WonderEditor.createCamera(match$1[0]);
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
/* CameraLogicCompositeService-WonderEditor Not a pure module */
