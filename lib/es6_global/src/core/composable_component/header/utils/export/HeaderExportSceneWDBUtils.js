

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as SceneEngineService$WonderEditor from "../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as ArcballCameraControllerLogicService$WonderEditor from "../../../../../service/stateTuple/logic/ArcballCameraControllerLogicService.js";

function generateWDB(rootGameObject, imageUint8ArrayMap, generateWDBFunc, engineState) {
  var isRun = StateEditorService$WonderEditor.getIsRun(/* () */0);
  var engineState$1 = isRun ? engineState : ArcballCameraControllerLogicService$WonderEditor.bindGameViewActiveCameraArcballCameraControllerEvent(engineState);
  var match = Curry._3(generateWDBFunc, rootGameObject, imageUint8ArrayMap, engineState$1);
  var engineState$2 = match[0];
  var engineState$3 = isRun ? engineState$2 : ArcballCameraControllerLogicService$WonderEditor.unbindGameViewActiveCameraArcballCameraControllerEvent(engineState$2);
  return /* tuple */[
          engineState$3,
          match[2]
        ];
}

function generateSceneWDB(generateWDBFunc, imageUint8ArrayMap, engineState) {
  return generateWDB(SceneEngineService$WonderEditor.getSceneGameObject(engineState), imageUint8ArrayMap, generateWDBFunc, engineState);
}

export {
  generateWDB ,
  generateSceneWDB ,
  
}
/* SceneEngineService-WonderEditor Not a pure module */
