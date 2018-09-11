open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), materialComponent, value) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> BasicMaterialEngineService.setColor(
         value |> Color.convert16HexToRGBArr,
         materialComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);