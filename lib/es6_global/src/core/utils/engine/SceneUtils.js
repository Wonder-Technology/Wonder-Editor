

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function doesSceneHasRemoveableCamera(param) {
  return StateLogicService$WonderEditor.getEngineStateToGetData(GameObjectComponentEngineService$WonderEditor.getAllBasicCameraViewComponents).length > 1;
}

function isSceneHaveNoActiveCamera(param) {
  return Js_option.isNone(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneActiveBasicCameraView));
}

export {
  doesSceneHasRemoveableCamera ,
  isSceneHaveNoActiveCamera ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
