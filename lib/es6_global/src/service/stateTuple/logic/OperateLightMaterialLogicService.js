

import * as MaterialService$WonderEditor from "../../primitive/material/MaterialService.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as LightMaterialEngineService$WonderEditor from "../../state/engine/LightMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

function createLightMaterial(editEngineState, runEngineState) {
  var match = LightMaterialEngineService$WonderEditor.create(editEngineState);
  var match$1 = LightMaterialEngineService$WonderEditor.create(runEngineState);
  return MaterialService$WonderEditor.checkEditAndRunMaterialWithDiff(/* tuple */[
              match[1],
              match$1[1]
            ], /* LightMaterial */5, match[0], match$1[0]);
}

function disposeLightMaterial(gameObject, material, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[gameObject],
                /* type_ : GameObject */0
              ],
              /* record */[
                /* arguments : array */[material],
                /* type_ : LightMaterial */5
              ]
            ], GameObjectComponentEngineService$WonderEditor.disposeLightMaterialComponent, /* tuple */[
              param[0],
              param[1]
            ]);
}

function addLightMaterial(gameObject, material, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[gameObject],
                /* type_ : GameObject */0
              ],
              /* record */[
                /* arguments : array */[material],
                /* type_ : LightMaterial */5
              ]
            ], GameObjectComponentEngineService$WonderEditor.addLightMaterialComponent, /* tuple */[
              param[0],
              param[1]
            ]);
}

function setLightMaterialColor(color, material, param) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
                /* arguments : array */[material],
                /* type_ : LightMaterial */5
              ]], (function (param, param$1) {
                return LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseColor(color, param, param$1);
              }), /* tuple */[
              param[0],
              param[1]
            ]);
}

function setLightMaterialMapToEngineState(mapId, newMaterial, engineStateTuple) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[mapId],
                /* type_ : Texture */11
              ],
              /* record */[
                /* arguments : array */[newMaterial],
                /* type_ : LightMaterial */5
              ]
            ], LightMaterialEngineService$WonderEditor.setLightMaterialDiffuseMap, engineStateTuple);
}

function reInitAllMaterials(engineState) {
  return LightMaterialEngineService$WonderEditor.reInitMaterials(GameObjectComponentEngineService$WonderEditor.getAllLightMaterialComponents(engineState), engineState);
}

export {
  createLightMaterial ,
  disposeLightMaterial ,
  addLightMaterial ,
  setLightMaterialColor ,
  setLightMaterialMapToEngineState ,
  reInitAllMaterials ,
  
}
/* MaterialService-WonderEditor Not a pure module */
