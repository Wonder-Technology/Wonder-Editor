open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = int;

  let _unbindActiveCameraArcballCameraControllerEventIfHasComponent = runEngineState =>
    switch (
      runEngineState |> BasicCameraViewEngineService.getActiveBasicCameraView
    ) {
    | None => runEngineState
    | Some(currentBasicCameraView) =>
      runEngineState
      |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
           currentBasicCameraView,
         )
      |. ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponent(
           runEngineState,
         )
    };

  let _bindTargetCameraArcballCameraControllerEventIfHasComponent =
      (targetBasicCameraView, runEngineState) =>
    runEngineState
    |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
         targetBasicCameraView,
       )
    |. ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
         runEngineState,
       )
    |> BasicCameraViewEngineService.activeBasicCameraView(
         targetBasicCameraView,
       )
    |> DirectorEngineService.loopBody(0.);

  let handleSelfLogic = ((store, dispatchFunc), (), targetBasicCameraView) => {
    StateLogicService.getRunEngineState()
    |> _unbindActiveCameraArcballCameraControllerEventIfHasComponent
    |> _bindTargetCameraArcballCameraControllerEventIfHasComponent(
         targetBasicCameraView,
       )
    |> StateLogicService.setRunEngineState;

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);