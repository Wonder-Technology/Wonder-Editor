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
        |> WonderCommonlib.SparseMapService.set(transformComponent, value),
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
        |> WonderCommonlib.SparseMapService.set(transformComponent, value),
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
        |> WonderCommonlib.SparseMapService.set(transformComponent, value),
    },
  };
};

let getLocalEulerAngleAndInit =
    (transformComponent, ({transformRecord} as editorState, engineState)) => {
  let {localEulerAngleMapX, localEulerAngleMapY, localEulerAngleMapZ} = transformRecord;

  switch (
    localEulerAngleMapX
    |> WonderCommonlib.SparseMapService.get(transformComponent),
    localEulerAngleMapY
    |> WonderCommonlib.SparseMapService.get(transformComponent),
    localEulerAngleMapZ
    |> WonderCommonlib.SparseMapService.get(transformComponent),
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
      |> setLocalEulerAngleX(transformComponent, ex)
      |> setLocalEulerAngleY(transformComponent, ey)
      |> setLocalEulerAngleZ(transformComponent, ez);

    ((ex, ey, ez), editorState);
  };
};