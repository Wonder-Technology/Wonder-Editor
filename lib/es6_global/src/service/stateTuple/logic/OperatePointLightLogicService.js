

import * as PointLightEngineService$WonderEditor from "../../state/engine/PointLightEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

var createPointLight = PointLightEngineService$WonderEditor.create;

var disposePointLight = GameObjectComponentEngineService$WonderEditor.disposePointLightComponent;

var addPointLight = GameObjectComponentEngineService$WonderEditor.addPointLightComponent;

export {
  createPointLight ,
  disposePointLight ,
  addPointLight ,
  
}
/* PointLightEngineService-WonderEditor Not a pure module */
