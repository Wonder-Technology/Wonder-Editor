open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;

  let setUndoValueToCopiedEngineState =
      ((store, dispatchFunc), lightComponent, value) =>
    (
      StateLogicService.getEditEngineState()
      |> StateEngineService.deepCopyForRestore,
      StateLogicService.getRunEngineState()
      |> StateEngineService.deepCopyForRestore,
    )
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|lightComponent|], type_: DirectionLight}|],
         DirectionLightEngineService.setDirectionLightColor(
           value |> Color.convert16HexToRGBArr,
         ),
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);