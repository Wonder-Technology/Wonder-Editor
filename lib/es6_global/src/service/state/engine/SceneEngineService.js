'use strict';

import * as GameObjectUtils$WonderEditor         from "../../../core/component/mainEditor/utils/GameObjectUtils.js";
import * as CameraEngineService$WonderEditor     from "./CameraEngineService.js";
import * as PrimitiveEngineService$WonderEditor  from "./PrimitiveEngineService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";

function addBox(targetGameObject, engineState) {
  var match = PrimitiveEngineService$WonderEditor.createBox(engineState);
  var box = match[1];
  return /* tuple */[
          box,
          GameObjectUtils$WonderEditor.addChild(targetGameObject, box, GameObjectEngineService$WonderEditor.initGameObject(box, match[0]))
        ];
}

function createDefaultSceneGameObjects(state) {
  var match = PrimitiveEngineService$WonderEditor.createBox(state);
  var match$1 = PrimitiveEngineService$WonderEditor.createBox(match[0]);
  var match$2 = CameraEngineService$WonderEditor.createCamera(match$1[0]);
  return /* tuple */[
          match$2[0],
          match$2[1],
          match[1],
          match$1[1]
        ];
}

export {
  addBox                        ,
  createDefaultSceneGameObjects ,
  
}
/* GameObjectUtils-WonderEditor Not a pure module */
