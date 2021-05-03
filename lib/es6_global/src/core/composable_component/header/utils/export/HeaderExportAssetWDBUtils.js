

import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../../service/state/engine/GenerateSceneGraphEngineService.js";

function generate(wdbGameObject, imageUint8ArrayMap, engineState) {
  var match = GenerateSceneGraphEngineService$WonderEditor.generateWDBForASB(wdbGameObject, imageUint8ArrayMap, engineState);
  return /* tuple */[
          match[0],
          match[2]
        ];
}

export {
  generate ,
  
}
/* GenerateSceneGraphEngineService-WonderEditor Not a pure module */
