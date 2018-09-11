module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), materialComponent, shininessValue) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> LightMaterialEngineService.setLightMaterialShininess(
         shininessValue,
         materialComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);