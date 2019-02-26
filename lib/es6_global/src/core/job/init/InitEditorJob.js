

import * as DefaultSceneUtils$WonderEditor from "../../utils/engine/DefaultSceneUtils.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as InspectorEditorService$WonderEditor from "../../../service/state/editor/inspector/InspectorEditorService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";

function _addSceneGameObjectComponentTypeToMap(engineState, editorState) {
  return InspectorEditorService$WonderEditor.addComponentTypeToMap(SceneEngineService$WonderEditor.getSceneGameObject(engineState), /* Transform */0, editorState);
}

function initEditorJob(_, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareSpecificGameObjects(editorState, engineState);
  var match$1 = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(match[0], match[1]);
  var match$2 = DefaultSceneUtils$WonderEditor.createDefaultScene(match$1[2], match$1[0], match$1[1]);
  var engineState$1 = match$2[1];
  var editorState$1 = GameViewEditorService$WonderEditor.setActivedBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match$2[2], engineState$1), match$2[0]);
  var editorState$2 = InspectorEditorService$WonderEditor.addSceneGameObjectComponentTypeToMap(SceneEngineService$WonderEditor.getSceneGameObject(engineState$1), editorState$1);
  StateEditorService$WonderEditor.setState(editorState$2);
  return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match[2], engineState$1), engineState$1);
}

export {
  _addSceneGameObjectComponentTypeToMap ,
  initEditorJob ,
  
}
/* DefaultSceneUtils-WonderEditor Not a pure module */
