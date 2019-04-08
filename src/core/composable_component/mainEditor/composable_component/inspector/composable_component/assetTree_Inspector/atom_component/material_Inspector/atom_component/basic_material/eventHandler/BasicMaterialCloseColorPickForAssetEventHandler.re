module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (Wonderjs.MaterialType.material, int);
  type dataTuple = string;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), (materialComponent, currentNodeId), value) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> BasicMaterialEngineService.setColor(
         value |> Color.convert16HexToRGBArr,
         materialComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);