

import * as SceneAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/SceneAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectUtils$WonderEditor from "../../../core/utils/engine/GameObjectUtils.js";
import * as CameraEngineService$WonderEditor from "./CameraEngineService.js";
import * as PrimitiveEngineService$WonderEditor from "./PrimitiveEngineService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";

function createDefaultSceneGameObjectsForEditEngineState(cubeGeometry, engineState) {
  var match = PrimitiveEngineService$WonderEditor.createBoxForEditEngineState(cubeGeometry, engineState);
  var match$1 = PrimitiveEngineService$WonderEditor.createBoxForEditEngineState(cubeGeometry, match[0]);
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

function createDefaultSceneGameObjectsForRunEngineState(cubeGeometry, editorState, engineState) {
  var match = PrimitiveEngineService$WonderEditor.createBoxForRunEngineState(cubeGeometry, editorState, engineState);
  var match$1 = PrimitiveEngineService$WonderEditor.createBoxForRunEngineState(cubeGeometry, match[0], match[1]);
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

function disposeSceneAndChildren(engineState) {
  var _iterateGameObjectArray = function (gameObjectArr, engineState) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                  var children = GameObjectUtils$WonderEditor.getChildren(gameObject, engineState);
                  return _iterateGameObjectArray(children, GameObjectEngineService$WonderEditor.disposeGameObjectKeepOrderRemoveGeometry(gameObject, engineState));
                }), engineState, gameObjectArr);
  };
  return _iterateGameObjectArray(/* array */[SceneAPI$Wonderjs.getSceneGameObject(engineState)], engineState);
}

var getAmbientLightColor = SceneAPI$Wonderjs.getAmbientLightColor;

var setAmbientLightColor = SceneAPI$Wonderjs.setAmbientLightColor;

var getSceneGameObject = SceneAPI$Wonderjs.getSceneGameObject;

var addSceneChild = SceneAPI$Wonderjs.addSceneChild;

var addSceneChildren = SceneAPI$Wonderjs.addSceneChildren;

var setSceneGameObject = SceneAPI$Wonderjs.setSceneGameObject;

export {
  createDefaultSceneGameObjectsForEditEngineState ,
  createDefaultSceneGameObjectsForRunEngineState ,
  getAmbientLightColor ,
  setAmbientLightColor ,
  getSceneGameObject ,
  addSceneChild ,
  addSceneChildren ,
  setSceneGameObject ,
  disposeSceneAndChildren ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
