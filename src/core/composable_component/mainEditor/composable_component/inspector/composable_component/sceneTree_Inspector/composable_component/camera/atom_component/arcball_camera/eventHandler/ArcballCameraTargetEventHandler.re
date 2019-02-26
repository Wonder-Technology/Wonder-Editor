module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (float, float, float);
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), arcballCameraController, target) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> ArcballCameraEngineService.setArcballCameraControllerTarget(
         arcballCameraController,
         target,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);