

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
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
import * as InspectorEventEditorService$WonderEditor from "../../state/editor/event/InspectorEventEditorService.js";
import * as SceneViewEventEditorService$WonderEditor from "../../state/editor/event/SceneViewEventEditorService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../state/engine/gameObject/HierarchyGameObjectEngineService.js";

function _renderWhenStop($$event, param, engineState) {
  var match = param[0]($$event, engineState);
  var engineState$1 = Curry._1(param[1], match[0]);
  return /* tuple */[
          engineState$1,
          match[1]
        ];
}

function _handleEventFuncForSceneView($$event, handleFunc, engineState) {
  var match = MouseEventService$WonderEditor.isRightMouseButton($$event);
  if (match) {
    return _renderWhenStop($$event, /* tuple */[
                handleFunc,
                StateLogicService$WonderEditor.renderWhenStop
              ], engineState);
  } else {
    return /* tuple */[
            engineState,
            $$event
          ];
  }
}

function _handleEventFuncForInspector($$event, handleFunc, inspectorEngineState) {
  return _renderWhenStop($$event, /* tuple */[
              handleFunc,
              StateLogicService$WonderEditor.renderInspectorEngineStateWhenStop
            ], inspectorEngineState);
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

function _handleKeyDownForSceneView($$event, keydownHandleFunc, engineState) {
  var match = _isKeyAffectedArballCameraController($$event) && ArcballCameraEngineService$WonderEditor.isTriggerKeydownEventHandler($$event);
  if (match) {
    HandleDomEventEngineService$WonderEditor.preventDefault($$event[/* event */7]);
    return StateLogicService$WonderEditor.renderWhenStop(keydownHandleFunc($$event, engineState));
  } else {
    return engineState;
  }
}

function _bindArcballCameraControllerEvent(cameraController, param, handleEventFunc, engineState) {
  var match = ArcballCameraEngineService$WonderEditor.prepareBindEvent(cameraController, engineState);
  var pointDragOverHandleFunc = match[3];
  var pointDragDropHandleFunc = match[2];
  var pointDragStartHandleFunc = match[1];
  var engineState$1 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(param[0], (function ($$event, engineState) {
          return Curry._3(handleEventFunc, $$event, pointDragStartHandleFunc, engineState);
        }), match[0], undefined, /* () */0);
  var engineState$2 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(param[1], (function ($$event, engineState) {
          return Curry._3(handleEventFunc, $$event, pointDragOverHandleFunc, engineState);
        }), engineState$1, undefined, /* () */0);
  var engineState$3 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(param[2], (function ($$event, engineState) {
          return Curry._3(handleEventFunc, $$event, pointDragDropHandleFunc, engineState);
        }), engineState$2, undefined, /* () */0);
  return /* tuple */[
          engineState$3,
          /* tuple */[
            match[4],
            match[5]
          ]
        ];
}

function bindArcballCameraControllerEventForSceneView(cameraController, mainEngineState) {
  var match = _bindArcballCameraControllerEvent(cameraController, /* tuple */[
        SceneViewEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0),
        SceneViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0),
        SceneViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0)
      ], _handleEventFuncForSceneView, mainEngineState);
  var match$1 = match[1];
  var keydownHandleFunc = match$1[1];
  var pointScaleHandleFunc = match$1[0];
  var mainEngineState$1 = ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointScaleEventName(/* () */0), (function ($$event, mainEngineState) {
          return _renderWhenStop($$event, /* tuple */[
                      pointScaleHandleFunc,
                      StateLogicService$WonderEditor.renderWhenStop
                    ], mainEngineState);
        }), match[0], undefined, /* () */0);
  return ManageEventEngineService$WonderEditor.onKeyboardEvent(/* KeyDown_SceneView */20, (function ($$event, mainEngineState) {
                return _handleKeyDownForSceneView($$event, keydownHandleFunc, mainEngineState);
              }), mainEngineState$1, undefined, /* () */0);
}

function bindArcballCameraControllerEventForInspector(cameraController, inspectorEngineState) {
  return _bindArcballCameraControllerEvent(cameraController, /* tuple */[
                InspectorEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0),
                InspectorEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0),
                InspectorEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0)
              ], _handleEventFuncForInspector, inspectorEngineState)[0];
}

function _checkSceneAllArcballCameraControllersNotBindEvent(engineState) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("scene\'s all arcballCameraControllers should not bind event", "bind"), (function (param) {
                return Contract$WonderLog.Operators[/* = */0](HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
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
  _renderWhenStop ,
  _handleEventFuncForSceneView ,
  _handleEventFuncForInspector ,
  _isKeyAffectedArballCameraController ,
  _handleKeyDownForSceneView ,
  _bindArcballCameraControllerEvent ,
  bindArcballCameraControllerEventForSceneView ,
  bindArcballCameraControllerEventForInspector ,
  _checkSceneAllArcballCameraControllersNotBindEvent ,
  bindGameViewActiveCameraArcballCameraControllerEvent ,
  unbindGameViewActiveCameraArcballCameraControllerEvent ,
  
}
/* Log-WonderLog Not a pure module */
