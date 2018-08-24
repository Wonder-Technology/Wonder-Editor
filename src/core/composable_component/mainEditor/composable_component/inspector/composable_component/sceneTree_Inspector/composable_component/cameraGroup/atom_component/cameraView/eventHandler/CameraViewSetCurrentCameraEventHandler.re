open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = int;

  let _unbindEventIfHasComponentAndInRunMode = runEngineState =>
    switch (
      runEngineState |> BasicCameraViewEngineService.getActiveBasicCameraView
    ) {
    | None => runEngineState
    | Some(currentBasicCameraView) =>
      SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
        runEngineState
        |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
             currentBasicCameraView,
           )
        |. ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponent(
             runEngineState,
           ) :
        runEngineState
    };

  let _bindTargetEventIfHasComponentAndInRunMode =
      (targetBasicCameraView, runEngineState) =>
    SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
      runEngineState
      |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
           targetBasicCameraView,
         )
      |. ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
           runEngineState,
         ) :
      runEngineState;

  let handleSelfLogic = ((store, dispatchFunc), (), targetBasicCameraView) => {
    StateLogicService.getRunEngineState()
    |> _unbindEventIfHasComponentAndInRunMode
    |> _bindTargetEventIfHasComponentAndInRunMode(targetBasicCameraView)
    |> BasicCameraViewEngineService.activeBasicCameraView(
         targetBasicCameraView,
       )
    |> DirectorEngineService.loopBodyForRunEngineState(0.)
    |> StateLogicService.setRunEngineState;

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);