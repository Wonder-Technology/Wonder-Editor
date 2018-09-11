module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), lightComponent, linear) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> PointLightEngineService.setPointLightLinear(linear, lightComponent);
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);