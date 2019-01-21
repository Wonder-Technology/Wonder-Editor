module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), perspectiveComponent, value) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraFovy(
         value,
         perspectiveComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);