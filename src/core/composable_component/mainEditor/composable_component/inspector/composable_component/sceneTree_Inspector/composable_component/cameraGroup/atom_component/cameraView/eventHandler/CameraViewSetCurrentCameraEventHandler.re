module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = int;

  let _unbindCurrentActiveCameraEventIfHasComponentAndInRunMode = engineState =>
    switch (
      engineState |> BasicCameraViewEngineService.getActiveBasicCameraView
    ) {
    | None => engineState
    | Some(currentBasicCameraView) =>
      SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
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
    SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
      ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponentForGameView(
        targetBasicCameraView
        |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
             _,
             engineState,
           ),
        engineState,
      ) :
      engineState;

  let handleSelfLogic = ((store, dispatchFunc), (), targetBasicCameraView) => {
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