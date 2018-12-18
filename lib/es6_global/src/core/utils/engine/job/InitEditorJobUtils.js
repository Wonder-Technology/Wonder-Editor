

import * as DefaultSceneUtils$WonderEditor from "../DefaultSceneUtils.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../service/state/engine/GameObjectComponentEngineService.js";

function initEditorJob(param, engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareSpecificGameObjects(editorState, engineState);
  var match$1 = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(match[0], match[1]);
  var match$2 = DefaultSceneUtils$WonderEditor.createDefaultScene(match$1[2], match$1[0], match$1[1]);
  var engineState$1 = match$2[1];
  var editorState$1 = GameViewEditorService$WonderEditor.setActivedBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match$2[2], engineState$1), match$2[0]);
  StateEditorService$WonderEditor.setState(editorState$1);
  return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(match[2], engineState$1), engineState$1);
}

export {
  initEditorJob ,
  
}
/* DefaultSceneUtils-WonderEditor Not a pure module */
