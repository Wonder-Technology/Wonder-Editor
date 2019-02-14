

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function initGameObjectAndAddChild(parent, child, engineState) {
  return DirectorEngineService$WonderEditor.loopBody(0, HierarchyGameObjectEngineService$WonderEditor.addChild(parent, child, GameObjectEngineService$WonderEditor.initGameObject(child, engineState)));
}

function doesSceneHasRemoveableCamera() {
  return StateLogicService$WonderEditor.getEngineStateToGetData(GameObjectComponentEngineService$WonderEditor.getAllBasicCameraViewComponents).length > 1;
}

function isSceneHaveNoActiveCamera() {
  return Js_option.isNone(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneActiveBasicCameraView));
}

export {
  initGameObjectAndAddChild ,
  doesSceneHasRemoveableCamera ,
  isSceneHaveNoActiveCamera ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
