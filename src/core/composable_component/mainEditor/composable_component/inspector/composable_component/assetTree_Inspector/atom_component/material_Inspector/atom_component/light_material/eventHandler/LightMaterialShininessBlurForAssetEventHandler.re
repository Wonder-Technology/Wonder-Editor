module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (int, int);
  type dataTuple = float;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      (
        (uiState, dispatchFunc),
        (materialComponent, currentNodeId),
        shininessValue,
      ) => {
    let engineState =
      StateEngineService.unsafeGetState()
      |> StateEngineService.deepCopyForRestore
      |> LightMaterialEngineService.setLightMaterialShininess(
           shininessValue,
           materialComponent,
         );

    engineState;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);