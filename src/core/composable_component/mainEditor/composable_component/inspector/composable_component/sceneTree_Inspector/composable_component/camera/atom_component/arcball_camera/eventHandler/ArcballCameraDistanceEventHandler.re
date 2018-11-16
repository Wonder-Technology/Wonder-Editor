module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), arcballCameraController, distance) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> ArcballCameraEngineService.setArcballCameraControllerDistance(
         distance,
         arcballCameraController,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);