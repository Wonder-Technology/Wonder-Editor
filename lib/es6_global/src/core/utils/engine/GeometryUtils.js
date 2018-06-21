

import * as BasicMaterialEngineService$WonderEditor from "../../../service/state/engine/BasicMaterialEngineService.js";

function createGeometry(editEngineState, runEngineState) {
  var match = BasicMaterialEngineService$WonderEditor.create(editEngineState);
  var match$1 = BasicMaterialEngineService$WonderEditor.create(runEngineState);
  return /* tuple */[
          match[1],
          match$1[1],
          match[0],
          match$1[0]
        ];
}

export {
  createGeometry ,
  
}
/* BasicMaterialEngineService-WonderEditor Not a pure module */
