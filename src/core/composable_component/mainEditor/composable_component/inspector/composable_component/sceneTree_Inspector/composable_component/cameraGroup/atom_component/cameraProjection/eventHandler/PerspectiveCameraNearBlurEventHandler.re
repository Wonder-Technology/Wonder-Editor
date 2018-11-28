module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), perspectiveComponent, value) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> PerspectiveCameraProjectionEngineService.setPerspectiveCameraNear(
         value,
         perspectiveComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);