/* open Wonderjs; */

/* open TransformType; */

let getPosition = Wonderjs.TransformAPI.getTransformPosition;

let setPosition = Wonderjs.TransformAPI.setTransformPosition;

let getLocalPosition = Wonderjs.TransformAPI.getTransformLocalPosition;

let setLocalPosition = (localPosition, transform, engineState) =>
  Wonderjs.TransformAPI.setTransformLocalPosition(
    transform,
    localPosition,
    engineState,
  );

let setTransformLocalEulerAngles = (localEulerAngles, transform, engineState) =>
  Wonderjs.TransformAPI.setTransformLocalEulerAngles(
    transform,
    localEulerAngles,
    engineState,
  );

let getParent = (child: Wonderjs.TransformType.transform, state) =>
  Wonderjs.HierachyTransformService.getParent(
    child,
    Wonderjs.RecordTransformMainService.getRecord(state),
  );

let setParent =
    (
      parent: Wonderjs.TransformType.transform,
      child: Wonderjs.TransformType.transform,
      state,
    ) =>
  Wonderjs.TransformAPI.setTransformParent(
    Js.Nullable.return(parent),
    child,
    state,
  );

let setParentKeepOrder =
    (
      parent: Wonderjs.TransformType.transform,
      child: Wonderjs.TransformType.transform,
      state,
    ) =>
  Wonderjs.TransformAPI.setTransformParentKeepOrder(
    Js.Nullable.return(parent),
    child,
    state,
  );

let getChildren = (transform: Wonderjs.TransformType.transform, state) =>
  Wonderjs.TransformAPI.unsafeGetTransformChildren(transform, state);

let changeChildOrder = Wonderjs.TransformAPI.changeChildOrder;

let getGameObjectByTransform = Wonderjs.TransformAPI.unsafeGetTransformGameObject;

let getLocalRotation = Wonderjs.TransformAPI.getTransformLocalRotation;

let setLocalRotation = (value, component, engineState) =>
  Wonderjs.TransformAPI.setTransformLocalRotation(
    component,
    value,
    engineState,
  );

let getRotation = Wonderjs.TransformAPI.getTransformRotation;

let setRotation = Wonderjs.TransformAPI.setTransformRotation;

let getLocalEulerAngles = Wonderjs.TransformAPI.getTransformLocalEulerAngles;

let setLocalEulerAngles = (value, component, engineState) =>
  Wonderjs.TransformAPI.setTransformLocalEulerAngles(
    component,
    value,
    engineState,
  );

let getEulerAngles = Wonderjs.TransformAPI.getTransformEulerAngles;

let setEulerAngles = Wonderjs.TransformAPI.setTransformEulerAngles;

let getLocalScale = Wonderjs.TransformAPI.getTransformLocalScale;

let setLocalScale = (value, component, engineState) =>
  Wonderjs.TransformAPI.setTransformLocalScale(component, value, engineState);

let getScale = Wonderjs.TransformAPI.getTransformScale;

let setScale = Wonderjs.TransformAPI.setTransformScale;

let getLocalToWorldMatrixTypeArray = (transform, engineState) =>
  Wonderjs.TransformAPI.getTransformLocalToWorldMatrixTypeArray(
    transform,
    engineState,
  );

let lookAt = Wonderjs.TransformAPI.lookAt;

let rotateLocalOnAxis = Wonderjs.TransformAPI.rotateLocalOnAxis;

let rotateWorldOnAxis = Wonderjs.TransformAPI.rotateWorldOnAxis;