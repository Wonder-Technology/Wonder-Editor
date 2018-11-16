module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), lightComponent, range) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> PointLightEngineService.setPointLightRange(range, lightComponent);
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);