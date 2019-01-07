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
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraNear(
      value,
      perspectiveCameraComponent,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

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
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraFar(
      value,
      perspectiveCameraComponent,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

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
    PerspectiveCameraProjectionEngineService.setPerspectiveCameraFovy(
      value,
      perspectiveCameraComponent,
    )
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

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

  /* let buildAspectComponent =
       ((store, dispatchFunc), currentGameObjectPerspectiveCamera) =>
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
           (store, dispatchFunc),
           currentGameObjectPerspectiveCamera,
         )
       )
     />; */

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
  let engineState = StateEngineService.unsafeGetState();
  let currentGameObjectPerspectiveCamera =
    engineState
    |> GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
         SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
         |> StateLogicService.getEditorState,
       );

  <article key="MainEditorCameraProjection" className="wonder-camera-projection">
    <Select
      label="Type"
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
    /* (
         Method.buildAspectComponent(
           (store, dispatchFunc),
           currentGameObjectPerspectiveCamera,
         )
       ) */
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