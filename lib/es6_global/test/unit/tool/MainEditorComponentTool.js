

import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectComponentEngineService.js";

function hasSourceInstanceComponent(gameObject) {
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.hasSourceInstanceComponent(gameObject, param);
              }));
}

export {
  hasSourceInstanceComponent ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
