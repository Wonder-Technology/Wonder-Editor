module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), arcballCameraController, minDistance) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> ArcballCameraEngineService.setArcballCameraControllerMinDistance(
         minDistance,
         arcballCameraController,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);