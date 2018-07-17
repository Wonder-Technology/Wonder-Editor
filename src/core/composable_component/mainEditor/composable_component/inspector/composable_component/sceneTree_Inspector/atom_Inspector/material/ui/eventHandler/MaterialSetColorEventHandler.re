open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.MaterialType.material;
  type dataTuple = string;

  let execFuncAndGetEngineStateTuple =
      ((store, dispatchFunc), materialComponent, value) =>
    (
      StateLogicService.getEditEngineState()
      |> StateEngineService.deepCopyForRestore,
      StateLogicService.getRunEngineState()
      |> StateEngineService.deepCopyForRestore,
    )
    |> StateLogicService.handleFuncWithDiff(
         [|{arguments: [|materialComponent|], type_: Material}|],
         BasicMaterialEngineService.setColor(
           value |> BasicMaterialEngineService.convert16HexToRGBArr,
         ),
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);