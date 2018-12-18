

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as EventEditorService$WonderEditor from "../../state/editor/event/EventEditorService.js";
import * as SceneEngineService$WonderEditor from "../../state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../state/editor/view/gameView/GameViewEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/GameObjectEngineService.js";
import * as ManageEventEngineService$WonderEditor from "../../state/engine/event/ManageEventEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/GameObjectComponentEngineService.js";

function bindArcballCameraControllerEventForSceneView(cameraController, engineState) {
  var match = ArcballCameraEngineService$WonderEditor.prepareBindEvent(cameraController, engineState);
  var engineState$1 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(EventEditorService$WonderEditor.getPointDownEventName(/* () */0), match[1], match[0], undefined, /* () */0);
  var engineState$2 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(EventEditorService$WonderEditor.getPointUpEventName(/* () */0), match[2], engineState$1, undefined, /* () */0);
  var engineState$3 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(EventEditorService$WonderEditor.getPointDragEventName(/* () */0), match[3], engineState$2, undefined, /* () */0);
  var engineState$4 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(EventEditorService$WonderEditor.getPointScaleEventName(/* () */0), match[4], engineState$3, undefined, /* () */0);
  return ManageEventEngineService$WonderEditor.onKeyboardEvent(/* KeyDown_editor */16, match[5], engineState$4, undefined, /* () */0);
}

function _checkSceneAllArcballCameraControllersNotBindEvent(engineState) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene\'s all arcballCameraControllers should not bind event", "bind"), (function (param) {
                return Contract$WonderLog.Operators[/* = */0](GameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                                    return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
                                  })).filter((function (arcballCameraController) {
                                  return ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(arcballCameraController, engineState);
                                })).length, 0);
              }));
}

function bindGameViewActiveCameraArcballCameraControllerEvent(engineState) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkSceneAllArcballCameraControllersNotBindEvent(engineState);
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var match = GameViewEditorService$WonderEditor.getActivedBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0));
  if (match !== undefined) {
    var __x = BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(match, engineState);
    return ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventIfHasComponentForGameView(__x, engineState);
  } else {
    return engineState;
  }
}

function unbindGameViewActiveCameraArcballCameraControllerEvent(engineState) {
  var match = GameViewEditorService$WonderEditor.getActivedBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0));
  var tmp;
  if (match !== undefined) {
    var __x = BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(match, engineState);
    tmp = ArcballCameraEngineService$WonderEditor.unbindArcballCameraControllerEventIfHasComponentForGameView(__x, engineState);
  } else {
    tmp = engineState;
  }
  return Contract$WonderLog.ensureCheck(_checkSceneAllArcballCameraControllersNotBindEvent, StateEditorService$WonderEditor.getStateIsDebug(/* () */0), tmp);
}

export {
  bindArcballCameraControllerEventForSceneView ,
  _checkSceneAllArcballCameraControllersNotBindEvent ,
  bindGameViewActiveCameraArcballCameraControllerEvent ,
  unbindGameViewActiveCameraArcballCameraControllerEvent ,
  
}
/* Log-WonderLog Not a pure module */
