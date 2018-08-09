open Wonderjs;

let create = ArcballCameraControllerAPI.createArcballCameraController;

let unsafeGetArcballCameraControllerGameObject = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerGameObject;

let unsafeGetArcballCameraControllerDistance = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerDistance;

let setArcballCameraControllerDistance = (value, component, state) =>
  ArcballCameraControllerAPI.setArcballCameraControllerDistance(
    component,
    value,
    state,
  );

let unsafeGetArcballCameraControllerMinDistance = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerMinDistance;

let setArcballCameraControllerMinDistance = (value, component, state) =>
  ArcballCameraControllerAPI.setArcballCameraControllerMinDistance(
    component,
    value,
    state,
  );

let unsafeGetArcballCameraControllerWheelSpeed = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerWheelSpeed;

let setArcballCameraControllerWheelSpeed = ArcballCameraControllerAPI.setArcballCameraControllerWheelSpeed;

let unsafeGetArcballCameraControllerPhi = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerPhi;

let setArcballCameraControllerPhi = ArcballCameraControllerAPI.setArcballCameraControllerPhi;
let unsafeGetArcballCameraControllerTheta = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerTheta;

let setArcballCameraControllerTheta = ArcballCameraControllerAPI.setArcballCameraControllerTheta;

let unsafeGetArcballCameraControllerThetaMargin = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerThetaMargin;

let setArcballCameraControllerThetaMargin = ArcballCameraControllerAPI.setArcballCameraControllerThetaMargin;

let unsafeGetArcballCameraControllerTarget = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerTarget;

let setArcballCameraControllerTarget = ArcballCameraControllerAPI.setArcballCameraControllerTarget;

let unsafeGetArcballCameraControllerMoveSpeedX = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerMoveSpeedX;

let setArcballCameraControllerMoveSpeedX = ArcballCameraControllerAPI.setArcballCameraControllerMoveSpeedX;

let unsafeGetArcballCameraControllerMoveSpeedY = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerMoveSpeedY;

let setArcballCameraControllerMoveSpeedY = ArcballCameraControllerAPI.setArcballCameraControllerMoveSpeedY;

let unsafeGetArcballCameraControllerRotateSpeed = ArcballCameraControllerAPI.unsafeGetArcballCameraControllerRotateSpeed;

let setArcballCameraControllerRotateSpeed = ArcballCameraControllerAPI.setArcballCameraControllerRotateSpeed;

let bindArcballCameraControllerEvent = ArcballCameraControllerAPI.bindArcballCameraControllerEvent;

let unbindArcballCameraControllerEvent = ArcballCameraControllerAPI.unbindArcballCameraControllerEvent;

let isBindArcballCameraControllerEvent = ArcballCameraControllerAPI.isBindArcballCameraControllerEvent;

let unbindArcballCameraControllerEventIfHasComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
       gameObject,
     ) ?
    engineState
    |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
         gameObject,
       )
    |. unbindArcballCameraControllerEvent(engineState) :
    engineState;

let bindArcballCameraControllerEventIfHasComponent = (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
       gameObject,
     ) ?
    engineState
    |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
         gameObject,
       )
    |. bindArcballCameraControllerEvent(engineState) :
    engineState;

