

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as SceneAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/SceneAPI.js";
import * as PrimitiveEngineService$WonderEditor from "./PrimitiveEngineService.js";

function createDefaultSceneGameObjects(state, createCameraFunc) {
  var match = PrimitiveEngineService$WonderEditor.createBox(state);
  var match$1 = PrimitiveEngineService$WonderEditor.createBox(match[0]);
  var match$2 = PrimitiveEngineService$WonderEditor.createDirectionLight(match$1[0]);
  var match$3 = Curry._1(createCameraFunc, match$2[0]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          match[1],
          match$1[1],
          match$2[1]
        ];
}

var setCurrentCameraGameObject = SceneAPI$Wonderjs.setCurrentCameraGameObject;

var getCurrentCameraGameObject = SceneAPI$Wonderjs.getCurrentCameraGameObject;

var getAmbientLightColor = SceneAPI$Wonderjs.getAmbientLightColor;

var setAmbientLightColor = SceneAPI$Wonderjs.setAmbientLightColor;

var getSceneGameObject = SceneAPI$Wonderjs.getSceneGameObject;

var addSceneChild = SceneAPI$Wonderjs.addSceneChild;

var addSceneChildren = SceneAPI$Wonderjs.addSceneChildren;

export {
  createDefaultSceneGameObjects ,
  setCurrentCameraGameObject ,
  getCurrentCameraGameObject ,
  getAmbientLightColor ,
  setAmbientLightColor ,
  getSceneGameObject ,
  addSceneChild ,
  addSceneChildren ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
