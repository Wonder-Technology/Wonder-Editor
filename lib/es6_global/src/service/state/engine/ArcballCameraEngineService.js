

import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as GameObjectComponentEngineService$WonderEditor from "./gameObject/GameObjectComponentEngineService.js";
import * as EventArcballCameraControllerMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/camera_controller/arcball/EventArcballCameraControllerMainService.js";

function setArcballCameraControllerDistance(value, component, state) {
  return ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(component, value, state);
}

function setArcballCameraControllerMinDistance(value, component, state) {
  return ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMinDistance(component, value, state);
}

function unbindArcballCameraControllerEventIfHasComponentForGameView(gameObject, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
  if (match) {
    return ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(gameObject, engineState), engineState);
  } else {
    return engineState;
  }
}

function bindArcballCameraControllerEventIfHasComponentForGameView(gameObject, engineState) {
  var match = GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
  if (match) {
    return ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(gameObject, engineState), engineState);
  } else {
    return engineState;
  }
}

var create = ArcballCameraControllerAPI$Wonderjs.createArcballCameraController;

var unsafeGetArcballCameraControllerGameObject = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerGameObject;

var unsafeGetArcballCameraControllerDistance = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance;

var unsafeGetArcballCameraControllerMinDistance = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMinDistance;

var unsafeGetArcballCameraControllerWheelSpeed = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerWheelSpeed;

var setArcballCameraControllerWheelSpeed = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerWheelSpeed;

var unsafeGetArcballCameraControllerPhi = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerPhi;

var setArcballCameraControllerPhi = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi;

var unsafeGetArcballCameraControllerTheta = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTheta;

var setArcballCameraControllerTheta = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta;

var unsafeGetArcballCameraControllerThetaMargin = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerThetaMargin;

var setArcballCameraControllerThetaMargin = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerThetaMargin;

var unsafeGetArcballCameraControllerTarget = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerTarget;

var setArcballCameraControllerTarget = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTarget;

var unsafeGetArcballCameraControllerMoveSpeedX = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMoveSpeedX;

var setArcballCameraControllerMoveSpeedX = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedX;

var unsafeGetArcballCameraControllerMoveSpeedY = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMoveSpeedY;

var setArcballCameraControllerMoveSpeedY = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerMoveSpeedY;

var unsafeGetArcballCameraControllerRotateSpeed = ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerRotateSpeed;

var setArcballCameraControllerRotateSpeed = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerRotateSpeed;

var bindArcballCameraControllerEventForGameView = ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent;

var prepareBindEvent = EventArcballCameraControllerMainService$Wonderjs.prepareBindEvent;

var unbindArcballCameraControllerEventForGameView = ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent;

var isBindArcballCameraControllerEventForGameView = ArcballCameraControllerAPI$Wonderjs.isBindArcballCameraControllerEvent;

export {
  create ,
  unsafeGetArcballCameraControllerGameObject ,
  unsafeGetArcballCameraControllerDistance ,
  setArcballCameraControllerDistance ,
  unsafeGetArcballCameraControllerMinDistance ,
  setArcballCameraControllerMinDistance ,
  unsafeGetArcballCameraControllerWheelSpeed ,
  setArcballCameraControllerWheelSpeed ,
  unsafeGetArcballCameraControllerPhi ,
  setArcballCameraControllerPhi ,
  unsafeGetArcballCameraControllerTheta ,
  setArcballCameraControllerTheta ,
  unsafeGetArcballCameraControllerThetaMargin ,
  setArcballCameraControllerThetaMargin ,
  unsafeGetArcballCameraControllerTarget ,
  setArcballCameraControllerTarget ,
  unsafeGetArcballCameraControllerMoveSpeedX ,
  setArcballCameraControllerMoveSpeedX ,
  unsafeGetArcballCameraControllerMoveSpeedY ,
  setArcballCameraControllerMoveSpeedY ,
  unsafeGetArcballCameraControllerRotateSpeed ,
  setArcballCameraControllerRotateSpeed ,
  bindArcballCameraControllerEventForGameView ,
  prepareBindEvent ,
  unbindArcballCameraControllerEventForGameView ,
  isBindArcballCameraControllerEventForGameView ,
  unbindArcballCameraControllerEventIfHasComponentForGameView ,
  bindArcballCameraControllerEventIfHasComponentForGameView ,
  
}
/* ArcballCameraControllerAPI-Wonderjs Not a pure module */
