

import * as DefaultSceneUtils$WonderEditor from "../../utils/engine/DefaultSceneUtils.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as InspectorEditorService$WonderEditor from "../../../service/state/editor/inspector/InspectorEditorService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as ScriptEventFunctionEngineService$WonderEditor from "../../../service/state/engine/script/ScriptEventFunctionEngineService.js";

function _addSceneGameObjectComponentTypeToMap(engineState, editorState) {
  return InspectorEditorService$WonderEditor.addComponentTypeToMap(SceneEngineService$WonderEditor.getSceneGameObject(engineState), /* Transform */0, editorState);
}

function initEditorJob(param, engineState) {
  var engineState$1 = ScriptEventFunctionEngineService$WonderEditor.disableScriptEventFunction(engineState);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareSpecificGameObjects(editorState, engineState$1);
  var match$1 = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(match[0], match[1]);
  var match$2 = DefaultSceneUtils$WonderEditor.createDefaultScene(match$1[2], match$1[0], match$1[1]);
  var engineState$2 = match$2[1];
  var editorState$1 = GameViewEditorService$WonderEditor.setActivedBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match$2[2], engineState$2), match$2[0]);
  StateEditorService$WonderEditor.setState(InspectorEditorService$WonderEditor.addSceneGameObjectComponentTypeToMap(SceneEngineService$WonderEditor.getSceneGameObject(engineState$2), editorState$1));
  return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match[2], engineState$2), engineState$2);
}

export {
  _addSceneGameObjectComponentTypeToMap ,
  initEditorJob ,
  
}
/* DefaultSceneUtils-WonderEditor Not a pure module */
