module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (Wonderjs.MaterialType.material, int);
  type dataTuple = string;
  type return = unit;

  let setUndoValueToCopiedEngineState =
      ((uiState, dispatchFunc), (materialComponent, currentNodeId), value) => {
    let engineState =
      StateEngineService.unsafeGetState()
      |> StateEngineService.deepCopyForRestore
      |> LightMaterialEngineService.setLightMaterialDiffuseColor(
           value |> Color.convert16HexToRGBArr,
           materialComponent,
         );

    engineState;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);