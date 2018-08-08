open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = int;

  let _unbindActiveArcballCameraControllerEventIfHasComponent = runEngineState =>
    switch (
      runEngineState |> BasicCameraViewEngineService.getActiveBasicCameraView
    ) {
    | None => runEngineState
    | Some(currentBasicCameraView) =>
      let currentCameraGameObject =
        runEngineState
        |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
             currentBasicCameraView,
           );
      runEngineState
      |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
           currentCameraGameObject,
         ) ?
        runEngineState
        |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
             currentCameraGameObject,
           )
        |. ArcballCameraEngineService.unbindArcballCameraControllerEvent(
             runEngineState,
           ) :
        runEngineState;
    };

  let _bindTargetArcballCameraControllerEventIfHasComponent =
      (targetBasicCameraView, runEngineState) => {
    let targetCameraGameObject =
      runEngineState
      |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
           targetBasicCameraView,
         );
    let runEngineState =
      runEngineState
      |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
           targetCameraGameObject,
         ) ?
        runEngineState
        |> GameObjectComponentEngineService.getArcballCameraControllerComponent(
             targetCameraGameObject,
           )
        |. ArcballCameraEngineService.bindArcballCameraControllerEvent(
             runEngineState,
           ) :
        runEngineState;

    runEngineState
    |> BasicCameraViewEngineService.activeBasicCameraView(
         targetBasicCameraView,
       )
    |> DirectorEngineService.loopBody(0.);
  };

  let handleSelfLogic = ((store, dispatchFunc), (), targetBasicCameraView) => {
    StateLogicService.getRunEngineState()
    |> _unbindActiveArcballCameraControllerEventIfHasComponent
    |> _bindTargetArcballCameraControllerEventIfHasComponent(
         targetBasicCameraView,
       )
    |> StateLogicService.setRunEngineState;

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);