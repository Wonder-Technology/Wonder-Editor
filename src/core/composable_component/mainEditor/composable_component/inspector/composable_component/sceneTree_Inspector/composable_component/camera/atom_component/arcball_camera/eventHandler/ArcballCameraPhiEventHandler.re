module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), arcballCameraController, phi) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> ArcballCameraEngineService.setArcballCameraControllerPhi(
         arcballCameraController,
         phi,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);