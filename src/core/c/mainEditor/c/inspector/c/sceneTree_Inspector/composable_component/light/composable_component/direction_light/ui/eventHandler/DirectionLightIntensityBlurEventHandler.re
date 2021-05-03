module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), lightComponent, intensity) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> DirectionLightEngineService.setDirectionLightIntensity(
         intensity,
         lightComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);