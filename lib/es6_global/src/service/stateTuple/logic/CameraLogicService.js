

import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as CameraEngineService$WonderEditor from "../../state/engine/camera/CameraEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../state/editor/view/gameView/GameViewEditorService.js";
import * as GameObjectLogicService$WonderEditor from "./GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/gameObject/GameObjectEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../state/engine/ArcballCameraEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/gameObject/GameObjectComponentEngineService.js";

function createCamera(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var gameObject = match$1[1];
  var match$2 = CameraEngineService$WonderEditor.createCameraGroup(match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("Camera", gameObject, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addCameraGroup(gameObject, match$2[1], /* tuple */[
        match[0],
        engineState$1
      ]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          gameObject
        ];
}

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
  createCamera ,
  unbindArcballCameraControllerEventIfHasComponentForGameView ,
  
}
/* StateEditorService-WonderEditor Not a pure module */
