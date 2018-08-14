

import * as SceneAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/SceneAPI.js";
import * as CameraEngineService$WonderEditor from "./CameraEngineService.js";
import * as PrimitiveEngineService$WonderEditor from "./PrimitiveEngineService.js";

function createDefaultSceneGameObjectsForEditEngineState(engineState) {
  var match = PrimitiveEngineService$WonderEditor.createBoxForEditEngineState(engineState);
  var match$1 = PrimitiveEngineService$WonderEditor.createBoxForEditEngineState(match[0]);
  var match$2 = PrimitiveEngineService$WonderEditor.createDirectionLightForEditEngineState(match$1[0]);
  var match$3 = CameraEngineService$WonderEditor.createCameraForEditEngineState(match$2[0]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          match[1],
          match$1[1],
          match$2[1]
        ];
}

function createDefaultSceneGameObjectsForRunEngineState(editorState, engineState) {
  var match = PrimitiveEngineService$WonderEditor.createBoxForRunEngineState(editorState, engineState);
  var match$1 = PrimitiveEngineService$WonderEditor.createBoxForRunEngineState(match[0], match[1]);
  var match$2 = PrimitiveEngineService$WonderEditor.createDirectionLightForRunEngineState(match$1[0], match$1[1]);
  var match$3 = CameraEngineService$WonderEditor.createCameraForRunEngineState(match$2[0], match$2[1]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          match$3[2],
          match[2],
          match$1[2],
          match$2[2]
        ];
}

var getAmbientLightColor = SceneAPI$Wonderjs.getAmbientLightColor;

var setAmbientLightColor = SceneAPI$Wonderjs.setAmbientLightColor;

var getSceneGameObject = SceneAPI$Wonderjs.getSceneGameObject;

var addSceneChild = SceneAPI$Wonderjs.addSceneChild;

var addSceneChildren = SceneAPI$Wonderjs.addSceneChildren;

export {
  createDefaultSceneGameObjectsForEditEngineState ,
  createDefaultSceneGameObjectsForRunEngineState ,
  getAmbientLightColor ,
  setAmbientLightColor ,
  getSceneGameObject ,
  addSceneChild ,
  addSceneChildren ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
