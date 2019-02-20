module Method = {
  let blurPositionEvent =
      ((uiState, dispatchFunc), transformComponent, (x, y, z)) => {
    let (newX, newY, newZ) =
      TransformUtils.getTransformPositionData(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    Vector3Service.isEqual((x, y, z), (newX, newY, newZ)) ?
      () :
      PositionBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        transformComponent,
        (x, y, z),
      );
  };

  let blurRotationEvent =
      ((uiState, dispatchFunc), transformComponent, (x, y, z)) => {
    let (newX, newY, newZ) =
      TransformUtils.getTransformRotationData(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    Vector3Service.isEqual((x, y, z), (newX, newY, newZ)) ?
      () :
      RotationBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        transformComponent,
        (x, y, z),
      );
  };

  let blurScaleEvent =
      ((uiState, dispatchFunc), transformComponent, (x, y, z)) => {
    let (newX, newY, newZ) =
      TransformUtils.getTransformScaleData(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    Vector3Service.isEqual((x, y, z), (newX, newY, newZ)) ?
      () :
      ScaleBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        transformComponent,
        (x, y, z),
      );
  };

  let _setCurrentSceneTreeNodeLocalPosition = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalPosition((x, y, z), transformComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let changePositionX = (transformComponent, value) => {
    let (_x, y, z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (value, y, z));
  };

  let changePositionY = (transformComponent, value) => {
    let (x, _y, z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (x, value, z));
  };

  let changePositionZ = (transformComponent, value) => {
    let (x, y, _z) =
      TransformUtils.getSceneTreeNodeLocalPosition(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalPosition(transformComponent, (x, y, value));
  };

  let _setCurrentSceneTreeNodeLocalScale = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalScale((x, y, z), transformComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let changeScaleX = (transformComponent, value) => {
    let (_x, y, z) =
      TransformEngineService.getLocalScale(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalScale(transformComponent, (value, y, z));
  };

  let changeScaleY = (transformComponent, value) => {
    let (x, _y, z) =
      TransformEngineService.getLocalScale(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalScale(transformComponent, (x, value, z));
  };

  let changeScaleZ = (transformComponent, value) => {
    let (x, y, _z) =
      TransformEngineService.getLocalScale(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalScale(transformComponent, (x, y, value));
  };

  let _setCurrentSceneTreeNodeLocalRotation = (transformComponent, (x, y, z)) =>
    TransformEngineService.setLocalEulerAngles((x, y, z), transformComponent)
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let changeRotationX = (transformComponent, value) => {
    TransformEditorService.setLocalEulerAngleX(transformComponent, value)
    |> StateLogicService.getAndSetEditorState;

    let (_x, y, z) =
      TransformEngineService.getLocalEulerAngles(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalRotation(transformComponent, (value, y, z));
  };

  let changeRotationY = (transformComponent, value) => {
    TransformEditorService.setLocalEulerAngleY(transformComponent, value)
    |> StateLogicService.getAndSetEditorState;

    let (x, _y, z) =
      TransformEngineService.getLocalEulerAngles(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalRotation(transformComponent, (x, value, z));
  };

  let changeRotationZ = (transformComponent, value) => {
    TransformEditorService.setLocalEulerAngleZ(transformComponent, value)
    |> StateLogicService.getAndSetEditorState;

    let (x, y, _z) =
      TransformEngineService.getLocalEulerAngles(transformComponent)
      |> StateLogicService.getEngineStateToGetData;

    _setCurrentSceneTreeNodeLocalRotation(transformComponent, (x, y, value));
  };

  let buildShadeComponent = gameObject =>
    StateEngineService.unsafeGetState()
    |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
         gameObject,
       ) ?
      <div className="transform-shade" /> : ReasonReact.null;
};

let component = ReasonReact.statelessComponent("MainEditorTransform");

let render =
    ((uiState, dispatchFunc), (transformComponent, gameObject), _self) =>
  <article className="wonder-inspector-transform">
    <ThreeFloatInput
      uiState
      dispatchFunc
      label="Position"
      gameObjectComponent=transformComponent
      changeXFunc=Method.changePositionX
      changeYFunc=Method.changePositionY
      changeZFunc=Method.changePositionZ
      getDataFunc=TransformUtils.getTransformPositionData
      blurEventFunc=Method.blurPositionEvent
      dragDropFunc=Method.blurPositionEvent
      canBeZero=true
    />
    <ThreeFloatInput
      uiState
      dispatchFunc
      label="Rotation"
      gameObjectComponent=transformComponent
      changeXFunc=Method.changeRotationX
      changeYFunc=Method.changeRotationY
      changeZFunc=Method.changeRotationZ
      getDataFunc=TransformUtils.getTransformRotationData
      blurEventFunc=Method.blurRotationEvent
      dragDropFunc=Method.blurRotationEvent
      canBeZero=true
    />
    <ThreeFloatInput
      uiState
      dispatchFunc
      label="Scale"
      gameObjectComponent=transformComponent
      changeXFunc=Method.changeScaleX
      changeYFunc=Method.changeScaleY
      changeZFunc=Method.changeScaleZ
      getDataFunc=TransformUtils.getTransformScaleData
      blurEventFunc=Method.blurScaleEvent
      dragDropFunc=Method.blurScaleEvent
      canBeZero=true
    />
    (Method.buildShadeComponent(gameObject))
  </article>;

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~transformComponent,
      ~gameObject,
      _children,
    ) => {
  ...component,
  render: self =>
    render((uiState, dispatchFunc), (transformComponent, gameObject), self),
};