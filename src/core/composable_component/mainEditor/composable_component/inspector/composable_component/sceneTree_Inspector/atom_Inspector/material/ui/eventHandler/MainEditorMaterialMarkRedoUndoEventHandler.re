open DiffType;

module MarkRedoUndoEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = array(float);

  let onMarkRedoUndoByStackLastReturnStore =
      ((store, dispatchFunc), materialComponent, value) => {
    BasicMaterialEngineService.setColor(value)
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|materialComponent|], type_: Material},
       |]);

    store;
  };
};

module MakeEventHandler =
  EventHandler.MakeEventHandler(MarkRedoUndoEventHandler);