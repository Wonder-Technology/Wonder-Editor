

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), materialComponent, value) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> LightMaterialEngineService.setLightMaterialDiffuseColor(
         value |> Color.convert16HexToRGBArr,
         materialComponent,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);