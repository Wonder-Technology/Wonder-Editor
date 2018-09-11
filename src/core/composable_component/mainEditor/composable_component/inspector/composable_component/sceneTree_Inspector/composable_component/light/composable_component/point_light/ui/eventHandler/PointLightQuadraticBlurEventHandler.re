module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), lightComponent, quadratic) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> PointLightEngineService.setPointLightQuadratic(
         quadratic,
         lightComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);