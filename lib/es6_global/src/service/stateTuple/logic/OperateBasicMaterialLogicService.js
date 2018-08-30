

import * as MaterialService$WonderEditor from "../../primitive/material/MaterialService.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../state/engine/BasicMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

function createBasicMaterial(editEngineState, runEngineState) {
  var match = BasicMaterialEngineService$WonderEditor.create(editEngineState);
  var match$1 = BasicMaterialEngineService$WonderEditor.create(runEngineState);
  return MaterialService$WonderEditor.checkEditAndRunMaterialWithDiff(/* tuple */[
              match[1],
              match$1[1]
            ], /* BasicMaterial */4, match[0], match$1[0]);
}

function disposeBasicMaterial(gameObject, material, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[gameObject],
                /* type_ : GameObject */0
              ],
              /* record */[
                /* arguments : array */[material],
                /* type_ : BasicMaterial */4
              ]
            ], GameObjectComponentEngineService$WonderEditor.disposeBasicMaterialComponent, /* tuple */[
              param[0],
              param[1]
            ]);
}

function addBasicMaterial(gameObject, material, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[gameObject],
                /* type_ : GameObject */0
              ],
              /* record */[
                /* arguments : array */[material],
                /* type_ : BasicMaterial */4
              ]
            ], GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent, /* tuple */[
              param[0],
              param[1]
            ]);
}

function setBasicMaterialColor(color, material, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
                /* arguments : array */[material],
                /* type_ : BasicMaterial */4
              ]], (function (param, param$1) {
                return BasicMaterialEngineService$WonderEditor.setColor(color, param, param$1);
              }), /* tuple */[
              param[0],
              param[1]
            ]);
}

function setBasicMaterialMapToEngineState(mapId, newMaterial, engineStateTuple) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[mapId],
                /* type_ : Texture */11
              ],
              /* record */[
                /* arguments : array */[newMaterial],
                /* type_ : BasicMaterial */4
              ]
            ], BasicMaterialEngineService$WonderEditor.setMap, engineStateTuple);
}

export {
  createBasicMaterial ,
  disposeBasicMaterial ,
  addBasicMaterial ,
  setBasicMaterialColor ,
  setBasicMaterialMapToEngineState ,
  
}
/* MaterialService-WonderEditor Not a pure module */
