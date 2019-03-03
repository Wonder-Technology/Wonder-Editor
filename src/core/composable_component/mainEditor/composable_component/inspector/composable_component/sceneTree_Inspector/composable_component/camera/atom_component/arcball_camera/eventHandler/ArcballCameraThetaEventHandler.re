module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), arcballCameraController, theta) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> ArcballCameraEngineService.setArcballCameraControllerTheta(
         arcballCameraController,
         theta,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);