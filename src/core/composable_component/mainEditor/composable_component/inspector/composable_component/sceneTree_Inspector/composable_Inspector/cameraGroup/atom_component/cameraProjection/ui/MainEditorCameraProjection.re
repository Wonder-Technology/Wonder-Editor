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
      onChange=(value => WonderLog.Log.print(value) |> ignore)
      selectedKey=(PerspectiveCamera |> convertCameraProjectionTypeToInt)
    />
    <MainEditorFloatInputBaseComponent
      label="Near"
      getComponentValueFunc=(
        PerspectiveCameraProjectionEngineService.getPerspectiveCameraNear(
          currentGameObjectPerspectiveCamera,
        )
      )
      changeComponentValueFunc=(
        Method.changeNear(currentGameObjectPerspectiveCamera)
      )
      blurValueFunc=(
        Method.blurNearEvent(
          (store, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />
    <MainEditorFloatInputBaseComponent
      label="Far"
      getComponentValueFunc=(
        PerspectiveCameraProjectionEngineService.getPerspectiveCameraFar(
          currentGameObjectPerspectiveCamera,
        )
      )
      changeComponentValueFunc=(
        Method.changeFar(currentGameObjectPerspectiveCamera)
      )
      blurValueFunc=(
        Method.blurFarEvent(
          (store, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />
    <MainEditorFloatInputBaseComponent
      label="Aspect"
      getComponentValueFunc=(
        PerspectiveCameraProjectionEngineService.getPerspectiveCameraAspect(
          currentGameObjectPerspectiveCamera,
        )
      )
      changeComponentValueFunc=(
        Method.changeAspect(currentGameObjectPerspectiveCamera)
      )
      blurValueFunc=(
        Method.blurAspectEvent(
          (store, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />
    <MainEditorFloatInputBaseComponent
      label="Fovy"
      getComponentValueFunc=(
        PerspectiveCameraProjectionEngineService.getPerspectiveCameraFovy(
          currentGameObjectPerspectiveCamera,
        )
      )
      changeComponentValueFunc=(
        Method.changeFovy(currentGameObjectPerspectiveCamera)
      )
      blurValueFunc=(
        Method.blurFovyEvent(
          (store, dispatchFunc),
          currentGameObjectPerspectiveCamera,
        )
      )
    />
  </article>;
};

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};