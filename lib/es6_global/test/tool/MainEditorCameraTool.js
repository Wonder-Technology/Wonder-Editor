

import * as GameObjectAPI$Wonderjs from "../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as SceneViewEditorService$WonderEditor from "../../src/service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../src/service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";

function getCurrentCameraGameObject(engineState) {
  var match = BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState);
  if (match !== undefined) {
    return BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(match, engineState);
  }
  
}

function getCurrentCameraProjection(engineState) {
  return GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(OptionService$Wonderjs.unsafeGet(getCurrentCameraGameObject(engineState)), engineState);
}

function getEditCameraArcballCameraController(editorState, engineState) {
  var __x = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(__x, engineState);
}

function getEditCameraBasicCameraView(editorState, engineState) {
  var __x = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(__x, engineState);
}

export {
  getCurrentCameraGameObject ,
  getCurrentCameraProjection ,
  getEditCameraArcballCameraController ,
  getEditCameraBasicCameraView ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
