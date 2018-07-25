module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = float;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), lightComponent, intensity) =>
    (
      StateLogicService.getEditEngineState()
      |> StateEngineService.deepCopyForRestore,
      StateLogicService.getRunEngineState()
      |> StateEngineService.deepCopyForRestore,
    )
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|lightComponent|], type_: DirectionLight}|],
         DirectionLightEngineService.setDirectionLightIntensity(intensity),
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);