open MainEditorCameraProjectionType;

module Method = {
  let blurNearEvent =
      ((uiState, dispatchFunc), perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.getPerspectiveCameraNear(
      perspectiveCameraComponent,
    )
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, value) ?
      () :
      PerspectiveCameraNearBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        perspectiveCameraComponent,
        value,
      );

  let changeNear = (perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraNear(
      value,
      perspectiveCameraComponent,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurFarEvent =
      ((uiState, dispatchFunc), perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.getPerspectiveCameraFar(
      perspectiveCameraComponent,
    )
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, value) ?
      () :
      PerspectiveCameraFarBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        perspectiveCameraComponent,
        value,
      );

  let changeFar = (perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraFar(
      value,
      perspectiveCameraComponent,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let blurFovyEvent =
      ((uiState, dispatchFunc), perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.getPerspectiveCameraFovy(
      perspectiveCameraComponent,
    )
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, value) ?
      () :
      PerspectiveCameraFovyBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (uiState, dispatchFunc),
        perspectiveCameraComponent,
        value,
      );

  let changeFovy = (perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraFovy(
      value,
      perspectiveCameraComponent,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let buildNearComponent =
      ((uiState, dispatchFunc), currentGameObjectPerspectiveCamera) =>
    <MainEditorFloatInputBaseComponent
      label="Near"
      getComponentValueFunc=(
        PerspectiveCameraProjectionEngineService.getPerspectiveCameraNear(
          currentGameObjectPerspectiveCamera,
        )
      )
      changeComponentValueFunc=(
        changeNear(currentGameObjectPerspectiveCamera)
      )
      blurValueFunc=(
        blurNearEvent(
          (uiState, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
      dragDropFunc=(
        blurNearEvent(
          (uiState, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />;

  let buildFarComponent =
      ((uiState, dispatchFunc), currentGameObjectPerspectiveCamera) =>
    <MainEditorFloatInputBaseComponent
      label="Far"
      getComponentValueFunc=(
        PerspectiveCameraProjectionEngineService.getPerspectiveCameraFar(
          currentGameObjectPerspectiveCamera,
        )
      )
      changeComponentValueFunc=(changeFar(currentGameObjectPerspectiveCamera))
      blurValueFunc=(
        blurFarEvent(
          (uiState, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
      dragDropFunc=(
        blurFarEvent(
          (uiState, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />;

  /* let buildAspectComponent =
       ((uiState, dispatchFunc), currentGameObjectPerspectiveCamera) =>
     <MainEditorFloatInputBaseComponent
       label="Aspect"
       getComponentValueFunc=(
         PerspectiveCameraProjectionEngineService.unsafeGetPerspectiveCameraAspect(
           currentGameObjectPerspectiveCamera,
         )
       )
       changeComponentValueFunc=(
         changeAspect(currentGameObjectPerspectiveCamera)
       )
       blurValueFunc=(
         blurAspectEvent(
           (uiState, dispatchFunc),
           currentGameObjectPerspectiveCamera,
         )
       )
     />; */

  let buildFovyComponent =
      ((uiState, dispatchFunc), currentGameObjectPerspectiveCamera) =>
    <MainEditorFloatInputBaseComponent
      label="Fovy"
      getComponentValueFunc=(
        PerspectiveCameraProjectionEngineService.getPerspectiveCameraFovy(
          currentGameObjectPerspectiveCamera,
        )
      )
      changeComponentValueFunc=(
        changeFovy(currentGameObjectPerspectiveCamera)
      )
      blurValueFunc=(
        blurFovyEvent(
          (uiState, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
      dragDropFunc=(
        blurFovyEvent(
          (uiState, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />;
};

let component = ReasonReact.statelessComponent("MainEditorCameraProjection");

let render = ((uiState, dispatchFunc), _self) => {
  let engineState = StateEngineService.unsafeGetState();
  let currentGameObjectPerspectiveCamera =
    engineState
    |> GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
         SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
         |> StateLogicService.getEditorState,
       );

  <article
    key="MainEditorCameraProjection" className="wonder-camera-projection">
    <Select
      label="Type"
      options=(MainEditorCameraProjectionUtils.getCameraProjectionOptions())
      onChange=(value => ())
      selectedKey=(PerspectiveCamera |> convertCameraProjectionTypeToInt)
    />
    (
      Method.buildNearComponent(
        (uiState, dispatchFunc),
        currentGameObjectPerspectiveCamera,
      )
    )
    (
      Method.buildFarComponent(
        (uiState, dispatchFunc),
        currentGameObjectPerspectiveCamera,
      )
    )
    /* (
         Method.buildAspectComponent(
           (uiState, dispatchFunc),
           currentGameObjectPerspectiveCamera,
         )
       ) */
    (
      Method.buildFovyComponent(
        (uiState, dispatchFunc),
        currentGameObjectPerspectiveCamera,
      )
    )
  </article>;
};

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), self),
};