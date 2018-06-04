

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as SceneAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/SceneAPI.js";
import * as PrimitiveEngineService$WonderEditor from "./PrimitiveEngineService.js";

function createDefaultSceneGameObjects(state, createCameraFunc) {
  var match = PrimitiveEngineService$WonderEditor.createBox(state);
  var match$1 = PrimitiveEngineService$WonderEditor.createBox(match[0]);
  var match$2 = Curry._1(createCameraFunc, match$1[0]);
  return /* tuple */[
          match$2[0],
          match$2[1],
          match[1],
          match$1[1]
        ];
}

var setCurrentCameraGameObject = SceneAPI$Wonderjs.setCurrentCameraGameObject;

export {
  createDefaultSceneGameObjects ,
  setCurrentCameraGameObject ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
