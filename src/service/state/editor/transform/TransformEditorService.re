open EditorType;

open TransformType;

let setLocalEulerAngleX =
    (transformComponent, value, {transformRecord} as editorState) => {
  let {localEulerAngleMapX} = transformRecord;

  {
    ...editorState,
    transformRecord: {
      ...transformRecord,
      localEulerAngleMapX:
        localEulerAngleMapX
        |> WonderCommonlib.ImmutableSparseMapService.set(
             transformComponent,
             value,
           ),
    },
  };
};

let setLocalEulerAngleY =
    (transformComponent, value, {transformRecord} as editorState) => {
  let {localEulerAngleMapY} = transformRecord;

  {
    ...editorState,
    transformRecord: {
      ...transformRecord,
      localEulerAngleMapY:
        localEulerAngleMapY
        |> WonderCommonlib.ImmutableSparseMapService.set(
             transformComponent,
             value,
           ),
    },
  };
};

let setLocalEulerAngleZ =
    (transformComponent, value, {transformRecord} as editorState) => {
  let {localEulerAngleMapZ} = transformRecord;

  {
    ...editorState,
    transformRecord: {
      ...transformRecord,
      localEulerAngleMapZ:
        localEulerAngleMapZ
        |> WonderCommonlib.ImmutableSparseMapService.set(
             transformComponent,
             value,
           ),
    },
  };
};

let _setLocalEulerAngleFieldWhenNotExistInMap =
    (
      transformComponent,
      (valueInEngineState, valueInMap),
      setFunc,
      editorState,
    ) =>
  switch (valueInMap) {
  | None => setFunc(transformComponent, valueInEngineState, editorState)
  | _ => editorState
  };

let _getLocalEulerAngle =
    (
      (valueXInEngineState, valueYInEngineState, valueZInEngineState),
      (valueXInMap, valueYInMap, valueZInMap),
    ) => (
  switch (valueXInEngineState) {
  | None => valueXInMap
  | Some(value) => value
  },
  switch (valueYInEngineState) {
  | None => valueYInMap
  | Some(value) => value
  },
  switch (valueZInEngineState) {
  | None => valueZInMap
  | Some(value) => value
  },
);

let getLocalEulerAngleOrInit =
    (transformComponent, ({transformRecord} as editorState, engineState)) => {
  let {localEulerAngleMapX, localEulerAngleMapY, localEulerAngleMapZ} = transformRecord;

  switch (
    localEulerAngleMapX
    |> WonderCommonlib.ImmutableSparseMapService.get(transformComponent),
    localEulerAngleMapY
    |> WonderCommonlib.ImmutableSparseMapService.get(transformComponent),
    localEulerAngleMapZ
    |> WonderCommonlib.ImmutableSparseMapService.get(transformComponent),
  ) {
  | (Some(x), Some(y), Some(z)) => ((x, y, z), editorState)
  | (valueX, valueY, valueZ) =>
    let (ex, ey, ez) =
      TransformEngineService.getLocalEulerAngles(
        transformComponent,
        engineState,
      );

    let editorState =
      editorState
      |> _setLocalEulerAngleFieldWhenNotExistInMap(
           transformComponent,
           (ex, valueX),
           setLocalEulerAngleX,
         )
      |> _setLocalEulerAngleFieldWhenNotExistInMap(
           transformComponent,
           (ey, valueY),
           setLocalEulerAngleY,
         )
      |> _setLocalEulerAngleFieldWhenNotExistInMap(
           transformComponent,
           (ez, valueZ),
           setLocalEulerAngleZ,
         );

    (
      _getLocalEulerAngle((valueX, valueY, valueZ), (ex, ey, ez)),
      editorState,
    );
  };
};

let removeLocalEulerAngleData =
    (transformComponent, {transformRecord} as editorState) => {
  let {localEulerAngleMapX, localEulerAngleMapY, localEulerAngleMapZ} = transformRecord;

  {
    ...editorState,
    transformRecord: {
      ...transformRecord,
      localEulerAngleMapX:
        localEulerAngleMapX
        |> WonderCommonlib.ImmutableSparseMapService.deleteVal(
             transformComponent,
           ),
      localEulerAngleMapY:
        localEulerAngleMapY
        |> WonderCommonlib.ImmutableSparseMapService.deleteVal(
             transformComponent,
           ),
      localEulerAngleMapZ:
        localEulerAngleMapZ
        |> WonderCommonlib.ImmutableSparseMapService.deleteVal(
             transformComponent,
           ),
    },
  };
};