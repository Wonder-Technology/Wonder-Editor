module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), materialComponent, shininessValue) =>
    (
      StateLogicService.getEditEngineState()
      |> StateEngineService.deepCopyForRestore,
      StateLogicService.getRunEngineState()
      |> StateEngineService.deepCopyForRestore,
    )
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|materialComponent|], type_: LightMaterial}|],
         LightMaterialEngineService.setLightMaterialShininess(shininessValue),
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);