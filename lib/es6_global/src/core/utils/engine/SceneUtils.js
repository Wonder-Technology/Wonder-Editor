

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as DirectorEngineService$WonderEditor from "../../../service/state/engine/DirectorEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/GameObjectEngineService.js";

function addGameObject(createGameObjectForEditFunc, createGameObjectForRunFunc) {
  var match = Curry._2(createGameObjectForRunFunc, StateEditorService$WonderEditor.getState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0));
  var runGameObject = match[2];
  StateLogicService$WonderEditor.setRunEngineState(DirectorEngineService$WonderEditor.loopBody(0, SceneEngineService$WonderEditor.addSceneChild(runGameObject, GameObjectEngineService$WonderEditor.initGameObject(runGameObject, match[1]))));
  StateEditorService$WonderEditor.setState(match[0]);
  var match$1 = Curry._1(createGameObjectForEditFunc, StateLogicService$WonderEditor.getEditEngineState(/* () */0));
  var editGameObject = match$1[1];
  StateLogicService$WonderEditor.setEditEngineState(DirectorEngineService$WonderEditor.loopBody(0, SceneEngineService$WonderEditor.addSceneChild(editGameObject, GameObjectEngineService$WonderEditor.initGameObject(editGameObject, match$1[0]))));
  return runGameObject;
}

export {
  addGameObject ,
  
}
/* StateLogicService-WonderEditor Not a pure module */
