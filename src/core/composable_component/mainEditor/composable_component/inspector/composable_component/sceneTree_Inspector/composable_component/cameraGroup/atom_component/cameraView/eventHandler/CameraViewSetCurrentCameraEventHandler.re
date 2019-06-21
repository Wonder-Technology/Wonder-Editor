module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = int;
  type return = unit;

  let _unbindCurrentActiveCameraEventIfHasComponentAndInRunMode =
      (camera, engineState) =>
    StateEditorService.getIsRun() ?
      CameraControllerUtils.unbindCameraControllerEventByType(
        camera,
        engineState,
      ) :
      engineState;

  let _bindTargetEventIfHasComponentAndInRunMode = (camera, engineState) =>
    StateEditorService.getIsRun() ?
      CameraControllerUtils.bindCameraControllerEventByType (
        camera,
        engineState,
      ) :
      engineState;

  let handleSelfLogic = ((uiState, dispatchFunc), (), targetBasicCameraView) => {
    StateEditorService.getState()
    |> GameViewEditorService.setActivedBasicCameraView(targetBasicCameraView)
    |> StateEditorService.setState;

    let engineState = 
    StateEngineService.unsafeGetState();

    let currentActiveCamera = 
    engineState
    |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
      targetBasicCameraView );

engineState
    |> _unbindCurrentActiveCameraEventIfHasComponentAndInRunMode(currentActiveCamera)
    |> _bindTargetEventIfHasComponentAndInRunMode(currentActiveCamera)
    |> StateEngineService.setState;

    StateLogicService.getAndRefreshEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);