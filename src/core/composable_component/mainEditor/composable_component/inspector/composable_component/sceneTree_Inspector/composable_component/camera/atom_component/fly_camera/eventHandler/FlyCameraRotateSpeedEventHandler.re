open Wonderjs;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), flyCameraController, rotateSpeed) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> FlyCameraEngineService.setFlyCameraControllerRotateSpeed(
         flyCameraController,
         rotateSpeed,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);