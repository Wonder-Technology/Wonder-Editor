

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as IMGUITool$WonderEditor from "../../../unit/tool/IMGUITool.js";
import * as MainUtils$WonderEditor from "../../../../src/core/utils/engine/MainUtils.js";
import * as MainEditor$WonderEditor from "../../../../src/core/composable_component/mainEditor/ui/MainEditor.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../src/service/state/engine/GameObjectComponentEngineService.js";

function setViewRect($staropt$star, $staropt$star$1, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 10;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 20;
  return MainEditor$WonderEditor.Method[/* _updateViewRect */2](width, height);
}

function prepare(prepareStateFunc) {
  Curry._1(prepareStateFunc, /* () */0);
  StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
  IMGUITool$WonderEditor.prepareImgui(/* () */0);
  return setViewRect(undefined, undefined, /* () */0);
}

function getSceneActivedBasicCameraView(engineState) {
  var __x = MainEditorSceneTool$WonderEditor.getCameraInDefaultScene(engineState);
  return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(__x, engineState);
}

export {
  setViewRect ,
  prepare ,
  getSceneActivedBasicCameraView ,
  
}
/* IMGUITool-WonderEditor Not a pure module */
