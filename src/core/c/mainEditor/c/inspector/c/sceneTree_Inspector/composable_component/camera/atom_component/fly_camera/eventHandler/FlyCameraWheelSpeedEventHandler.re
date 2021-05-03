open Wonderjs;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), flyCameraController, wheelSpeed) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> FlyCameraEngineService.setFlyCameraControllerWheelSpeed(
         flyCameraController,
         wheelSpeed,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);