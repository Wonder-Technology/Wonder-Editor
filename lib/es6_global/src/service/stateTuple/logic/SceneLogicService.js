

import * as CameraLogicService$WonderEditor from "./CameraLogicService.js";
import * as PrimitiveLogicService$WonderEditor from "./PrimitiveLogicService.js";

function createDefaultSceneGameObjects(componentData, editorState, engineState) {
  var match = PrimitiveLogicService$WonderEditor.createCube(componentData, editorState, engineState);
  var match$1 = PrimitiveLogicService$WonderEditor.createCube(componentData, match[0], match[1]);
  var match$2 = PrimitiveLogicService$WonderEditor.createDirectionLight(match$1[0], match$1[1]);
  var match$3 = CameraLogicService$WonderEditor.createCamera(match$2[0], match$2[1]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          match$3[2],
          match[2],
          match$1[2],
          match$2[2]
        ];
}

export {
  createDefaultSceneGameObjects ,
  
}
/* CameraLogicService-WonderEditor Not a pure module */
