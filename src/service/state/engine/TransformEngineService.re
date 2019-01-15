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
  Wonderjs.TransformAPI.unsafeGetTransformParent(child, state)
  |> Js.Undefined.toOption;

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

/* TODO move to engine */
let _changeChildOrder =
    (
      sourceTransfrom,
      targetTransform,
      children,
      action: TransformType.changeChildOrder,
    )
    : array(Wonderjs.TransformType.transform) =>
  children
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. newChildren, child) =>
         switch (child) {
         | child when child === targetTransform =>
           switch (action) {
           | Before =>
             newChildren
             |> ArrayService.push(sourceTransfrom)
             |> ArrayService.push(targetTransform)
           | After =>
             newChildren
             |> ArrayService.push(targetTransform)
             |> ArrayService.push(sourceTransfrom)
           }
         | child when child === sourceTransfrom => newChildren
         | child => newChildren |> ArrayService.push(child)
         },
       [||],
     );

let changeChildOrder =
    (
      sourceTransfrom,
      targetTransform,
      targetParentTransform,
      action: TransformType.changeChildOrder,
      state,
    )
    : Wonderjs.StateDataMainType.state => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|parent should be the parent of source and target|j},
                ~actual={j|not|j},
              ),
              () =>
              switch (
                getParent(sourceTransfrom, state),
                getParent(targetTransform, state),
              ) {
              | (Some(sourceParent), Some(targetParent)) =>
                sourceParent == targetParent;
                targetParentTransform == targetParent;
              | _ => assertFail()
              }
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  {
    ...state,
    transformRecord:
      Some(
        _changeChildOrder(
          sourceTransfrom,
          targetTransform,
          getChildren(targetParentTransform, state),
          action,
        )
        /* TODO move to engine */
        |> Wonderjs.HierachyTransformService._setChildren(
             Wonderjs.RecordTransformMainService.getRecord(state),
             targetParentTransform,
           ),
      ),
  };
};

let getGameObjectByTransform = Wonderjs.TransformAPI.unsafeGetTransformGameObject;

let getLocalRotation = Wonderjs.TransformAPI.getTransformLocalRotation;

let setLocalRotation = Wonderjs.TransformAPI.setTransformLocalRotation;

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

let getLocalToWorldMatrixTypeArray = (transform, engineState) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap}: Wonderjs.TransformType.transformRecord =
    Wonderjs.RecordTransformMainService.getRecord(engineState);
  Wonderjs.ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(.
    transform,
    localToWorldMatrices,
    localToWorldMatrixCacheMap,
  );
};

let lookAt = Wonderjs.TransformAPI.lookAt;