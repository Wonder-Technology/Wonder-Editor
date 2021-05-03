

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as SceneEngineService$WonderEditor from "../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as ArcballCameraControllerLogicService$WonderEditor from "../../../../../service/stateTuple/logic/ArcballCameraControllerLogicService.js";

function generateWDB(param, generateWDBFunc, engineState) {
  var rootGameObject = param[0];
  var isRun = StateEditorService$WonderEditor.getIsRun(/* () */0);
  var engineState$1 = isRun ? engineState : ArcballCameraControllerLogicService$WonderEditor.bindGameViewActiveCameraArcballCameraControllerEvent(engineState);
  var engineState$2 = GameObjectEngineService$WonderEditor.setGameObjectIsRoot(rootGameObject, param[1], engineState$1);
  var match = Curry._3(generateWDBFunc, rootGameObject, param[2], engineState$2);
  var engineState$3 = match[0];
  var engineState$4 = isRun ? engineState$3 : ArcballCameraControllerLogicService$WonderEditor.unbindGameViewActiveCameraArcballCameraControllerEvent(engineState$3);
  return /* tuple */[
          engineState$4,
          match[2]
        ];
}

function generateSceneWDB(isSceneRoot, generateWDBFunc, imageUint8ArrayMap, engineState) {
  return generateWDB(/* tuple */[
              SceneEngineService$WonderEditor.getSceneGameObject(engineState),
              isSceneRoot,
              imageUint8ArrayMap
            ], generateWDBFunc, engineState);
}

export {
  generateWDB ,
  generateSceneWDB ,
  
}
/* SceneEngineService-WonderEditor Not a pure module */
