open Wonderjs;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), flyCameraController, moveSpeed) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> FlyCameraEngineService.setFlyCameraControllerMoveSpeed(
         flyCameraController,
         moveSpeed,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);