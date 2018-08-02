open Wonderjs;

open TransformType;

let getPosition = TransformAPI.getTransformPosition;

let setPosition = TransformAPI.setTransformPosition;

let getLocalPosition = TransformAPI.getTransformLocalPosition;

let setLocalPosition = (localPosition, transform, engineState) =>
  TransformAPI.setTransformLocalPosition(
    transform,
    localPosition,
    engineState,
  );

let getParent = (child: transform, state) =>
  TransformAPI.unsafeGetTransformParent(child, state);

let setParent = (parent: transform, child: transform, state) =>
  TransformAPI.setTransformParent(Js.Nullable.return(parent), child, state);

let setParentKeepOrder = (parent: transform, child: transform, state) =>
  TransformAPI.setTransformParentKeepOrder(
    Js.Nullable.return(parent),
    child,
    state,
  );

let getChildren = (transform: transform, state) =>
  TransformAPI.unsafeGetTransformChildren(transform, state);

let getGameObjectByTransform = TransformAPI.unsafeGetTransformGameObject;

let getLocalRotation = TransformAPI.getTransformLocalRotation;

let setLocalRotation = TransformAPI.setTransformLocalRotation;

let getRotation = TransformAPI.getTransformRotation;

let setRotation = TransformAPI.setTransformRotation;

let getLocalEulerAngles = TransformAPI.getTransformLocalEulerAngles;

let setLocalEulerAngles = (value, component, engineState) =>
  TransformAPI.setTransformLocalEulerAngles(component, value, engineState);

let getEulerAngles = TransformAPI.getTransformEulerAngles;

let setEulerAngles = TransformAPI.setTransformEulerAngles;

let getLocalScale = TransformAPI.getTransformLocalScale;

let setLocalScale = (value, component, engineState) =>
  TransformAPI.setTransformLocalScale(component, value, engineState);

let getScale = TransformAPI.getTransformScale;

let setScale = TransformAPI.setTransformScale;