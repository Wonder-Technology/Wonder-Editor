

import * as GameObjectUtils$WonderEditor from "../../../utils/engine/GameObjectUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as CameraEngineService$WonderEditor from "../../../../service/state/engine/CameraEngineService.js";

function doesSceneHasRemoveableCamera() {
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (engineState) {
          return GameObjectUtils$WonderEditor.getChildren(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                        return CameraEngineService$WonderEditor.hasCameraComponent(gameObject, engineState);
                      })).length;
        }));
  return match !== 1;
}

function isGameObjectNotRemoveable(gameObject) {
  if (gameObject !== undefined) {
    var gameObject$1 = gameObject;
    var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
            return CameraEngineService$WonderEditor.hasCameraComponent(gameObject$1, param);
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
/* GameObjectUtils-WonderEditor Not a pure module */
