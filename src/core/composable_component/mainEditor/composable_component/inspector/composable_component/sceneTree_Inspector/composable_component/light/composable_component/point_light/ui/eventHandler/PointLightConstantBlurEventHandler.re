module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), lightComponent, constant) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> PointLightEngineService.setPointLightConstant(constant, lightComponent);
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);