open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), lightComponent, value) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> DirectionLightEngineService.setDirectionLightColor(
         value |> Color.convert16HexToRGBArr,
         lightComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);