module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), lightComponent, intensity) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> DirectionLightEngineService.setDirectionLightIntensity(
         intensity,
         lightComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);