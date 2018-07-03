open DiffType;

module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;
  let onMarkRedoUndoByStackLastReturnStore =
      ((store, dispatchFunc), materialComponent, value) => {
    BasicMaterialEngineService.setColor([|0.4, 0.6, 0.7|])
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|materialComponent|], type_: Material},
       |]);
    dispatchFunc(AppStore.ReLoad);

    store;
  };
};

module MakeEventHandler =
  EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);