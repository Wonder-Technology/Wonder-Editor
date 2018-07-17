module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = int;
  type dataTuple = (float, float, float);

  let onMarkRedoUndoByStackFirst =
      ((store, dispatchFunc), transformComponent, (x, y, z)) => {
    let (editEngineState, runEngineState) =
      (
        StateLogicService.getEditEngineState()
        |> StateEngineService.deepCopyForRestore,
        StateLogicService.getRunEngineState()
        |> StateEngineService.deepCopyForRestore,
      )
      |> StateLogicService.handleFuncWithDiff(
           [|{arguments: [|transformComponent|], type_: Transform}|],
           TransformEngineService.setLocalPosition((x, y, z)),
         );

    (StateEditorService.getState(), editEngineState, runEngineState)
    |> MarkRedoUndoEventHandlerUtils.storeCopiedEngineStateHistory(store);

    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
};

module MakeEventHandler =
  EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);