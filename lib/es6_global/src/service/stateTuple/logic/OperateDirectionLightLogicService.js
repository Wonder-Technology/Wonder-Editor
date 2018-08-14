

import * as LightService$WonderEditor from "../../primitive/light/LightService.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as DirectionLightEngineService$WonderEditor from "../../state/engine/DirectionLightEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

function createDirectionLight(editEngineState, runEngineState) {
  var match = DirectionLightEngineService$WonderEditor.create(editEngineState);
  var match$1 = DirectionLightEngineService$WonderEditor.create(runEngineState);
  return LightService$WonderEditor.checkEditAndRunLightWithDiff(/* tuple */[
              match[1],
              match$1[1]
            ], /* DirectionLight */5, match[0], match$1[0]);
}

function disposeDirectionLight(gameObject, lightComponent, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[gameObject],
                /* type_ : GameObject */0
              ],
              /* record */[
                /* arguments : array */[lightComponent],
                /* type_ : DirectionLight */5
              ]
            ], GameObjectComponentEngineService$WonderEditor.disposeDirectionLightComponent, /* tuple */[
              param[0],
              param[1]
            ]);
}

function addDirectionLight(gameObject, lightComponent, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[gameObject],
                /* type_ : GameObject */0
              ],
              /* record */[
                /* arguments : array */[lightComponent],
                /* type_ : DirectionLight */5
              ]
            ], GameObjectComponentEngineService$WonderEditor.addDirectionLightComponent, /* tuple */[
              param[0],
              param[1]
            ]);
}

export {
  createDirectionLight ,
  disposeDirectionLight ,
  addDirectionLight ,
  
}
/* LightService-WonderEditor Not a pure module */
