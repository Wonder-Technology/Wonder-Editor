

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as GeometryUtils$WonderEditor from "../../../core/utils/engine/GeometryUtils.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as DirectorEngineService$WonderEditor from "../../state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/GameObjectEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../state/engine/BasicMaterialEngineService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../state/engine/BasicSourceTextureEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

function changeTextureMapAndRereshEngineState(material, mapId) {
  var match = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
        /* record */[
          /* arguments : array */[mapId],
          /* type_ : Texture */3
        ],
        /* record */[
          /* arguments : array */[material],
          /* type_ : Material */2
        ]
      ], BasicMaterialEngineService$WonderEditor.setMap, /* tuple */[
        StateLogicService$WonderEditor.getEditEngineState(/* () */0),
        StateLogicService$WonderEditor.getRunEngineState(/* () */0)
      ]);
  StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, match[0]));
  return StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, match[1]));
}

function rebuildMaterialAndRefreshEngineState(gameObject, material, setMapFunc) {
  var color = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return BasicMaterialEngineService$WonderEditor.getColor(material, param);
        }));
  var match = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
        /* record */[
          /* arguments : array */[gameObject],
          /* type_ : GameObject */0
        ],
        /* record */[
          /* arguments : array */[material],
          /* type_ : Material */2
        ]
      ], GameObjectEngineService$WonderEditor.disposeGameObjectBasicMaterialComponent, /* tuple */[
        StateLogicService$WonderEditor.getEditEngineState(/* () */0),
        StateLogicService$WonderEditor.getRunEngineState(/* () */0)
      ]);
  var match$1 = GeometryUtils$WonderEditor.createGeometry(match[0], match[1]);
  var newMaterial = match$1[0];
  var engineStateTuple = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
          /* arguments : array */[newMaterial],
          /* type_ : Material */2
        ]], (function (param, param$1) {
          return BasicMaterialEngineService$WonderEditor.setColor(color, param, param$1);
        }), /* tuple */[
        match$1[1],
        match$1[2]
      ]);
  var match$2 = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
          /* arguments : array */[gameObject],
          /* type_ : GameObject */0
        ]], GameObjectEngineService$WonderEditor.initGameObject, StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
            /* record */[
              /* arguments : array */[gameObject],
              /* type_ : GameObject */0
            ],
            /* record */[
              /* arguments : array */[newMaterial],
              /* type_ : Material */2
            ]
          ], GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent, setMapFunc ? Curry._2(setMapFunc[0], newMaterial, engineStateTuple) : engineStateTuple));
  StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, match$2[0]));
  return StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, match$2[1]));
}

function _setMapToEditAndRunEngineState(mapId, newMaterial, engineStateTuple) {
  return StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[
              /* record */[
                /* arguments : array */[mapId],
                /* type_ : Texture */3
              ],
              /* record */[
                /* arguments : array */[newMaterial],
                /* type_ : Material */2
              ]
            ], BasicMaterialEngineService$WonderEditor.setMap, engineStateTuple);
}

function setTextureMapToGameObjectMaterial(gameObject, material, mapId) {
  return rebuildMaterialAndRefreshEngineState(gameObject, material, /* Some */[(function (param, param$1) {
                  return _setMapToEditAndRunEngineState(mapId, param, param$1);
                })]);
}

function renameTextureToEngine(texture, newName) {
  return StateLogicService$WonderEditor.getAndSetEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[texture],
                /* type_ : Texture */3
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setBasicSourceTextureName(newName, param, param$1);
              }));
}

export {
  changeTextureMapAndRereshEngineState ,
  rebuildMaterialAndRefreshEngineState ,
  _setMapToEditAndRunEngineState ,
  setTextureMapToGameObjectMaterial ,
  renameTextureToEngine ,
  
}
/* GeometryUtils-WonderEditor Not a pure module */
