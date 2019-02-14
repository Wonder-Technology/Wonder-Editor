

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as MouseEventService$WonderEditor from "../../record/editor/event/MouseEventService.js";
import * as StateLogicService$WonderEditor from "./StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../state/editor/view/gameView/GameViewEditorService.js";
import * as ManageEventEngineService$WonderEditor from "../../state/engine/event/ManageEventEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../state/engine/ArcballCameraEngineService.js";
import * as HandleDomEventEngineService$WonderEditor from "../../state/engine/event/HandleDomEventEngineService.js";
import * as SceneViewEventEditorService$WonderEditor from "../../state/editor/event/SceneViewEventEditorService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../state/engine/gameObject/HierarchyGameObjectEngineService.js";

function _renderWhenStop($$event, handleFunc, engineState) {
  var match = handleFunc($$event, engineState);
  var engineState$1 = StateLogicService$WonderEditor.renderWhenStop(match[0]);
  return /* tuple */[
          engineState$1,
          match[1]
        ];
}

function _isKeyAffectedArballCameraController(param) {
  switch (param[/* key */6]) {
    case "a" : 
    case "d" : 
    case "s" : 
    case "w" : 
        return true;
    default:
      return false;
  }
}

function bindArcballCameraControllerEventForSceneView(cameraController, engineState) {
  var match = ArcballCameraEngineService$WonderEditor.prepareBindEvent(cameraController, engineState);
  var keydownHandleFunc = match[5];
  var pointScaleHandleFunc = match[4];
  var pointDragOverHandleFunc = match[3];
  var pointDragDropHandleFunc = match[2];
  var pointDragStartHandleFunc = match[1];
  var engineState$1 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0), (function ($$event, engineState) {
          var match = MouseEventService$WonderEditor.isRightMouseButton($$event);
          if (match) {
            return _renderWhenStop($$event, pointDragStartHandleFunc, engineState);
          } else {
            return /* tuple */[
                    engineState,
                    $$event
                  ];
          }
        }), match[0], undefined, /* () */0);
  var engineState$2 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0), (function ($$event, engineState) {
          var match = MouseEventService$WonderEditor.isRightMouseButton($$event);
          if (match) {
            return _renderWhenStop($$event, pointDragDropHandleFunc, engineState);
          } else {
            return /* tuple */[
                    engineState,
                    $$event
                  ];
          }
        }), engineState$1, undefined, /* () */0);
  var engineState$3 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0), (function ($$event, engineState) {
          var match = MouseEventService$WonderEditor.isRightMouseButton($$event);
          if (match) {
            return _renderWhenStop($$event, pointDragOverHandleFunc, engineState);
          } else {
            return /* tuple */[
                    engineState,
                    $$event
                  ];
          }
        }), engineState$2, undefined, /* () */0);
  var engineState$4 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), (function ($$event, engineState) {
          return _renderWhenStop($$event, pointScaleHandleFunc, engineState);
        }), engineState$3, undefined, /* () */0);
  return ManageEventEngineService$WonderEditor.onKeyboardEvent(/* KeyDown_SceneView */20, (function ($$event, engineState) {
                var match = _isKeyAffectedArballCameraController($$event);
                if (match) {
                  HandleDomEventEngineService$WonderEditor.preventDefault($$event[/* event */7]);
                  return StateLogicService$WonderEditor.renderWhenStop(keydownHandleFunc($$event, engineState));
                } else {
                  return engineState;
                }
              }), engineState$4, undefined, /* () */0);
}

function _checkSceneAllArcballCameraControllersNotBindEvent(engineState) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene\'s all arcballCameraControllers should not bind event", "bind"), (function () {
                return Contract$WonderLog.Operators[/* = */0](HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                                    return GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
                                  })).filter((function (arcballCameraController) {
                                  return ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(arcballCameraController, engineState);
                                })).length, 0);
              }));
}

function bindGameViewActiveCameraArcballCameraControllerEvent(engineState) {
  Contract$WonderLog.requireCheck((function () {
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
  _renderWhenStop ,
  _isKeyAffectedArballCameraController ,
  bindArcballCameraControllerEventForSceneView ,
  _checkSceneAllArcballCameraControllersNotBindEvent ,
  bindGameViewActiveCameraArcballCameraControllerEvent ,
  unbindGameViewActiveCameraArcballCameraControllerEvent ,
  
}
/* Log-WonderLog Not a pure module */
