module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), perspectiveComponent, value) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraFar(
         value,
         perspectiveComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);