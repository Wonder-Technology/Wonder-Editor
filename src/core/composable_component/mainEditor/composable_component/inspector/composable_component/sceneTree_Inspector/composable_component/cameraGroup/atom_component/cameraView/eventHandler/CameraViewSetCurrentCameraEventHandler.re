module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = int;
  type return = unit;

  let _unbindAllCameraControllerEventInRunMode = (camera, engineState) =>
    StateEditorService.getIsRun() ?
      engineState
      |> ArcballCameraControllerLogicService.unbindAllSceneChildrenArcballCameraControllerEvent
      |> FlyCameraControllerLogicService.unbindAllSceneChildrenFlyCameraControllerEvent :
      engineState;

  let _bindTargetEventByCameraControllerTypeInRunMode = (camera, engineState) =>
    StateEditorService.getIsRun() ?
      CameraControllerUtils.bindCameraControllerEventByType(
        camera,
        engineState,
      ) :
      engineState;

  let handleSelfLogic = ((uiState, dispatchFunc), (), targetBasicCameraView) => {
    StateEditorService.getState()
    |> GameViewEditorService.setActivedBasicCameraView(targetBasicCameraView)
    |> StateEditorService.setState;

    let engineState = StateEngineService.unsafeGetState();

    let currentActiveCamera =
      engineState
      |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
           targetBasicCameraView,
         );

    engineState
    |> _unbindAllCameraControllerEventInRunMode(currentActiveCamera)
    |> _bindTargetEventByCameraControllerTypeInRunMode(currentActiveCamera)
    |> StateEngineService.setState;

    StateLogicService.getAndRefreshEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);