

import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as CameraEngineService$WonderEditor from "../../../../service/state/engine/CameraEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../service/state/engine/GameObjectComponentEngineService.js";

function doesSceneHasRemoveableCamera() {
  return StateLogicService$WonderEditor.getEngineStateToGetData(GameObjectComponentEngineService$WonderEditor.getAllBasicCameraViewComponents).length > 1;
}

function isGameObjectNotRemoveable(gameObject) {
  if (gameObject !== undefined) {
    var gameObject$1 = gameObject;
    var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
            return CameraEngineService$WonderEditor.hasCameraGroup(gameObject$1, param);
          }));
    if (match) {
      return !doesSceneHasRemoveableCamera(/* () */0);
    } else {
      return false;
    }
  } else {
    return true;
  }
}

export {
  doesSceneHasRemoveableCamera ,
  isGameObjectNotRemoveable ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
