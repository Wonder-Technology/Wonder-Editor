

import * as LightService$WonderEditor from "../../primitive/light/LightService.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as PointLightEngineService$WonderEditor from "../../state/engine/PointLightEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

function createPointLight(editEngineState, runEngineState) {
  var match = PointLightEngineService$WonderEditor.create(editEngineState);
  var match$1 = PointLightEngineService$WonderEditor.create(runEngineState);
  return LightService$WonderEditor.checkEditAndRunLightWithDiff(/* tuple */[
              match[1],
              match$1[1]
            ], /* PointLight */7, match[0], match$1[0]);
}

function disposePointLight(gameObject, lightComponent, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[gameObject],
                /* type_ : GameObject */0
              ],
              /* record */[
                /* arguments : array */[lightComponent],
                /* type_ : PointLight */7
              ]
            ], GameObjectComponentEngineService$WonderEditor.disposePointLightComponent, /* tuple */[
              param[0],
              param[1]
            ]);
}

function addPointLight(gameObject, lightComponent, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[gameObject],
                /* type_ : GameObject */0
              ],
              /* record */[
                /* arguments : array */[lightComponent],
                /* type_ : PointLight */7
              ]
            ], GameObjectComponentEngineService$WonderEditor.addPointLightComponent, /* tuple */[
              param[0],
              param[1]
            ]);
}

export {
  createPointLight ,
  disposePointLight ,
  addPointLight ,
  
}
/* LightService-WonderEditor Not a pure module */
