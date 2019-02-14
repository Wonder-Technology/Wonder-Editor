

import * as BasicMaterialEngineService$WonderEditor from "../../../state/engine/BasicMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectComponentEngineService.js";

function createBasicMaterial(engineState) {
  var match = BasicMaterialEngineService$WonderEditor.create(engineState);
  return /* tuple */[
          match[1],
          match[0]
        ];
}

var disposeBasicMaterial = GameObjectComponentEngineService$WonderEditor.disposeBasicMaterialComponent;

var addBasicMaterial = GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent;

var setBasicMaterialColor = BasicMaterialEngineService$WonderEditor.setColor;

export {
  createBasicMaterial ,
  disposeBasicMaterial ,
  addBasicMaterial ,
  setBasicMaterialColor ,
  
}
/* BasicMaterialEngineService-WonderEditor Not a pure module */
