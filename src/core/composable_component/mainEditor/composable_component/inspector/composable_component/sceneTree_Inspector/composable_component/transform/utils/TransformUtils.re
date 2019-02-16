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

let getTransformRotationData = transformComponent => {
  let (data, editorState) =
    TransformEditorService.getLocalEulerAngleAndInit(transformComponent)
    |> StateLogicService.getStateToGetData;

  editorState |> StateEditorService.setState |> ignore;

  data |> truncateTransformValue;
};

let isTransformVec3Equal = ((x, y, z), (newX, newY, newZ)) =>
  x
  |> ValueService.isValueEqual(ValueType.Float, newX)
  && y
  |> ValueService.isValueEqual(ValueType.Float, newY)
  && z
  |> ValueService.isValueEqual(ValueType.Float, newZ);

let refreshTransformWithDispatchFunc =
    (dispatchFunc, (editorState, engineState)) => {
  let editorState =
    TransformEditorService.removeLocalEulerAngleData(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
        engineState,
      ),
      editorState,
    );

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
  |> ignore;

  (StateEditorService.getState(), StateEngineService.unsafeGetState());
};

let refreshTransform = ((editorState, engineState)) =>
  refreshTransformWithDispatchFunc(
    UIStateService.getDispatch(),
    (editorState, engineState),
  );