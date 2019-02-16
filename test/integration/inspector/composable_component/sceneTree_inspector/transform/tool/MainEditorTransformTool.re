let changePositionX = (transform, value) =>
  MainEditorTransform.Method.changePositionX(transform, value);

let changePositionXAndBlur =
    (
      ~value,
      ~transform=GameObjectTool.getCurrentSceneTreeNodeTransform(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  let oldPosition =
    TransformUtils.getTransformPositionData(transform)
    |> StateLogicService.getEngineStateToGetData;

  changePositionX(transform, value);

  MainEditorTransform.Method.blurPositionEvent(
    (uiState, dispatchFunc),
    transform,
    oldPosition,
  );
};

let changePositionY = (transform, value) =>
  MainEditorTransform.Method.changePositionY(transform, value);

let changePositionYAndBlur =
    (
      ~value,
      ~transform=GameObjectTool.getCurrentSceneTreeNodeTransform(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  let oldPosition =
    TransformUtils.getTransformPositionData(transform)
    |> StateLogicService.getEngineStateToGetData;

  changePositionY(transform, value);

  MainEditorTransform.Method.blurPositionEvent(
    (uiState, dispatchFunc),
    transform,
    oldPosition,
  );
};

let changePositionZ = (transform, value) =>
  MainEditorTransform.Method.changePositionZ(transform, value);

let changeRotationX = (transform, value) =>
  MainEditorTransform.Method.changeRotationX(transform, value);

let changeRotationY = (transform, value) =>
  MainEditorTransform.Method.changeRotationY(transform, value);

let changeRotationZ = (transform, value) =>
  MainEditorTransform.Method.changeRotationZ(transform, value);

let changeRotationYAndBlur =
    (
      ~value,
      ~transform=GameObjectTool.getCurrentSceneTreeNodeTransform(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  let oldRotation =
    TransformUtils.getTransformRotationData(transform)
    |> StateLogicService.getEngineStateToGetData;

  changeRotationY(transform, value);

  MainEditorTransform.Method.blurRotationEvent(
    (uiState, dispatchFunc),
    transform,
    oldRotation,
  );
};

let changeScaleX = (transform, value) =>
  MainEditorTransform.Method.changeScaleX(transform, value);

let changeScaleY = (transform, value) =>
  MainEditorTransform.Method.changeScaleY(transform, value);

let changeScaleZ = (transform, value) =>
  MainEditorTransform.Method.changeScaleZ(transform, value);

let setLocalEulerAngleData = () =>
  StateEditorService.getState()
  |> TransformEditorService.setLocalEulerAngleX(
       GameObjectTool.getCurrentSceneTreeNodeTransform(),
       10.,
     )
  |> TransformEditorService.setLocalEulerAngleY(
       GameObjectTool.getCurrentSceneTreeNodeTransform(),
       10.,
     )
  |> TransformEditorService.setLocalEulerAngleZ(
       GameObjectTool.getCurrentSceneTreeNodeTransform(),
       10.,
     )
  |> StateEditorService.setState
  |> ignore;

let judgeShouldRemoveLocalEulerAngleData = () => {
  let localEulerAngle =
    TransformUtils.getTransformRotationData(
      GameObjectTool.getCurrentSceneTreeNodeTransform(),
    )
    |> StateLogicService.getEngineStateToGetData;

  JudgeTool.isEqual(
    localEulerAngle |> Vector3Service.truncate(3),
    (0., 0., 0.),
  );
};