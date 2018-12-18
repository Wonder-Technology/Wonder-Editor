

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/StateEngineService.js";
import * as DirectorEngineService$WonderEditor from "../../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/GameObjectEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";

function addGameObject(createGameObjectFunc) {
  var match = Curry._2(createGameObjectFunc, StateEditorService$WonderEditor.getState(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var gameObject = match[2];
  StateEngineService$WonderEditor.setState(DirectorEngineService$WonderEditor.loopBody(0, SceneEngineService$WonderEditor.addSceneChild(gameObject, GameObjectEngineService$WonderEditor.initGameObject(gameObject, match[1]))));
  StateEditorService$WonderEditor.setState(match[0]);
  return gameObject;
}

function doesSceneHasRemoveableCamera(param) {
  return StateLogicService$WonderEditor.getEngineStateToGetData(GameObjectComponentEngineService$WonderEditor.getAllBasicCameraViewComponents).length > 1;
}

function isSceneHaveNoActiveCamera(param) {
  return Js_option.isNone(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneActiveBasicCameraView));
}

export {
  addGameObject ,
  doesSceneHasRemoveableCamera ,
  isSceneHaveNoActiveCamera ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
