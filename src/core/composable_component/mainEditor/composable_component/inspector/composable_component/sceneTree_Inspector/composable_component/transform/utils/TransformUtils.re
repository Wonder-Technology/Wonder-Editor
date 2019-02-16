let truncateTransformValue = ((x, y, z)) => {
  let truncateLen = 5;
  (
    FloatService.truncateFloatValue(x, truncateLen),
    FloatService.truncateFloatValue(y, truncateLen),
    FloatService.truncateFloatValue(z, truncateLen),
  );
};

let getSceneTreeNodeLocalPosition = (transformComponent, engineState) =>
  TransformEngineService.getLocalPosition(transformComponent, engineState);

let getTransformPositionData = (transformComponent, engineState) =>
  getSceneTreeNodeLocalPosition(transformComponent, engineState)
  |> truncateTransformValue;

let getTransformScaleData = (transformComponent, engineState) =>
  TransformEngineService.getLocalScale(transformComponent, engineState)
  |> truncateTransformValue;

let getTransformRotationData = (transformComponent, engineState) => {
  let (data, editorState) =
    TransformEditorService.getLocalEulerAngleAndInit(
      transformComponent,
      (StateEditorService.getState(), engineState),
    );

  editorState |> StateEditorService.setState |> ignore;

  data |> truncateTransformValue;
};

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