open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), materialComponent, value) =>
    (
      StateLogicService.getEditEngineState()
      |> StateEngineService.deepCopyForRestore,
      StateLogicService.getRunEngineState()
      |> StateEngineService.deepCopyForRestore,
    )
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|materialComponent|], type_: LightMaterial}|],
         LightMaterialEngineService.setLightMaterialDiffuseColor(
           value |> Color.convert16HexToRGBArr,
         ),
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);