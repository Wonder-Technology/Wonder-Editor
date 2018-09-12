

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = int;

  let _unbindEventIfHasComponentAndInRunMode = engineState =>
    switch (
      engineState |> BasicCameraViewEngineService.getActiveBasicCameraView
    ) {
    | None => engineState
    | Some(currentBasicCameraView) =>
      SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
        engineState
        |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
             currentBasicCameraView,
           )
        |. ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponent(
             engineState,
           ) :
        engineState
    };

  let _bindTargetEventIfHasComponentAndInRunMode =
      (targetBasicCameraView, engineState) =>
    SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
      engineState
      |> BasicCameraViewEngineService.getBasicCameraViewGameObject(
           targetBasicCameraView,
         )
      |. ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
           engineState,
         ) :
      engineState;

  let handleSelfLogic = ((store, dispatchFunc), (), targetBasicCameraView) => {
    StateEngineService.unsafeGetState()
    |> _unbindEventIfHasComponentAndInRunMode
    |> _bindTargetEventIfHasComponentAndInRunMode(targetBasicCameraView)
    |> BasicCameraViewEngineService.activeBasicCameraView(
         targetBasicCameraView,
       )
    |> DirectorEngineService.loopBody(0.)
    |> StateEngineService.setState;

    dispatchFunc(AppStore.UpdateAction(Update([|Inspector|]))) |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);