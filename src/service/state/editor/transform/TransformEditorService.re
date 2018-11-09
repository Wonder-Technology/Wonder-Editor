open EditorType;

open TransformType;

let getLocalEulerAngle =
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
  | (Some(x), Some(y), Some(z)) => (x, y, z)
  | (valueX, valueY, valueZ) =>
    let (ex, ey, ez) =
      TransformEngineService.getLocalEulerAngles(
        transformComponent,
        engineState,
      );

    let x =
      switch (valueX) {
      | None => ex
      | Some(valueX) => valueX
      };

    let y =
      switch (valueY) {
      | None => ey
      | Some(valueY) => valueY
      };

    let z =
      switch (valueZ) {
      | None => ez
      | Some(valueZ) => valueZ
      };

    (x, y, z);
  };
};

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