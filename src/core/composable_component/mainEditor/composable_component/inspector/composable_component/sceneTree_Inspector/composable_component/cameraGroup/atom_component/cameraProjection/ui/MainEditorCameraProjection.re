open MainEditorCameraProjectionType;

module Method = {
  let blurNearEvent =
      ((store, dispatchFunc), perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.getPerspectiveCameraNear(
      perspectiveCameraComponent,
    )
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, value) ?
      () :
      PerspectiveCameraNearBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        perspectiveCameraComponent,
        value,
      );

  let changeNear = (perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraNear(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {
           arguments: [|perspectiveCameraComponent|],
           type_: DiffType.PerspectiveCamera,
         },
       |]);

  let blurFarEvent =
      ((store, dispatchFunc), perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.getPerspectiveCameraFar(
      perspectiveCameraComponent,
    )
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, value) ?
      () :
      PerspectiveCameraFarBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        perspectiveCameraComponent,
        value,
      );

  let changeFar = (perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraFar(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {
           arguments: [|perspectiveCameraComponent|],
           type_: DiffType.PerspectiveCamera,
         },
       |]);

  let blurAspectEvent =
      ((store, dispatchFunc), perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.getPerspectiveCameraAspect(
      perspectiveCameraComponent,
    )
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, value) ?
      () :
      PerspectiveCameraAspectBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        perspectiveCameraComponent,
        value,
      );

  let changeAspect = (perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraAspect(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {
           arguments: [|perspectiveCameraComponent|],
           type_: DiffType.PerspectiveCamera,
         },
       |]);

  let blurFovyEvent =
      ((store, dispatchFunc), perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.getPerspectiveCameraFovy(
      perspectiveCameraComponent,
    )
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.Float, value) ?
      () :
      PerspectiveCameraFovyBlurEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState(
        (store, dispatchFunc),
        perspectiveCameraComponent,
        value,
      );

  let changeFovy = (perspectiveCameraComponent, value) =>
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraFovy(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {
           arguments: [|perspectiveCameraComponent|],
           type_: DiffType.PerspectiveCamera,
         },
       |]);

  let buildNearComponent =
      ((store, dispatchFunc), currentGameObjectPerspectiveCamera) =>
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
          (store, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />;

  let buildFarComponent =
      ((store, dispatchFunc), currentGameObjectPerspectiveCamera) =>
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
          (store, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />;

  let buildAspectComponent =
      ((store, dispatchFunc), currentGameObjectPerspectiveCamera) =>
    <MainEditorFloatInputBaseComponent
      label="Aspect"
      getComponentValueFunc=(
        PerspectiveCameraProjectionEngineService.getPerspectiveCameraAspect(
          currentGameObjectPerspectiveCamera,
        )
      )
      changeComponentValueFunc=(
        changeAspect(currentGameObjectPerspectiveCamera)
      )
      blurValueFunc=(
        blurAspectEvent(
          (store, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />;

  let buildFovyComponent =
      ((store, dispatchFunc), currentGameObjectPerspectiveCamera) =>
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
          (store, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />;
};

let component = ReasonReact.statelessComponent("MainEditorCameraProjection");

let render = ((store, dispatchFunc), _self) => {
  let engineState = StateLogicService.getRunEngineState();
  let currentGameObjectPerspectiveCamera =
    engineState
    |> GameObjectComponentEngineService.getPerspectiveCameraProjectionComponent(
         SceneEditorService.unsafeGetCurrentSceneTreeNode
         |> StateLogicService.getEditorState,
       );

  <article key="MainEditorCameraProjection" className="wonder-camera-view">
    <Select
      label="type : "
      options=(MainEditorCameraProjectionUtils.getCameraProjectionOptions())
      onChange=(value => ())
      selectedKey=(PerspectiveCamera |> convertCameraProjectionTypeToInt)
    />
    (
      Method.buildNearComponent(
        (store, dispatchFunc),
        currentGameObjectPerspectiveCamera,
      )
    )
    (
      Method.buildFarComponent(
        (store, dispatchFunc),
        currentGameObjectPerspectiveCamera,
      )
    )
    (
      Method.buildAspectComponent(
        (store, dispatchFunc),
        currentGameObjectPerspectiveCamera,
      )
    )
    (
      Method.buildFovyComponent(
        (store, dispatchFunc),
        currentGameObjectPerspectiveCamera,
      )
    )
  </article>;
};

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};