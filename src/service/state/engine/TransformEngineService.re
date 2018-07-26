open Wonderjs;

open TransformType;

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

let getTransformLocalRotation = TransformAPI.getTransformLocalRotation;

let setTransformLocalRotation = TransformAPI.setTransformLocalRotation;

let getTransformRotation = TransformAPI.getTransformRotation;

let setTransformRotation = TransformAPI.setTransformRotation;

let getTransformLocalScale = TransformAPI.getTransformLocalScale;

let setTransformLocalScale = TransformAPI.setTransformLocalScale;

let getTransformScale = TransformAPI.getTransformScale;

let setTransformScale = TransformAPI.setTransformScale;