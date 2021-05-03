module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), lightComponent, quadratic) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> PointLightEngineService.setPointLightQuadratic(
         quadratic,
         lightComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);