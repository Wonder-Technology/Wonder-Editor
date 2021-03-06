module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), materialComponent, shininessValue) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> LightMaterialEngineService.setLightMaterialShininess(
         shininessValue,
         materialComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);