let truncateTransformValue = ((x, y, z)) => {
  let truncateLen = 5;
  (
    FloatService.truncateFloatValue(x, truncateLen),
    FloatService.truncateFloatValue(y, truncateLen),
    FloatService.truncateFloatValue(z, truncateLen),
  );
};

let getSceneTreeNodeLocalPosition = transformComponent =>
  TransformEngineService.getLocalPosition(transformComponent)
  |> StateLogicService.getEngineStateToGetData;

let getTransformPositionData = transformComponent =>
  getSceneTreeNodeLocalPosition(transformComponent) |> truncateTransformValue;

let getTransformScaleData = transformComponent =>
  TransformEngineService.getLocalScale(transformComponent)
  |> StateLogicService.getEngineStateToGetData
  |> truncateTransformValue;

let getTransformRotationData = transformComponent =>
  TransformEngineService.getLocalEulerAngles(transformComponent)
  |> StateLogicService.getEngineStateToGetData
  |> truncateTransformValue;

let isTransformVec3Equal = ((x, y, z), (newX, newY, newZ)) =>
  x
  |> ValueService.isValueEqual(ValueType.Float, newX)
  && y
  |> ValueService.isValueEqual(ValueType.Float, newY)
  && z
  |> ValueService.isValueEqual(ValueType.Float, newZ);