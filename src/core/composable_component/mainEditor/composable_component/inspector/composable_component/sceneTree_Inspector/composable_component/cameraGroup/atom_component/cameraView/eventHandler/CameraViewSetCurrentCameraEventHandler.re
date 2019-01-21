module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = int;
  type return = unit;

  let _unbindCurrentActiveCameraEventIfHasComponentAndInRunMode = engineState =>
    switch (
      engineState |> BasicCameraViewEngineService.getActiveBasicCameraView
    ) {
    | None => engineState
    | Some(currentBasicCameraView) =>
      StateEditorService.getIsRun() ?
        ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponentForGameView(
          currentBasicCameraView
          |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
               _,
               engineState,
             ),
          engineState,
        ) :
        engineState
    };

  let _bindTargetEventIfHasComponentAndInRunMode =
      (targetBasicCameraView, engineState) =>
    StateEditorService.getIsRun() ?
      ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponentForGameView(
        targetBasicCameraView
        |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
             _,
             engineState,
           ),
        engineState,
      ) :
      engineState;

  let handleSelfLogic = ((uiState, dispatchFunc), (), targetBasicCameraView) => {
    StateEditorService.getState()
    |> GameViewEditorService.setActivedBasicCameraView(targetBasicCameraView)
    |> StateEditorService.setState;

    StateEngineService.unsafeGetState()
    |> _unbindCurrentActiveCameraEventIfHasComponentAndInRunMode
    |> _bindTargetEventIfHasComponentAndInRunMode(targetBasicCameraView)
    |> StateEngineService.setState;

    StateLogicService.getAndRefreshEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);