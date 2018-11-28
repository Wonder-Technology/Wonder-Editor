

import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../state/editor/view/gameView/GameViewEditorService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../state/engine/ArcballCameraEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

function unbindArcballCameraControllerEventIfHasComponentForGameView(gameObject, editorState, engineState) {
  var targetRemoveBasicCameraView = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(gameObject, engineState);
  var match = GameViewEditorService$WonderEditor.isActiveBasicCameraView(targetRemoveBasicCameraView, editorState);
  if (match) {
    var match$1 = StateEditorService$WonderEditor.getIsRun(/* () */0);
    var engineState$1 = match$1 ? ArcballCameraEngineService$WonderEditor.unbindArcballCameraControllerEventIfHasComponentForGameView(gameObject, engineState) : engineState;
    var editorState$1 = GameViewEditorService$WonderEditor.removeActivedBasicCameraView(editorState);
    return /* tuple */[
            editorState$1,
            engineState$1
          ];
  } else {
    return /* tuple */[
            editorState,
            engineState
          ];
  }
}

export {
  unbindArcballCameraControllerEventIfHasComponentForGameView ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
