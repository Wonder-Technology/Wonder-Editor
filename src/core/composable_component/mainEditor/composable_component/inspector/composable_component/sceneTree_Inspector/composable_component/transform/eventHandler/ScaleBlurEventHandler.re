module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (float, float, float);

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), transformComponent, (x, y, z)) =>
    (
      StateLogicService.getEditEngineState()
      |> StateEngineService.deepCopyForRestore,
      StateLogicService.getRunEngineState()
      |> StateEngineService.deepCopyForRestore,
    )
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|transformComponent|], type_: Transform}|],
         TransformEngineService.setLocalScale((x, y, z)),
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);